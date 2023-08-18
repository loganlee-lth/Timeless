import { Fragment, ReactElement, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import ShoppingCartContext from '../context/ShoppingCartContext';
import { Dialog, Popover, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

type Page = {
  name: string;
  to: string;
};

type Navigation = {
  pages: Page[];
};

const navigation: Navigation = {
  pages: [{ name: 'Products', to: '/catalog' }],
};

export default function Header(): ReactElement {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { user, handleSignOut } = useContext(AppContext);
  const { cart } = useContext(ShoppingCartContext);
  const totalQuantity = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}>
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link
                        to={page.to}
                        onClick={() => setOpen(false)}
                        className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {user && (
                    <div className="flow-root">
                      <Link
                        reloadDocument
                        to="/"
                        onClick={handleSignOut}
                        className="-m-2 block p-2 font-medium text-gray-900">
                        Sign out
                      </Link>
                    </div>
                  )}
                  {!user && (
                    <>
                      <div className="flow-root">
                        <Link
                          to="/sign-up"
                          onClick={() => setOpen(false)}
                          className="-m-2 block p-2 font-medium text-gray-900">
                          Create an account
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/sign-in"
                          onClick={() => setOpen(false)}
                          className="-m-2 block p-2 font-medium text-gray-900">
                          Sign in
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-gray-900">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                {user && (
                  <Link
                    reloadDocument
                    to="/"
                    onClick={handleSignOut}
                    className="text-sm font-medium text-white hover:text-gray-100">
                    Sign out
                  </Link>
                )}
                {!user && (
                  <>
                    <Link
                      to="/sign-up"
                      className="text-sm font-medium text-white hover:text-gray-100">
                      Create an account
                    </Link>
                    <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
                    <Link
                      to="/sign-in"
                      className="text-sm font-medium text-white hover:text-gray-100">
                      Sign in
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:items-center">
                    <Link to="/">
                      <span className="sr-only">Timeless Fashion</span>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt=""
                      />
                    </Link>
                  </div>

                  <div className="hidden h-full lg:flex">
                    {/* Mega menus */}
                    <Popover.Group className="ml-8">
                      <div className="flex h-full justify-center space-x-8">
                        {navigation.pages.map((page) => (
                          <Link
                            key={page.name}
                            to={page.to}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                            {page.name}
                          </Link>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setOpen(true)}>
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <Link
                      to="#"
                      className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>

                  {/* Logo (lg-) */}
                  <Link to="/" className="lg:hidden">
                    <span className="sr-only">Timeless Fashion</span>
                    <img
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                      className="h-8 w-auto"
                    />
                  </Link>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        <div className="hidden lg:flex">
                          <Link
                            to="#"
                            className="p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Search</span>
                            <MagnifyingGlassIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </Link>
                        </div>
                      </div>

                      <span
                        className="mx-4 h-6 w-px lg:bg-gray-200 lg:mx-6"
                        aria-hidden="true"
                      />

                      <div className="flow-root">
                        <Link
                          to={!user ? '/sign-in' : `/cart/${user?.userId}`}
                          className="group -m-2 flex items-center p-2">
                          <ShoppingCartIcon
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                            {totalQuantity}
                          </span>
                          <span className="sr-only">items in cart</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
