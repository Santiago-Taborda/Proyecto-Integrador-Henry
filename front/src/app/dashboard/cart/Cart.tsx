import CartClient from "@/components/CartClient";
import RouteProtect from "@/components/RouteProtect";

const Cart = async () => {
  return (
    <RouteProtect>
      <div className="padding flex flex-col">
        <div className="h-full flex flex-row mt-12">
          <div className="w-12 h-full aspect-square bg-background_2" />

          <div className="pl-1 mx-[0_auto] w-full grid grid-cols-4 bg-background_2 items-center">
            <h3>Producto</h3>
            <h3>Categoría</h3>
            <h3>Precio</h3>
            <h3>Eliminar?</h3>
          </div>
        </div>
        <CartClient />
      </div>
    </RouteProtect>
  );
};

export default Cart;
