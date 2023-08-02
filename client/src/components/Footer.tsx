import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

type NavigationItem = {
  name: string;
  to: string;
};

type FooterNavigation = {
  shop: NavigationItem[];
  connect: NavigationItem[];
};

const footerNavigation: FooterNavigation = {
  shop: [
    { name: 'Ready to Wear', to: '/' },
    { name: 'Shoes', to: '/' },
    { name: 'Accessories', to: '/' },
  ],
  connect: [
    { name: 'GitHub', to: '/' },
    { name: 'LinkedIn', to: '/' },
  ],
};

export default function Footer(): ReactElement {
  return (
    <div className="bg-white">
      <footer aria-labelledby="footer-heading" className="bg-gray-900">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
              <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                <div>
                  <h3 className="text-sm font-medium text-white">Shop</h3>
                  <ul className="mt-6 space-y-6">
                    {footerNavigation.shop.map((item) => (
                      <li key={item.name} className="text-sm">
                        <Link
                          to={item.to}
                          className="text-gray-300 hover:text-white">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                <div>
                  <h3 className="text-sm font-medium text-white">Connect</h3>
                  <ul className="mt-6 space-y-6">
                    {footerNavigation.connect.map((item) => (
                      <li key={item.name} className="text-sm">
                        <Link
                          to={item.to}
                          className="text-gray-300 hover:text-white">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 py-10">
            <p className="text-sm text-gray-400">
              Copyright &copy; 2023 Logan Lee
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
