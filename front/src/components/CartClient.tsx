"use client";

// React & Next
import { MouseEvent, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Contexts
import { cart_context } from "@/contexts/cart_context";
import useUser from "@/contexts/user_context";

// Intterfaces
import IOrder, { IOrders } from "@/interfaces/Orders";
import IProducts from "@/interfaces/Products";

// Components & Helpers
import { toast } from "sonner";
import fetch_order from "@/services/order_service";
import categories from "@/helpers/categories";

const CartClient = () => {
  const { cart, clear_cart, remove_product } = useContext(cart_context);
  const { user, orders, set_orders } = useUser();
  const [order, set_order] = useState<IOrder>();

  const total = {
    total: 0,
    products: 0,
  };

  useEffect(() => {
    if (user?.token) {
      const products = { token: user?.token, product_id: cart.map((p) => p.id) };
      set_order(products);
    }
  }, [cart, user]);

  const create_order_handler = async (event: MouseEvent) => {
    event.preventDefault();

    if (order) {
      const res = fetch_order(order);

      toast.promise(res, {
        loading: "Creando orden...",
        success: (data: IOrders) => {
          set_orders([data, ...orders]);
          clear_cart();

          const date: string[] = data.date.split("T");
          const time: string[] = date[1].split(".");

          return `Orden creada con exito 
            (Usuario: ${data.user.name},
            Productos Comprados: ${data.products.length},
            Estatus: ${data.status},
            Fecha: ${date[0]},
            Hora: ${time[0]})`;
        },
        error: (data) => {
          if (data == "TypeError: Failed to fetch") {
            data = "Problemas al conectar con el servidor";
          }
          return `Error al crear la orden. ${data}`;
        },
      });
    }
  };

  return (
    <div className="flex flex-col">
      {cart.length ? (
        cart.map((product: IProducts) => {
          const category = categories(product.categoryId);
          total.total += product.price;
          total.products++;
          return (
            <div key={product.id} className="w-full h-12 flex flex-row">
              <Link
                href={`/product/${product.id}`}
                className="h-full aspect-square relative bg-white flex justify-center items-center"
              >
                <Image src={product.image} alt={product.name} fill />
              </Link>
              <div className="pl-1 mx-[0_auto] w-full grid grid-cols-4 bg-background_2 items-center">
                <Link href={`/product/${product.id}`}>{product.name}</Link>
                <p>{category}</p>
                <p>${product.price}</p>
                <button
                  className="w-fit px-1 text-left bg-mono_1 shadow-card dark:shadow-dark_card border-detail border-[0.5px]"
                  onClick={() => remove_product(product.id, product.name)}
                >
                  eliminar del carrito
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <h2 className="p-16 text-center font-oxanium">No hay productos agregados</h2>
      )}
      {cart.length ? (
        <div className="my-2 w-full h-12 flex flex-row justify-between items-center bg-background_2 disabled:opacity-75">
          <div className="w-12 h-full aspect-square bg-background_2" />
          <div className="pl-1 mx-[0_auto] w-full grid grid-cols-4 bg-background_2 items-center">
            <p className="px-1 text-end">Productos Totales: </p>
            <div className="flex justify-between">
              <p>{total.products}</p>
              <p className="px-1 text-end">Total: </p>
            </div>
            <p>${total.total}</p>
            <button
              disabled={!order}
              onClick={(event) => create_order_handler(event)}
              className="w-1/2 text-center text-white bg-orange border-sky border-[2px]"
            >
              Comprar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CartClient;
