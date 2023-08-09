import { createContext } from 'react';
import { ShoppingCartItem } from '../lib';

type ShoppingCartContextValues = {
  cart: ShoppingCartItem[];
  setCart: (cart: ShoppingCartItem[]) => void;
};

const ShoppingCartContext = createContext<ShoppingCartContextValues>({
  cart: [],
  setCart: () => undefined,
});

export default ShoppingCartContext;
