import React from "react";
import IProducts from "../interfaces/Products";
import Link from "next/link";
import Image from "next/image";
import categories from "@/helpers/categories";

const CardProducts: React.FC<IProducts> = ({ id, name, price, image, categoryId, stock }) => {
  const category = categories(categoryId);
  return (
    <div className="w-full sm:w-[18%] lg:w-[15%] 2xl:w-[12%]  h-min bg-mono_1 rounded m-2 shadow-card dark:shadow-dark_card hover:scale-105 duration-200 flex flex-col justify-start items-center">
      <div className="w-full h-1 bg-orange rounded-t" />
      <div className="w-full aspect-square bg-white flex justify-center items-center relative">
        <Image src={image} alt={name} fill loading="lazy" style={{ objectFit: "contain" }} />
      </div>
      <div className="h-px bg-mono_2" />
      <div className="w-full p-2">
        <h4>{name}</h4>
        <h5>{category}</h5>
        <div className="w-full flex flex-col md:flex-row items-baseline">
          <p className="w-full md:w-1/2 text-center">${price}</p>
          <div className="w-px h-full bg-white" />

          <p className="w-full md:w-1/2 text-center">Stock: {stock}</p>
        </div>
        <Link
          href={`/product/${id}`}
          className="w-full bg-orange border-sky border-[2px] flex justify-center items-center"
        >
          <span className="text-center text-white">ver producto</span>
        </Link>
      </div>
    </div>
  );
};

export default CardProducts;
