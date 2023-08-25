import React, { ReactElement, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchCart,
  toDollars,
  removeItem,
  updateQuantity,
  checkout,
  removeAllItems,
} from '../lib';
import AppContext from '../context/AppContext';
import ShoppingCartContext from '../context/ShoppingCartContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function ShoppingCart(): ReactElement {
  const { user, token } = useContext(AppContext);
  const { cart, setCart } = useContext(ShoppingCartContext);

  useEffect(() => {
    async function loadCart(userId: number) {
      try {
        const cart = await fetchCart(userId, token as string);
        setCart(cart);
      } catch (err) {
        console.error(err);
      }
    }
    user && loadCart(user.userId);
  }, [user, token, setCart]);

  async function incrementQuantity(
    shoppingCartId: number,
    productId: number,
    quantity: number
  ) {
    try {
      const updatedCart = cart.map((product) =>
        product.productId === +productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      await updateQuantity(
        shoppingCartId,
        +productId,
        quantity + 1,
        token as string
      );
      setCart(updatedCart);
    } catch (err) {
      console.error(err);
    }
  }

  async function decrementQuantity(
    shoppingCartId: number,
    productId: number,
    quantity: number
  ) {
    try {
      const updatedCart = cart.map((product) =>
        product.productId === +productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
      await updateQuantity(
        shoppingCartId,
        +productId,
        quantity - 1,
        token as string
      );
      setCart(updatedCart);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRemoveItem(shoppingCartId: number, productId: number) {
    try {
      const updatedCart = cart.filter(
        (product) => product.productId !== +productId
      );
      await removeItem(shoppingCartId, productId, token as string);
      setCart(updatedCart);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const url = await checkout(cart, token as string);
      window.location.href = url;
      await removeAllItems(user!.shoppingCartId, token as string);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="bg-timeless1">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form onSubmit={handleCheckout} className="mt-12">
            <div className="mt-10 lg:mt-0">
              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul className="divide-y divide-gray-200">
                  {cart.map((product: any, index) => (
                    <li key={index} className="flex px-4 py-6 sm:px-6">
                      <div className="flex-shrink-0">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-20 rounded-md"
                        />
                      </div>
                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <Link
                                to={`/details/${product.productId}`}
                                className="font-medium text-gray-700 hover:text-gray-800">
                                {product.name}
                              </Link>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.shortDescription}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {`Qty ${product.quantity}`}
                            </p>
                          </div>

                          <div className="ml-4 flow-root flex-shrink-0">
                            <button
                              type="button"
                              onClick={() =>
                                user?.shoppingCartId &&
                                handleRemoveItem(
                                  user.shoppingCartId,
                                  product.productId
                                )
                              }
                              className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500">
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-1 items-end justify-between pt-2">
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {toDollars(product.price)}
                          </p>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantity
                            </label>
                            <div>
                              <nav
                                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                                aria-label="Pagination">
                                <button
                                  type="button"
                                  onClick={() =>
                                    user?.shoppingCartId &&
                                    decrementQuantity(
                                      user.shoppingCartId,
                                      product.productId,
                                      product.quantity
                                    )
                                  }
                                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                  <span className="sr-only">Previous</span>
                                  <ChevronLeftIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </button>
                                <p
                                  aria-current="page"
                                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                  {product.quantity}
                                </p>
                                <button
                                  type="button"
                                  onClick={() =>
                                    user?.shoppingCartId &&
                                    incrementQuantity(
                                      user.shoppingCartId,
                                      product.productId,
                                      product.quantity
                                    )
                                  }
                                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                  <span className="sr-only">Next</span>
                                  <ChevronRightIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </button>
                              </nav>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between border-gray-200">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      {toDollars(
                        cart.reduce(
                          (acc, product) =>
                            acc + product.price * product.quantity,
                          0
                        )
                      )}
                    </dd>
                  </div>
                </dl>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
