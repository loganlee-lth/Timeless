import { Fragment, ReactElement, useState, useEffect } from 'react';
import { fetchCatalog, Product } from '../lib';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';

const filters = {
  price: [
    { value: '0', label: '$0 - $25', checked: false },
    { value: '2500', label: '$25 - $50', checked: false },
    { value: '3000', label: '$50 - $75', checked: false },
    { value: '7500', label: '$75+', checked: false },
  ],
  category: [
    { value: 'polos', label: 'Polos', checked: false },
    { value: 'trousers', label: 'Trousers', checked: false },
  ],
};

const sortOptions = [
  { name: 'Price: Low to High', value: 'asc', current: false },
  { name: 'Price: High to Low', value: 'desc', current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Catalog(): ReactElement {
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('');

  useEffect(() => {
    async function loadCatalog() {
      try {
        const products = await fetchCatalog();
        setProducts(products);
        console.log(products);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadCatalog();
  }, []);

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div>
        Error Loading Catalog:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );

  function handleCheckboxChange(type: 'price' | 'category', value: string) {
    if (type === 'category') {
      setSelectedCategories((prev) => {
        if (prev.includes(value)) {
          return prev.filter((cat) => cat !== value);
        } else {
          return [...prev, value];
        }
      });
    } else if (type === 'price') {
      setSelectedPrices((prev) => {
        if (prev.includes(value)) {
          return prev.filter((price) => price !== value);
        } else {
          return [...prev, value];
        }
      });
    }
  }

  const filteredProducts = products?.filter((product) => {
    // Filter by category
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    // Filter by price
    const priceMatch = selectedPrices.some((price) => {
      switch (price) {
        case '0':
          return product.price <= 25;
        case '2500':
          return product.price > 2500 && product.price <= 3000;
        case '3000':
          return product.price > 3000 && product.price <= 7500;
        case '75':
          return product.price > 75;
        default:
          return false;
      }
    });

    return categoryMatch && (selectedPrices.length === 0 || priceMatch);
  });

  const clearFilters = () => {
    setSelectedPrices([]);
    setSelectedCategories([]);
  };

  let sortedProducts = [...(filteredProducts || [])];
  if (sortOrder === 'asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="bg-timeless1">
      <main className="pb-24">
        <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Workspace
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            The secret to a tidy desk? Don't get rid of anything, just put it in
            really really nice looking containers.
          </p>
        </div>

        {/* Filters */}
        <Disclosure
          as="section"
          aria-labelledby="filter-heading"
          className="grid items-center border-b border-t border-gray-200">
          <h2 id="filter-heading" className="sr-only">
            Filters
          </h2>
          <div className="relative col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
              <div>
                <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                  <FunnelIcon
                    className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  {`${
                    selectedCategories.length + selectedPrices.length
                  } Filters`}
                </Disclosure.Button>
              </div>
              <div className="pl-6">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-gray-500">
                  Clear all
                </button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="border-t border-gray-200 py-10">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
              <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                <fieldset>
                  <legend className="block font-medium">Price</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {filters.price.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center text-base sm:text-sm">
                        <input
                          id={`price-${optionIdx}`}
                          type="checkbox"
                          className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={selectedPrices.includes(option.value)}
                          onChange={() =>
                            handleCheckboxChange('price', option.value)
                          }
                        />
                        <label
                          htmlFor={`price-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-600">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="block font-medium">Category</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {filters.category.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center text-base sm:text-sm">
                        <input
                          id={`category-${optionIdx}`}
                          type="checkbox"
                          className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={selectedCategories.includes(option.value)}
                          onChange={() =>
                            handleCheckboxChange('category', option.value)
                          }
                        />
                        <label
                          htmlFor={`category-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-600">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          </Disclosure.Panel>
          <div className="col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
              <Menu as="div" className="relative inline-block">
                <div className="flex">
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              onClick={() => setSortOrder(option.value)}
                              className={classNames(
                                option.current
                                  ? 'font-medium text-gray-900'
                                  : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}>
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </Disclosure>
        <ProductCard products={sortedProducts} />
      </main>
    </div>
  );
}
