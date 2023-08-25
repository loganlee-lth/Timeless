import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout(): ReactElement {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
