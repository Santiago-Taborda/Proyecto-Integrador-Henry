"use client";

import React from "react";
import IProducts from "../interfaces/Products";
import Image from "next/image";
import useUser from "@/contexts/user_context";
import categories from "@/helpers/categories";
import useCart from "@/contexts/cart_context";
import { toast } from "sonner";

const Product: React.FC<IProducts> = ({
  id,
  name,
  price,
  description,
  image,
  stock,
  categoryId,
}) => {
  const { user } = useUser();
  const { cart, set_cart } = useCart();
  const category = categories(categoryId);

  const duplicated = cart.some((prod) => prod.id === id);

  const add_product_handler = () => {
    set_cart([...cart, { id, name, description, price, stock, image, categoryId }]);
    toast.success(`${name} agregado al carrito`)
  };

  return (
    <div className="w-[100%] lg:w-[90%] 2xl:w-[80%] h-min p-4 bg-mono_1 flex flex-col justify-start items-center">
      <div className="w-[70%] pb-3 flex flex-row justify-center items-center">
        <div className="m-[0_auto] w-full h-2 bg-gradient-to-l from-mono_2" />
        <h2 className="w-svw text-center">{name}</h2>
        <div className="m-[0_auto] w-full h-2 bg-gradient-to-r from-mono_2" />
      </div>
      <div className="w-full md:w-1/2 aspect-square bg-white flex justify-center items-center relative">
        <Image src={image} alt={name} fill style={{ objectFit: "contain" }} />
      </div>
      <div className="h-px bg-mono_2" />
      <div className="p-2 flex flex-row items-baseline">
        <p className="w-2/3">
          {category} description: {description}
        </p>
        <div className="w-1/3 flex flex-col justify-around items-center">
          <button
            disabled={!user?.login || duplicated}
            onClick={add_product_handler}
            className="w-full p-1 text-center text-white bg-orange border-sky border-[2px] disabled:opacity-75"
          >
            ${price}
            <p>
              agregar al carrito
              {(!user?.login && " (inicie sesion primero)") ||
                (duplicated && " (el producto ya está en el carrito)")}
            </p>
          </button>
          <p className="w-full text-center">Stock: {stock}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
