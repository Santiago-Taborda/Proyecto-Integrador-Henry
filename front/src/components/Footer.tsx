const Footer = () => {
  return (
    <footer className="relative mt-auto p-5 h-max bg-background_2 font-merienda text-xs flex flex-col justify-center items-center">
      <div className="w-full px-[10%] lg:px-[20%] grid grid-cols-3">
        <div className="flex flex-col">
          <h5>Otros proyectos</h5>
          <p>fake-proyect-1.com</p>
          <p>fake-proyect-2.com</p>
          <p>fake-proyect-3.com</p>
        </div>
        <div className="flex flex-col">
          <h5>Contactanos</h5>
          <p>fake.mail@gmail.com</p>
          <p>12 3456 789</p>
          <p>Fake Street 123</p>
        </div>
        <div className="flex flex-col">
          <h5>Nuestras Redes</h5>
          <p>x.com/coldfire</p>
          <p>instagram.com/@coldfire_official</p>
          <p>facebook.com/@coldfire_official</p>
        </div>
      </div>
      <p className="pt-2">© 2025 Santiago Taborda. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
