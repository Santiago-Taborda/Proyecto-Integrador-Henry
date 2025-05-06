import IUsers, { ILoginUser, IUserContextData, User } from "@/interfaces/Users";

const api_url = process.env.NEXT_PUBLIC_API_URL;

export const register_user = async (data: IUsers): Promise<User> => {
  const res = await fetch(`${api_url}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await res.json();
  if (res.status !== 201) {
    const data: string[] = response.message.split("«");
    throw new Error(data[0]);
  }
  return await response;
};

export const login_user = async (data: ILoginUser): Promise<IUserContextData> => {
  
    const res = await fetch(`${api_url}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();
    if (res.status !== 200) {
      const data: string[] = response.message.split("«");
      throw new Error(data[0]);
    }
    return await response;

};
