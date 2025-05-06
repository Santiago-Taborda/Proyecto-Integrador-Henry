"use client";

// next
import Link from "next/link";
import { redirect } from "next/navigation";
// react
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// interfaces
import IUsers, { User } from "@/interfaces/Users";
// validations
import validate_register_data from "@/helpers/validate_register_data";
// styles
import styles from "@/styles/RegisterAndlogin.module.css";
// Components & Helpers
import { toast } from "sonner";
import { register_user } from "@/services/user_services";

interface ValidationErrors {
  email?: string;
  password?: string;
  name?: string;
  address?: string;
  phone?: string;
}

const RegisterForm = () => {
  const [register_data, set_register_data] = useState<IUsers>({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
  });
  const [errors, set_errors] = useState<ValidationErrors>({});

  useEffect(() => {
    set_errors(validate_register_data(register_data));
  }, [register_data]);

  const handle_input_change = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    set_register_data((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handle_on_submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validate_errors = validate_register_data(register_data);
    set_errors(validate_errors);

    if (Object.keys(validate_errors).length > 0) {
      toast.error("Corrige los errores antes de enviar el formulario.");
      return;
    }

    const register = register_user(register_data);
    toast.promise(register, {
      loading: "Registrando Usuario...",
      success: (data: User) => {
        setTimeout(() => {
          redirect("/login");
        }, 3000);
        return `Formulario completado exitosamente, ahora por favor inicie sesión: ${data.email}`;
      },
      error: (data) => {
        if (data == "TypeError: Failed to fetch") {
          data = "Problemas al conectar con el servidor. Pro favor intente iniciar sesion más tarde";
        }
        return `Error al registrar el usuario (${data})`;
      },
    });
  };

  return (
    <form className="padding" onSubmit={handle_on_submit}>
      <div className="p-[2%] shadow-container dark:shadow-dark_container bg-background_2 flex flex-col items-center">
        <h2>Registrar usuario</h2>
        <div className={styles.campos}>
          <label>Ingrese su email: </label>
          <input
            name="email"
            value={register_data.email}
            type="text"
            onChange={handle_input_change}
            placeholder="juanperez60@gmail.com"
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.campos}>
          <label>Cree una contraseña: </label>
          <input
            name="password"
            value={register_data.password}
            type="password"
            onChange={handle_input_change}
            placeholder="contraseña321"
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        <div className={styles.campos}>
          <label>Nombre/s y Apellido/s: </label>
          <input
            name="name"
            value={register_data.name}
            type="text"
            onChange={handle_input_change}
            placeholder="Juan Pérez"
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        <div className={styles.campos}>
          <label>Ingrese su Dirección: </label>
          <input
            name="address"
            value={register_data.address}
            type="text"
            onChange={handle_input_change}
            placeholder="San Martin 4321"
          />
          {errors.address && <p className={styles.error}>{errors.address}</p>}
        </div>
        <div className={styles.campos}>
          <label>Numero de Telefono: </label>
          <input
            name="phone"
            value={register_data.phone}
            type="text"
            onChange={handle_input_change}
            placeholder="+44 (20) 1234-5678"
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        </div>
        <button
          className="mt-[1.5%] px-4 py-1 text-center text-white bg-orange border-sky border-[2px] disabled:opacity-75"
          disabled={
            errors.email !== undefined ||
            errors.password !== undefined ||
            errors.name !== undefined ||
            errors.address !== undefined ||
            errors.phone !== undefined
          }
        >
          Crear Cuenta
        </button>
        <Link href="/login" className="mt-[1.5%] text-detail text-[16px] font-medium">
          SI YA TIENE UN USUARIO REGISTRADO, POR FAVOR INICIE SESION
        </Link>
      </div>
    </form>
  );
};
export default RegisterForm;
