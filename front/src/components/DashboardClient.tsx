"use client";

import useUser from "@/contexts/user_context";
import { redirect } from "next/navigation";

const DashboardClient = () => {
  const { user, orders } = useUser();
  const user_data = user?.user;

  return (
    <>
      {user_data ? (
        <>
          <h1 className="pt-12 text-center">Usuario: {user_data.name}</h1>
          <br />
          <div className="flex flex-row justify-evenly">
            <ul>
              <li>Email: {user_data.email}</li>
              <br />
              <li>Nombre: {user_data.name}</li>
              <br />
              <li>Telefono: {user_data.phone}</li>
              <br />
              <li>Dirección: {user_data.address}</li>
              <br />
              <li>Rol: {user_data.role}</li>
            </ul>

            <div className="flex flex-col items-center">
              <h4>Ordenes de compra</h4>
              {orders.length ? (
                <div className="px-2 py-1 flex flex-col bg-background_2">
                  {orders.map((order) => {
                    const date: string[] = order.date.split("T");
                    const time: string[] = date[1].split(".");
                    return (
                      <div
                        key={order.id}
                        className="p-2 my-1 bg-mono_1 w-full grid grid-cols-2 items-start"
                      >
                        <div className="mr-1 flex flex-col items-start">
                          <p>{order.products.length} Productos Comprados : </p>
                          <p>Estatus: {order.status}</p>
                          <p>Fecha: {date[0]}</p>
                          <p>Hora: {time[0]}</p>
                        </div>
                        <div className="flex flex-col items-start">
                          <p>{order.products.length >= 1 ? order.products[0].name : null}</p>
                          <p>{order.products.length >= 2 ? order.products[1].name : null}</p>
                          <p>{order.products.length >= 3 ? order.products[2].name : null}</p>
                          <>
                            {order.products.length >= 4 ? (
                              <p>y {order.products.length - 3} productos más</p>
                            ) : null}
                          </>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>No tienes ninguna orden en el carrito</p>
              )}
            </div>
          </div>
        </>
      ) : (
        redirect("/login")
      )}
    </>
  );
};

export default DashboardClient;
