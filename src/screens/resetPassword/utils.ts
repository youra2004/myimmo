import { FormikValues } from "formik";
import { resetPassword } from "../../api/auth";
import { ResetPassword, Verification } from "../../types/auth";
import { SignInValues } from "../../types/be/auth";
import { Navigation } from "../../types/navigation";

export const initResetPasswordValues: ResetPassword = {
  code: "",
  password: "",
  passwordConfirm: "",
};

export const initVerificationState: Verification = {
  mode: "email",
  error: null,
  isSubmitting: false,
  steps: 2,
  data: {} as SignInValues,
};

export const handleResetPasswordSubmit = ({
  code,
  navigation,
}: {
  code: string;
  navigation: Navigation;
}) => {
  return async (
    values: ResetPassword,
    { setStatus, setSubmitting, setValues }: FormikValues
  ): Promise<void> => {
    setSubmitting(true);
    const response = await resetPassword(code, values);
    const json = await response.json();
    if ([200, 201].includes(response.status)) {
      const {
        user: { email },
      } = json;
      setStatus({
        success: true,
        errors: {},
      });
      setSubmitting(false);
      setValues(initResetPasswordValues);
      navigation?.navigate("Sign In", { email });
    } else {
      const { message } = json;
      setStatus({
        success: false,
        errors: {
          passwordConfirm: message,
        },
      });
      setSubmitting(false);
      setValues(initResetPasswordValues);
    }
  };
};

export type ResetPasswordActive = Record<string, boolean>;

export const initActiveState: ResetPasswordActive = {
  password: false,
  passwordConfirm: false,
};
