import { string } from "yup/lib/locale";
import { User } from "./user";
import { SignInValues as BESignInValues } from "./be/auth";

export interface ForgotPassword {
  email: string;
}

export interface ResetPassword {
  code: string;
  password: string;
  passwordConfirm: string;
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export interface SignUpValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface SignInValues {
  email: string;
  password: string;
}

export interface SignInResponseData {
  token: string;
  expired: number;
  refreshToken: string;
  user: User;
}

export interface Verification {
  mode: VerificationMode;
  error: string | null;
  isSubmitting: boolean;
  steps: VerificationStep;
  data: BESignInValues;
}

export type VerificationMode = "email" | "phone" | null;

export type VerificationStep = 1 | 2;

export interface ConfirmEmailData {
  code: string;
}

export interface ConfirmPhoneData {
  code: string;
}
