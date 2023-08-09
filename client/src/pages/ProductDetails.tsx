import { ReactElement, useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  addToCart,
  fetchProduct,
  updateQuantity,
  Product,
  toDollars,
} from '../lib';
import AppContext from '../context/AppContext';
import ShoppingCartContext from '../context/ShoppingCartContext';
import { Tab } from '@headlessui/react';
import Loading from '../components/Loading';

export default function ProductDetails(): ReactElement {
  const navigate = useNavigate();
  const { productId = '' } = useParams<string>();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const { user, token } = useContext(AppContext);
  const { cart, setCart } = useContext(ShoppingCartContext);

  useEffect(() => {
    async function loadProduct(productId: number) {
      try {
        const product = await fetchProduct(productId);
        setProduct(product);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (productId) {
      setIsLoading(true);
      loadProduct(+productId);
    }
  }, [productId]);

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div>
        Error Loading Product {productId}:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  if (!product) return <div>Product not found</div>;

  async function handleAddToCart() {
    if (!user) {
      navigate('/sign-in');
      return;
    }
    const productInCart = cart.find(
      (product) => product.productId === +productId
    );
    try {
      if (productInCart) {
        const updatedCart = cart.map((product) =>
          product.productId === +productId
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
        await updateQuantity(
          user.shoppingCartId,
          +productId,
          productInCart.quantity + 1,
          token as string
        );
        setCart(updatedCart);
      } else {
        const addedProduct = await addToCart(
          user.shoppingCartId,
          +productId,
          1,
          token as string
        );
        setCart([...cart, addedProduct]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Tab.Group as="div" className="flex flex-col-reverse">
            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              <Tab.Panel>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover object-center sm:rounded-lg"
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {toDollars(product.price)}
              </p>
            </div>
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
              />
            </div>
            <form className="mt-6" onSubmit={handleAddToCart}>
              <div className="mt-10 flex">
                <button
                  type="submit"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">
                  Add to bag
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
