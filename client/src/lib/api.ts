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
};

export type Auth = {
  user: User;
  token: string;
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
