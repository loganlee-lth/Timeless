import 'dotenv/config';
import express from 'express';
import {
  authorizationMiddleware,
  ClientError,
  errorMiddleware,
} from './lib/index.js';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: '2022-11-15',
  typescript: true,
});

type User = {
  userId: number;
  username: string;
  hashedPassword: string;
  shoppingCartId: number;
};

type Auth = {
  username: string;
  password: string;
};

type CartItem = {
  shoppingCartId: number;
  productId: number;
  quantity: number;
};

type checkoutCart = {
  priceId: string;
  quantity: number;
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sqlUser = `
      insert into "user" ("username", "hashedPassword")
        values ($1, $2)
        returning *;
    `;
    const params = [username, hashedPassword];
    const result = await db.query<User>(sqlUser, params);
    const [user] = result.rows;
    const sqlShoppingCart = `
      insert into "shoppingCart" ("userId")
        values ($1)
        returning *;
    `;
    const paramsShoppingCart = [user.userId];
    await db.query(sqlShoppingCart, paramsShoppingCart);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
      select "userId",
            "hashedPassword",
            "shoppingCartId"
        from "user"
        join "shoppingCart" using ("userId")
        where "username" = $1;
    `;
    const params = [username];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword, shoppingCartId } = user;
    const isMatching = await argon2.verify(hashedPassword, password);
    if (!isMatching) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username, shoppingCartId };
    const token = jwt.sign(payload, hashKey);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.get('/api/product', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "product";
    `;
    const result = await db.query(sql);
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/product/:productId', async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (!productId) {
      throw new ClientError(400, 'productId must be a positive integer');
    }
    const sql = `
      select *
        from "product"
        where "productId" = $1;
    `;
    const params = [productId];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(
        404,
        `cannot find product with productId ${productId}`
      );
    }
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.get(
  '/api/cart/:userId',
  authorizationMiddleware,
  async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const sql = `
      select *
        from "user"
        join "shoppingCart" using ("userId")
        join "shoppingCartItems" using ("shoppingCartId")
        join "product" using ("productId")
        where "user"."userId" = $1
   `;
      const params = [userId];
      const result = await db.query(sql, params);
      res.status(200).json(result.rows);
    } catch (err) {
      next(err);
    }
  }
);

app.post(
  '/api/cart/:cartId',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      const { shoppingCartId, productId, quantity } =
        req.body as Partial<CartItem>;
      if (!shoppingCartId || !productId || !quantity) {
        throw new ClientError(
          400,
          'userId, productId, and quantity are required fields'
        );
      }
      const sql = `
      insert into "shoppingCartItems" ("shoppingCartId", "productId", "quantity")
        values ($1, $2, $3)
        returning *;
    `;
      const params = [shoppingCartId, productId, quantity];
      const result = await db.query(sql, params);
      const [cart] = result.rows;
      res.status(201).json(cart);
    } catch (err) {
      next(err);
    }
  }
);

app.put(
  '/api/cart/:cartId',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      const { shoppingCartId, productId, quantity } = req.body;
      if (!quantity) throw new ClientError(400, 'quantity is required');
      const sql = `
      update "shoppingCartItems"
        set "quantity" = $3
        where "shoppingCartId" = $1 and "productId" = $2
        returning *;
    `;
      const params = [shoppingCartId, productId, quantity];
      const result = await db.query(sql, params);
      res.status(200).json(result.rows);
    } catch (err) {
      next(err);
    }
  }
);

app.delete(
  '/api/delete/:cartId/:productId',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      const { shoppingCartId, productId } = req.body;
      const sql = `
      delete from "shoppingCartItems"
        where "shoppingCartId" = $1 and "productId" = $2
    `;
      const params = [shoppingCartId, productId];
      await db.query(sql, params);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

app.post('/api/checkout', authorizationMiddleware, async (req, res, next) => {
  const { cart } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: cart.map((product: checkoutCart) => ({
        price: product.priceId,
        quantity: product.quantity,
      })),
      mode: 'payment',
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/`,
      automatic_tax: { enabled: true },
    });
    res.status(303).json(session.url);
  } catch (err) {
    next(err);
  }
});

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Create React App server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
