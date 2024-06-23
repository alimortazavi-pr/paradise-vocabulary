//Types

export interface IAuthState {
  authForm: IAuthFrom;
  token?: string;
}

export interface IAuthFrom {
  mobile: string;
  password: string;
}
