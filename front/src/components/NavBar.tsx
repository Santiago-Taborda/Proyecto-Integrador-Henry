"use client";

import Link from "next/link";
import styles from "../styles/NavBar.module.css";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import useUser from "@/contexts/user_context";
import { toast } from "sonner";
import useCart from "@/contexts/cart_context";

const NavBar = () => {
  const { user, logout } = useUser();
  const { clear_cart } = useCart();
  const [login, set_login] = useState(user?.login ?? null);

  useEffect(() => {
    set_login(user?.login ?? null);
  }, [user]);

  const logout_handler = (event: MouseEvent) => {
    event.preventDefault();
    toast.warning("Seguro que quieres cerrar sesión?", {
      action: {
        label: "Seguro",
        onClick() {
          logout();
          clear_cart()
        },
      },
      position: "top-right"
    });
  };

  return (
    <div className="absolute w-full h-max mb-14 z-10 bg-[#000000a0] shadow-[0px_20px_30px_15px_#000000a0] flex flex-row">
      <Link
        href="/"
        className="w-48 h-11 flex flex-row items-center bg-gradient-to-r from-sky via-orange"
      >
        {}
        <div className="w-11 h-11 aspect-square relative">
          <Image
            src="https://static.vecteezy.com/system/resources/thumbnails/023/450/148/large/rocket-icon-logo-on-transparent-background-created-with-generative-ai-png.png"
            alt="icon"
            fill
          />
        </div>
        <span className="text-sky font-merienda w-full h-min">COLDFIRE</span>
      </Link>

      {!login ? <div className="w-40 h-11 flex flex-row items-center" /> : null}

      <div className="text-white text-[20px] w-full md:items-center flex flex-col justify-center">
        <div className="md:w-[90%] lg:w-[80%] flex justify-between items-center">
          <Link href="/home" className={styles.span}>
            HOME
          </Link>
          <div className={styles.line} />
          <Link href="/product" className={styles.span}>
            PRODUCTS
          </Link>
          {login ? (
            <>
              <div className={styles.line} />

              <Link href="/dashboard" className="flex flex-row">
                <div className="md:w-7 md:h-7 my-[5px] aspect-square relative">
                  <Image
                    src="https://cdn-icons-png.freepik.com/512/7718/7718888.png"
                    alt="user"
                    fill
                  />
                </div>
                <span className={styles.span}>DASHBOARD</span>
              </Link>
              <div className={styles.line} />

              <Link href="/dashboard/cart" className={styles.span}>
                CART
              </Link>
            </>
          ) : null}
          <div className={styles.line} />
          <Link href="/landing" className={styles.span}>
            LANDING
          </Link>
        </div>
      </div>

      {!login ? (
        <div className="w-44 h-11 flex flex-row items-center">
          <Link href="/login" className="w-full h-full flex justify-center items-center">
            <span className="font-semibold text-xl text-white">LOG IN</span>
          </Link>
        </div>
      ) : null}

      <div className="px-2 md:px-4 lg:px-6 h-11 flex flex-row-reverse bg-orange">
        {!login ? (
          <Link href="/register" className="w-full h-full flex justify-center items-center">
            <span className="font-semibold text-xl text-white">REGISTER</span>
          </Link>
        ) : (
          <button
            onClick={(event) => logout_handler(event)}
            className="w-full h-full font-semibold text-base md:text-xl text-center md:text-nowrap text-white"
          >
            LOG OUT
          </button>
        )}
      </div>
    </div>
  );
};
export default NavBar;
