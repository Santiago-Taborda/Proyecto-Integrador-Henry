interface IUsers extends ILoginUser {
  name: string;
  address: string;
  phone: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUserContextData {
  login: boolean;
  user: User;
  token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
  credential: Credential;
}

interface Credential {
  id: number;
  password: string;
}

export default IUsers;
