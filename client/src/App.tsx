import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppContext from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';
import { Auth, User } from './lib';

const tokenKey = 'react-context-jwt';

function App() {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem(tokenKey);
    if (auth) {
      const a = JSON.parse(auth);
      setUser(a.user);
      setToken(a.token);
    }
    setIsAuthorizing(false);
  }, []);

  if (isAuthorizing) return null;

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

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<AuthPage action="sign-in" />} />
          <Route path="sign-up" element={<AuthPage action="sign-up" />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/details/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
