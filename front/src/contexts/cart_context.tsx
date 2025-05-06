"use client";

import IProducts from "@/interfaces/Products";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

interface provider_props {
  children: ReactNode;
}

interface context_props {
  cart: IProducts[];
  set_cart: Dispatch<SetStateAction<IProducts[]>>;
  clear_cart: () => void;
  remove_product: (id: number, name: string) => void;
}

export const cart_context = createContext<context_props>({
  cart: [],
  set_cart: () => {},
  clear_cart: () => {},
  remove_product: () => {},
});

export const CartProvider = ({ children }: provider_props) => {
  const [cart, set_cart] = useState<IProducts[]>([]);

  useEffect(() => {
    if (cart.length) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const local_cart = JSON.parse(localStorage.getItem("cart")!);
    if (Array.isArray(local_cart)) {
      set_cart(local_cart);
    }
  }, []);

  const clear_cart = () => {
    localStorage.removeItem("cart");
    set_cart([]);
  };

  const remove_product = (id: number, name: string) => {
    const remove = cart.filter((product) => product.id !== id);
    set_cart(remove);
    toast.info(`${name} removido del carrito`)
  };

  return (
    <cart_context.Provider value={{ cart, set_cart, clear_cart, remove_product }}>
      {children}
    </cart_context.Provider>
  );
};

const useCart = () => useContext(cart_context);
export default useCart;
