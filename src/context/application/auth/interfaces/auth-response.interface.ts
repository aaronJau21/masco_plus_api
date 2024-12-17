export interface IAuthResponse {
  token: string;
  user: IUser;
}

export interface IUser {
  email: string;
  name: string;
  role: string;
}
