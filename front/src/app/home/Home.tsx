import Brands from "@/components/Brands";
import CardProducts from "@/components/CardProduct";
import brands_list from "@/helpers/brands_list";
import IProducts from "@/interfaces/Products";
import { get_products_list } from "@/services/products_service";
import Image from "next/image";

interface IBrands {
  id: number;
  src: string;
  name: string;
  dispositivos: string[];
}

const Home = async () => {
  const products = await get_products_list();
  return (
    <>
      <div className="relative w-full aspect-[2/1] ">
        <Image
          src="https://images.unsplash.com/photo-1604329051903-d89ddd523330?q=100&w=5600&h=2800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Inicio"
          fill
          style={{ objectFit: "contain" }}
        />
        <div className="relative w-[45%] h-[55%] flex flex-col-reverse justify-start items-end">
          <h3 className="text-base md:text-2xl font-merienda text-sky text-end mt-1">Comparte tu experiencia</h3>
          <h3 className="text-base md:text-2xl font-merienda text-sky text-end">de hoy y el futuro.</h3>
          <h3 className="text-base md:text-2xl font-merienda text-sky text-end">Accede a la tecnologia</h3>
        </div>
      </div>

      <div className="flex flex-row bg-neutral">
        {brands_list.map((brand: IBrands) => {
          return (
            <Brands
              key={brand.id}
              src={brand.src}
              name={brand.name}
              dispositivos={brand.dispositivos}
            />
          );
        })}
      </div>

      <div className="padding">
        <h1 className="w-full flex justify-center">Productos Destacados</h1>

        <div className="flex flex-row flex-wrap justify-center">
          {products.length ? (
            products.map((product: IProducts) => {
              return (
                <CardProducts
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  image={product.image}
                  categoryId={product.categoryId}
                  stock={product.stock}
                />
              );
            })
          ) : (
            <h3>No hay productos disponibles</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
