import IOrder, { IOrders } from "@/interfaces/Orders";

const api_url = process.env.NEXT_PUBLIC_API_URL;

export const fetch_order = async (data: IOrder): Promise<IOrders> => {
  const res = await fetch(`${api_url}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: data.token,
    },
    body: JSON.stringify({ products: data.product_id }),
  });
  const response = await res.json();
  
  if (res.status !== 200) {
    const data: string[] = response.message.split("«");
    throw new Error(data[0]);
  }

  return await response;
};

export const get_orders = async (token: string): Promise<IOrders[]> => {
  const res = await fetch(`${api_url}/users/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const response = await res.json();

  if (res.status !== 200) {
    const data: string[] = response.message.split("«");
    throw new Error(data[0]);
  }

  return await response;
};

export default fetch_order;
