import Link from "next/link";

const Landing = () => {
  return (
    <>
      <div className="padding h-[70vh] bg-gradient-to-r from-orange from-15% via-[#9f5fbf] via-50% to-sky to-85% flex flex-col justify-center items-center text-white">
        <h2 className="mt-8">+ 100 productos disponibles ahora mismo</h2>
        <h2>Ofertas todas las semanas</h2>
        <h2>Las marcas de tu confianza</h2>
        <p className="m-3 text-background_1 font-medium">accede a tu cuenta para comprar cuando quieras</p>
        <div className="mt-1 w-3/4 lg:w-1/2 flex justify-between">
          <Link href="/login" className="py-1 px-4 bg-sky text-xl text-black text-center">Inicia sesion</Link>
          <Link href="/register" className="py-1 px-4 bg-orange text-xl">Registrate</Link>
        </div>
        <Link href="/home" className="mt-2 py-1 px-4 bg-background_2 text-xl">Explora y Compra!</Link>
      </div>
      <div className="w-full h-[8vh] flex justify-center items-center">

      <Link href="/product" className="text-detail">¡AGREGA TU PRIMER PRODUCTO AL CARRITO AHORA!</Link>
      </div>
    </>
  );
};

export default Landing;
