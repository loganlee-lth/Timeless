import { ReactElement } from 'react';
import { Disclosure } from '@headlessui/react';
import { FunnelIcon } from '@heroicons/react/20/solid';

type FilterOption = {
  value: string;
  label: string;
  checked: boolean;
};

type Filters = {
  price: FilterOption[];
  category: FilterOption[];
};

const filters: Filters = {
  price: [
    { value: '0', label: '$0 - $20', checked: false },
    { value: '2000', label: '$20 - $35', checked: false },
    { value: '3500', label: '$35 - $55', checked: false },
    { value: '5500', label: '$55+', checked: false },
  ],
  category: [
    { value: 't-shirt', label: 'T-shirt', checked: false },
    { value: 'polos', label: 'Polo shirt', checked: false },
    { value: 'sweater', label: 'Sweater', checked: false },
    { value: 'trousers', label: 'Trousers', checked: false },
  ],
};

type FilterProps = {
  selectedPrices: string[];
  selectedCategories: string[];
  handleCheckboxChange: (type: 'price' | 'category', value: string) => void;
  clearFilters: () => void;
};

export default function Filter({
  selectedPrices,
  selectedCategories,
  handleCheckboxChange,
  clearFilters,
}: FilterProps): ReactElement {
  return (
    <>
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
              {`${selectedCategories.length + selectedPrices.length} Filters`}
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
    </>
  );
}
