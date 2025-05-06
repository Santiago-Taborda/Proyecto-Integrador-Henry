"use client";

// next
import { redirect } from "next/navigation";
import Link from "next/link";
// react
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
// interfaces
import { ILoginUser, IUserContextData } from "@/interfaces/Users";
// context
import useUser from "@/contexts/user_context";
// styles
import styles from "@/styles/RegisterAndlogin.module.css";
// validations
import validate_login_data from "@/helpers/validate_login_data";
// Components & Helpers
import { login_user } from "@/services/user_services";
import { toast } from "sonner";
import { get_orders } from "@/services/order_service";

interface ValidationErrors {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  const { set_user, set_orders } = useUser();
  const [login_data, set_login_data] = useState<ILoginUser>({
    email: "",
    password: "",
  });
  const [errors, set_errors] = useState<ValidationErrors>({});

  useEffect(() => {
    set_errors(validate_login_data(login_data));
  }, [login_data]);

  const handle_input_change = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    set_login_data((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handle_on_submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validate_errors = validate_login_data(login_data);
    set_errors(validate_errors);

    if (Object.keys(validate_errors).length > 0) {
      toast.error("Corrige los errores antes de enviar el formulario.");
      return;
    }

    const login_fetch = login_user(login_data);
    toast.promise(login_fetch, {
      loading: "Iniciando Sesión...",
      success: async (data: IUserContextData) => {
        set_user(data);
        const orders = await get_orders(data.token);
        set_orders(orders);
        setTimeout(() => {
          redirect("/home");
        }, 3000);
        return `Usuario "${data.user.name}" logueado correctamente`;
      },
      error: (data) => {
        if (data == "TypeError: Failed to fetch") {
          data =
            "Problemas al conectar con el servidor. Pro favor intente iniciar sesion más tarde";
        } else if (data == "Error: Invalid password" || data == "Error: User does not exist") {
          data = "email o contraseña incorrectos";
        }
        return `Error al loguear el usuario (${data})`;
      },
    });
  };

  return (
    <form className="padding" onSubmit={handle_on_submit}>
      <div className="p-[2%] shadow-container dark:shadow-dark_container bg-background_2 flex flex-col items-center">
        <h2>Inicie sesion si ya tiene un usuario</h2>
        <div className={styles.campos}>
          <label>Ingrese su email: </label>
          <input
            name="email"
            value={login_data.email}
            type="text"
            onChange={handle_input_change}
            placeholder="fulano38@gmail.com"
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.campos}>
          <label>Ingrese su contraseña: </label>
          <input
            name="password"
            value={login_data.password}
            type="password"
            onChange={handle_input_change}
            placeholder="contraseña321"
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        <button
          className="mt-[1.5%] px-4 py-1 text-center text-white bg-orange border-sky border-[2px] disabled:opacity-75"
          disabled={errors.email !== undefined || errors.password !== undefined}
        >
          Iniciar Sesion
        </button>
        <Link href="/register" className="mt-[1.5%] text-detail text-[16px] font-medium">
          SI NO TIENE UN USUARIO AÚN, POR FAVOR REGISTRESÉ
        </Link>
      </div>
    </form>
  );
};
export default LoginForm;
