import { FormikValues } from "formik";
import { Dispatch, SetStateAction, useContext } from "react";
import {
  confirmMail,
  confirmPhone,
  signIn as signInRequest,
} from "../../api/auth";
import { Navigation } from "../../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SignInResponseData,
  SignUpValues,
  Verification,
  VerificationMode,
} from "../../types/auth";
import { User } from "../../types/user";
import { SignInValues as BESignInValues } from "../../types/be/auth";
import { setToken } from "../../utils/common";

// export const initSignUpValues = {
//   phone: "+380951045054",
//   email: "s.dykyi@technoji.io",
//   password: "1q2w3e4r",
//   passwordConfirm: "1q2w3e4r",
//   firstName: "muhammadu",
//   lastName: "zaini",
// };

export const initSignUpValues: SignUpValues = {
  phone: "",
  email: "",
  password: "",
  passwordConfirm: "",
  firstName: "",
  lastName: "",
};

export const handleSignUpSubmit = ({
  navigation,
  signUp,
}: {
  navigation: Navigation;
  signUp: (
    data: SignUpValues,
    onSuccess: (data: BESignInValues) => void,
    onError: any
  ) => Promise<void>;
}) => {
  return async (
    values: SignUpValues,
    { setStatus, setSubmitting }: FormikValues
  ): Promise<void> => {
    setSubmitting(true);
    await signUp(
      values,
      async (data: BESignInValues) => {
        setStatus({
          success: true,
          errors: {},
        });
        setSubmitting(false);

        const {
          jwt: { token },
        } = data;

        await setToken(token);

        navigation?.navigate("Confirmation", {
          mode: "phone",
          steps: 2,
          data,
        });
      },
      (message: string) => {
        setStatus({
          success: false,
          errors: {
            passwordConfirm: message,
          },
        });
        setSubmitting(false);
      }
    );
  };
};

// export const initVerficationState: Verification = {
//   mode: null,
//   error: null,
//   isSubmitting: false,
//   email: "",
//   phone: "",
//   _id: "",
//   steps: 2,
// };

export type SignUpActive = Record<keyof SignUpValues, boolean>;

export const initActiveState: SignUpActive = {
  firstName: false,
  lastName: false,
  phone: false,
  email: false,
  password: false,
  passwordConfirm: false,
};
