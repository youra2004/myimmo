import { FormikValues } from "formik";
import { GOOGLE_API_KEY } from "../../utils/config";
import head from "lodash/head";
import {
  getFacebookUserByToken,
  getGoogleUserByToken,
  getGoogleUserPhoneMumber,
} from "../../api/social";
import { socialLogin } from "../../api/auth";
import { SocialLogIn, SocialLoginProvider } from "../../types/social";
import { Dispatch, SetStateAction } from "react";
import {
  signUp as signUpRequest,
  signIn as signInRequest,
} from "../../api/auth";
import { Navigation } from "../../types/navigation";
import {
  SignInResponseData,
  SignInValues as FESignInValues,
} from "../../types/auth";
import { HandleSocialSignInProps } from "./types";
import { SignInValues as BESignInValues } from "../../types/be/auth";
import { ParamList } from "../confirmation/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const initSignInValues = {
  email: "",
  password: "",
};

// export const initSignInValues = {
//   email: "l.schaut@kuenzel-investments.de",
//   password: "Bu76WKX3YZiW",
// };

export const handleSignInSubmit = ({
  signIn,
  navigation,
}: {
  signIn: ({ token, expired, user }: SignInResponseData) => Promise<void>;
  navigation: Navigation;
}) => {
  return async (
    values: any,
    { setStatus, setSubmitting }: FormikValues
  ): Promise<void> => {
    console.log("handleSignInSubmit");
    setSubmitting(true);

    const response = await signInRequest(values);

    const json = await response.json();

    //console.log("json", json);
    if ([200, 201].includes(response.status)) {
      const {
        jwt: { token, expired },
        rt: { token: refreshToken },
        user,
      } = json as BESignInValues;

      await signIn({ token, expired, refreshToken, user });
      setStatus({
        success: true,
        errors: {},
      });
      setSubmitting(false);
      navigation?.navigate("Home");
    } else {
      const { message } = json;
      setStatus({
        success: false,
        errors: {
          password: message,
        },
      });
      setSubmitting(false);
    }
  };
};

export const handleSocialSignInSubmit = ({
  signIn,
  navigation,
}: {
  signIn: ({ token, user }: SignInResponseData) => Promise<void>;
  navigation: Navigation;
}) => {
  return async (
    values: SocialLogIn,
    { setStatus, setSubmitting }: FormikValues
  ): Promise<void> => {
    setSubmitting(true);
    const response = await socialLogin(values);
    const json = await response.json();
    //console.log("json", json);
    //console.log("values", values);
    if ([200, 201].includes(response.status)) {
      const { token, user } = json;
      // await signIn({ token, expired, user });
      // setStatus({
      //   success: true,
      //   errors: {},
      // });
      // setSubmitting(false);
      // navigation?.navigate("Home");
    } else {
      const { message } = json;
      setStatus({
        success: false,
        errors: {
          phone: message,
        },
      });
      setSubmitting(false);
    }
  };
};

export const handleGoogleSignInSubmit = async ({
  values,
  signIn,
  navigation,
  setGoogleSignInError,
}: any) => {
  const response = await socialLogin(values);
  const json = await response.json();
  // console.log("json", json);
  // console.log("values", values);
  if ([200, 201].includes(response.status)) {
    const { token, user } = json;
    await signIn({ token, user });
    navigation?.navigate("Home");
  } else {
    const { message } = json;
    setGoogleSignInError(message);
  }
};

export const fetchGoogleUserByToken = async (
  accessToken: string
): Promise<Partial<SocialLogIn>> => {
  const response = await getGoogleUserByToken(accessToken);
  const json = await response.json();

  if ([200, 201].includes(response.status)) {
    const { id, email, name } = json;
    const phone = await fetchGoogleUserPhoneMumber(id, accessToken);
    return { email, name, phone };
  } else {
    throw new Error("Request error with status code: " + response.status);
  }
};

export const fetchGoogleUserPhoneMumber = async (
  UID: string,
  accessToken: string
) => {
  const response = await getGoogleUserPhoneMumber(UID, accessToken);
  const json = await response.json();
  if (![200, 201].includes(response.status))
    throw new Error("Request error with status code: " + response.status);
  const phoneNumber = head<{ canonicalForm: string }>(json.phoneNumbers);
  if (!phoneNumber) return "";
  const { canonicalForm } = phoneNumber;
  return canonicalForm;
};

export const fetchFacebookUserByToken = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const response = await getFacebookUserByToken(accessToken);
  const json = await response.json();
  if ([200, 201].includes(response.status)) {
    const { name, email } = json;
    return { name, email };
  } else {
    throw new Error("Request error : " + json);
  }
};

export const scopes = [
  "https://www.googleapis.com/auth/user.phonenumbers.read",
];

export const GOOGLE_PROVIDER: SocialLoginProvider = "google";
export const FACEBOOK_PROVIDER: SocialLoginProvider = "facebook";

export const initSocailSignInValues: SocialLogIn = {
  email: "",
  phone: "",
  provider: FACEBOOK_PROVIDER,
  name: "",
};

export type SignInActive = Record<keyof FESignInValues, boolean>;

export const initActiveState: SignInActive = {
  email: false,
  password: false,
};
