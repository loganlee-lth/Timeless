import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function Fail(): ReactElement {
  return (
    <div className="bg-timeless1 flex-1 mt-24">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="w-16 h-16 mx-auto my-6"
        enable-background="new 0 0 64 64">
        <circle cx="32" cy="32" r="30" fill="#fff" />
        <path
          d="m32 2c-16.568 0-30 13.432-30 30s13.432 30 30 30 30-13.432 30-30-13.432-30-30-30m5.513 44.508l-5.514-9.894-5.825 9.894h-7.048l9.331-14.783-8.878-14.232h7.244l5.175 9.449 5.317-9.449h7.008l-8.878 13.996 9.429 15.02h-7.361z"
          fill="#e53935"
        />
      </svg>
      <div className="text-center">
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
          Failed
        </h3>
        <p className="text-gray-600 my-2">
          Unfortunately payment was rejected.
        </p>
        <p className="text-gray-600">
          {' '}
          Click button below to return to the main page.{' '}
        </p>
        <div className="py-10 text-center">
          <Link
            to="/"
            className="max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">
            GO BACK
          </Link>
        </div>
      </div>
    </div>
  );
}
