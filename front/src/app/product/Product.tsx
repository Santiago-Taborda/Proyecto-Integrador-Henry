import CardProducts from "@/components/CardProduct";
import categories from "@/helpers/categories";
import IProducts from "@/interfaces/Products";
import { get_products_list } from "@/services/products_service";

interface ICategoryList {
  category: string;
  products: IProducts[];
}

const Product = async () => {
  const products = await get_products_list();
  const category_list: ICategoryList[] = [];

  products.map((product) => {
    const category_index: number = category_list.findIndex(
      (c) => c.category === categories(product.categoryId)
    );
    if (category_index !== -1) {
      category_list[category_index].products.push(product);
    } else {
      category_list.push({
        category: categories(product.categoryId),
        products: [product],
      });
    }
  });

  return (
    <div className="padding">
      <h1 className="mt-12 w-full flex justify-center">Productos</h1>
      {category_list.length ? (
        category_list.map((category) => {
          return (
            <div key={category.category}>
              <h2>{category.category}</h2>

              <div className="flex flex-row flex-wrap">
                {category.products.length ? (
                  category.products.map((product) => {
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
          );
        })
      ) : (
        <h3>No hay productos disponibles</h3>
      )}
    </div>
  );
};

export default Product;
