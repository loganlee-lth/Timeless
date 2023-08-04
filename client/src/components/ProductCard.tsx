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
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
      {products?.map((product) => (
        <Link
          key={product.productId}
          to={`/details/${product.productId}`}
          className="group text-sm">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {product.description}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {toDollars(product.price)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
