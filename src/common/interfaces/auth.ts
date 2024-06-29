//Types

export interface IAuthState {
  authForm: IAuthFrom;
  token?: string;
  user: IUser | undefined;
}

export interface IAuthFrom {
  mobile: string;
  password: string;
}

export interface IUser {
  mobile: string;
}
