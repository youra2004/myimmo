import {
  ConfirmEmailData,
  ConfirmPhoneData,
  ForgotPassword,
  ResetPassword,
  SignInValues,
  SignUpValues,
} from "../types/auth";
import { User } from "../types/user";
import { getRefreshToken } from "../utils/common";
import { http } from "../utils/http";

export const signIn = async (data: SignInValues): Promise<Response> => {
  return await http.post("auth/login", data);
};

export const resetPassword = async (code: string, data: ResetPassword) => {
  return await http.patch(`auth/reset-password/${code}`, data);
};

export const forgotPassword = async (data: ForgotPassword) => {
  return await http.post("auth/forgot-password", data);
};

export const getMe = async () => {
  return await http.get("/user/profile");
};

export const updateUser = async (data: Partial<User>) => {
  return await http.patch(`user`, data);
};

export const socialLogin = async (data: any) => {
  return await http.post("auth/socialLogin", data);
};

export const freshToken = async () => {
  const refreshToken = await getRefreshToken();
  return await http.post(
    "auth/fresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
};

export const signUp = async (data: SignUpValues) => {
  return await http.post("registration", data);
};

export const confirmPhone = async (data: ConfirmPhoneData) => {
  return await http.post("registration/confirm/phone", data);
};

export const confirmMail = async (data: ConfirmEmailData) => {
  return await http.post("registration/confirm/email", data);
};

export const resendPhone = async () => {
  return await http.post("registration/resend/phone");
};

export const resendEmail = async () => {
  return await http.post("registration/resend/email");
};

export const social = async (data: {
  token: string;
  type: "google" | "facebook";
}) => {
  return await http.post("registration/social", data);
};
