import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';
import { Auth, User, ShoppingCartItem, fetchCart } from './lib';
import AppContext from './context/AppContext';
import ShoppingCartContext from './context/ShoppingCartContext';
import Loading from './components/Loading';

const tokenKey = 'timeless';

function App() {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [cart, setCart] = useState<ShoppingCartItem[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem(tokenKey);
    if (auth) {
      const { user, token } = JSON.parse(auth);
      setUser(user);
      setToken(token);
    }
    setIsAuthorizing(false);
  }, []);

  useEffect(() => {
    async function loadCart(userId: number) {
      try {
        const cart = await fetchCart(userId, token as string);
        setCart(cart);
      } catch (err) {
        console.error(err);
      }
    }
    user && loadCart(user.userId);
  }, [user, token, setCart]);

  if (isAuthorizing) return <Loading />;

  function handleSignIn(auth: Auth) {
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
  }

  const contextValue = { user, token, handleSignIn, handleSignOut };
  const ShoppingCartContextValue = { cart, setCart };

  return (
    <AppContext.Provider value={contextValue}>
      <ShoppingCartContext.Provider value={ShoppingCartContextValue}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="sign-in" element={<AuthPage action="sign-in" />} />
            <Route path="sign-up" element={<AuthPage action="sign-up" />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/details/:productId" element={<ProductDetails />} />
            <Route path="/cart/:userId" element={<ShoppingCart />} />
          </Route>
        </Routes>
      </ShoppingCartContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
