import IProducts from "@/interfaces/Products";
const api_url = process.env.API_URL;

export const fetch_products = async (): Promise<IProducts[]> => {
  const response = await fetch(`${api_url}/products`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
      return [];
    });
  return response;
};

export const get_products_list = async () => {
  const products = await fetch_products();
  return products;
};

export const get_one_product = async (id: string) => {
  const products = await get_products_list();
  const product = products.find((product) => product.id === Number(id));
  return product;
};
