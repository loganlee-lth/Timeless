import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/details/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Route>
    </Routes>
  );
}

export default App;
