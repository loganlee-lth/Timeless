export type Product = {
  productId: number;
  name: string;
  description: string;
  price: number;
  productCategoryId: number;
  inventoryQuantity: number;
  imageUrl: string;
  createdAt: string;
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
