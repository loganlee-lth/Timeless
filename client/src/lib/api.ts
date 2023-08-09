export type Product = {
  productId: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  category: string;
  inventoryQuantity: number;
  imageUrl: string;
  createdAt: string;
};

export type User = {
  userId: number;
  username: string;
  shoppingCartId: number;
};

export type Auth = {
  user: User;
  token: string;
};

export type ShoppingCartItem = {
  productId: number;
  quantity: number;
  price: number;
};

/**
 * Fetches all products from the API.
 * @returns Promise that resolves to an array of products.
 */
export async function fetchCatalog(): Promise<Product[]> {
  const res = await fetch('/api/product');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Fetches a single product from the API.
 * @param {number} productId The ID of the product to fetch.
 * @returns Promise that resolves to the product.
 */
export async function fetchProduct(productId: number): Promise<Product> {
  const res = await fetch(`/api/product/${productId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Fetch Cart.
 */
export async function fetchCart(userId: number, token: string) {
  const req = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const res = await fetch(`/api/cart/${userId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Add to Cart.
 */
export async function addToCart(
  shoppingCartId: number,
  productId: number,
  quantity: number,
  token: string
) {
  const req = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shoppingCartId, productId, quantity }),
  };
  const res = await fetch(`/api/cart/${shoppingCartId}`, req);
  return await res.json();
}

/**
 * Update Cart.
 */
export async function updateQuantity(
  shoppingCartId: number,
  productId: number,
  quantity: number,
  token: string
) {
  const req = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shoppingCartId, productId, quantity }),
  };
  const res = await fetch(`/api/cart/${shoppingCartId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Remove from Cart.
 */
export async function removeItem(
  shoppingCartId: number,
  productId: number,
  token: string
) {
  const req = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shoppingCartId, productId }),
  };
  const res = await fetch(`/api/delete/${shoppingCartId}/${productId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
}

/**
 * Signs in a user.
 * @param {string} username The user's username.
 * @param {sting} password The user's password.
 * @returns Promise that resolves to `{ token, user }`.
 */
export async function signIn(
  username: string,
  password: string
): Promise<Auth> {
  return await signUpOrIn('sign-in', username, password);
}

/**
 * Signs up a user.
 * @param {string} username The user's username.
 * @param {sting} password The user's password.
 * @returns Promise that resolves to the user.
 */
export async function signUp(
  username: string,
  password: string
): Promise<User> {
  return await signUpOrIn('sign-up', username, password);
}

/**
 * Signs up or signs in depending on the action.
 */
async function signUpOrIn(
  action: 'sign-up',
  username: string,
  password: string
): Promise<User>;

async function signUpOrIn(
  action: 'sign-in',
  username: string,
  password: string
): Promise<Auth>;

/**
 * Signs up or signs in depending on the action.
 * @param {string} action Action to take, either 'sign-up' or 'sign-in'
 * @param {string} username The user's username.
 * @param {sting} password The user's password.
 * @returns Promise that resolves to user (sign-up) or `{ token, user }` (sign-in).
 */
async function signUpOrIn(
  action: 'sign-up' | 'sign-in',
  username: string,
  password: string
): Promise<User | Auth> {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  };
  const res = await fetch(`/api/auth/${action}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
