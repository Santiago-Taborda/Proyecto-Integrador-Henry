import Product from "@/components/Product";
import { get_one_product } from "@/services/products_service";

interface ProductParams {
  slug: string;
}

const SlugProduct = async ({ params }: { params: ProductParams }) => {
  const { slug } = await params;
  const product = await get_one_product(slug);
  return (
    <div className="padding">
      {product ? (
        <div className="h-full w-full pt-12 flex justify-center items-center">
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            image={product.image}
            categoryId={product.categoryId}
            stock={product.stock}
          />
        </div>
      ) : (
        <h2 className="w-full pt-[20vh] text-center">Producto no encontrado</h2>
      )}
    </div>
  );
};

export default SlugProduct;
