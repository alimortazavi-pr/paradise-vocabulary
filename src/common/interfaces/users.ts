export interface IUser {
  mobile: string;
  password: string;
  token: {
    token: string;
    expires: number;
  };
}
