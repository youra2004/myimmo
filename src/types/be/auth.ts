import { User } from "../user";

export interface SignInValues {
  user: User;
  jwt: Jwt;
  rt: Rt;
}

export interface Jwt {
  token: string;
  expired: number;
}

export interface Rt extends Jwt {}
