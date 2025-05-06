import Image from "next/image";

interface IBrands {
  src: string;
  name: string;
  dispositivos: string[];
}

const Brands: React.FC<IBrands> = ({ src, name, dispositivos }) => {
  return (
    <div className="w-1/5 aspect-square text-white flex items-center relative">
      <Image src={src} alt={name} fill style={{ objectFit: "contain" }} />
      <div className="z-10 w-full h-full flex flex-col justify-center items-center bg-[#20202050]">
        <p className="font-merienda">Asociados con</p>
        <h1 className="text-xl md:text-[32px] text-center">{name}</h1>
        <p className="mt-1 text-xs text-center">{dispositivos.join(" • ")}</p>
      </div>
    </div>
  );
};

export default Brands;
