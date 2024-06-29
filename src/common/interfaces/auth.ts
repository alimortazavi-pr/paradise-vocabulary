//Types
import { IUser } from "./users";

export interface IAuthState {
  authForm: IAuthFrom;
  token?: string;
  user: IUser | undefined;
}

export interface IAuthFrom {
  mobile: string;
  password: string;
}

export interface IUserAuth {
  mobile: string;
  password: string;
  token: {
    token: string;
    expires: number;
  };
}
