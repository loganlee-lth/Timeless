import { ReactElement, useState, useEffect } from 'react';
import { fetchCatalog, Product } from '../lib';
import Filter from '../components/Filter';
import Sort from '../components/Sort';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { Disclosure } from '@headlessui/react';

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
          return product.price <= 2000;
        case '2000':
          return product.price > 2000 && product.price <= 3500;
        case '3500':
          return product.price > 3500 && product.price <= 5500;
        case '5500':
          return product.price > 5500;
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

        <Disclosure
          as="section"
          aria-labelledby="filter-heading"
          className="grid items-center border-b border-t border-gray-200">
          <Filter
            selectedPrices={selectedPrices}
            selectedCategories={selectedCategories}
            handleCheckboxChange={handleCheckboxChange}
            clearFilters={clearFilters}
          />
          <Sort handleClick={setSortOrder} />
        </Disclosure>
        <ProductCard products={sortedProducts} />
      </main>
    </div>
  );
}
