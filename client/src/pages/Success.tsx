import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function Success(): ReactElement {
  return (
    <div className="bg-timeless1 flex-1 mt-24">
      <svg
        viewBox="0 0 24 24"
        className="text-green-600 w-16 h-16 mx-auto my-6">
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
      </svg>
      <div className="text-center">
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
          Payment Done!
        </h3>
        <p className="text-gray-600 my-2">
          Thank you for completing your secure online payment.
        </p>
        <p className="text-gray-600"> Have a great day! </p>
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
