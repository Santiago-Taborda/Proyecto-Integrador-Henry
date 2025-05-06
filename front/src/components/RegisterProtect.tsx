"use client";

import useUser from "@/contexts/user_context";
import { redirect } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const RegisterProtect = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  const [is_client, set_is_client] = useState(false);

  useEffect(() => {
    if (user?.login) {
      redirect("/home");
    }
    if (!is_client) {
      set_is_client(true);
    }
  });

  useEffect(() => {
    if (user?.login) {
      redirect("/home");
    }
  }, [user?.login]);

  if (!is_client)
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  else return <>{children}</>;
};

export default RegisterProtect;
