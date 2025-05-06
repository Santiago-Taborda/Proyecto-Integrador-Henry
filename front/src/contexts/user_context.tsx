"use client";
import { IOrders } from "@/interfaces/Orders";
import { IUserContextData } from "@/interfaces/Users";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface provider_props {
  children: ReactNode;
}
interface context_props {
  user: IUserContextData | null;
  set_user: Dispatch<SetStateAction<IUserContextData | null>>;
  logout: () => void;
  orders: IOrders[];
  set_orders: Dispatch<SetStateAction<IOrders[]>>;
}

export const user_context = createContext<context_props>({
  user: null,
  set_user: () => {},
  logout: () => {},
  orders: [],
  set_orders: () => {},
});

export const UserProvider = ({ children }: provider_props) => {
  const [user, set_user] = useState<IUserContextData | null>(null);
  const [orders, set_orders] = useState<IOrders[]>([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const local_user = JSON.parse(localStorage.getItem("user")!);
    set_user(local_user);
  }, []);

  useEffect(() => {
    if (orders.length) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);

  useEffect(() => {
    const local_orders = JSON.parse(localStorage.getItem("orders")!);
    if (Array.isArray(local_orders)) {
      set_orders(local_orders);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("orders");
    set_user(null);
    set_orders([]);
  };

  return (
    <user_context.Provider value={{ user, set_user, logout, orders, set_orders }}>
      {children}
    </user_context.Provider>
  );
};

const useUser = () => useContext(user_context);
export default useUser;
