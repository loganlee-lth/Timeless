import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Product, toDollars } from '../lib';

type ProductCardProps = {
  products: Product[] | undefined;
};

export default function ProductCard({
  products,
}: ProductCardProps): ReactElement {
  return (
    <section
      aria-labelledby="products-heading"
      className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
      <h2 id="products-heading" className="sr-only">
        Products
      </h2>

      <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <div
            key={product.productId}
            className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="pb-4 pt-10 text-center">
              <h3 className="text-sm font-medium text-gray-900">
                <Link to={`/details/${product.productId}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
              <div className="mt-3 flex flex-col items-center">
                <p className="mt-1 text-sm text-gray-500">
                  {product.shortDescription}
                </p>
              </div>
              <p className="mt-4 text-base font-medium text-gray-900">
                {toDollars(product.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
