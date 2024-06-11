import { confirmMail, confirmPhone } from "../../api/auth";
import { Verification } from "../../types/auth";
import {
  HandleEmailConfirmProps,
  HandleSignInAfterConfirmationProps,
  HandleVerificationProps,
} from "./types";
import { SignInValues as BESignInValues } from "../../types/be/auth";

export const initCodeValue = "";

export const initVerficationState: Verification = {
  mode: null,
  error: null,
  isSubmitting: false,
  steps: 2,
  data: {} as BESignInValues,
};

export const handleVerification =
  (props: HandleVerificationProps) => async (): Promise<void> => {
    const {
      code,
      setVerification,
      verification: { mode },
    } = props;
    if (!code) return;
    setVerification((prevState) => ({ ...prevState, isSubmitting: true }));

    if (mode === "phone") {
      await handlePhoneConfirm({ ...props });
    } else if (mode === "email") {
      await handleEmailConfirm({ ...props });
    }
    setVerification((prevState) => ({ ...prevState, isSubmitting: false }));
  };

export const handlePhoneConfirm = async ({
  verification,
  code,
  setVerification,
  setCode,
  signIn,
  navigation,
}: HandleVerificationProps): Promise<void> => {
  const { steps } = verification;
  const response = await confirmPhone({
    code,
  });
  const json = await response.json();
  console.log("json confirmPhone", json);
  if ([200, 201].includes(response.status)) {
    if (steps === 2) {
      setVerification((prevState) => ({
        ...prevState,
        mode: "email",
        isSubmitting: false,
      }));
      setCode(initCodeValue);
    } else {
      await handleSignInAfterConfirmation({
        signIn,
        verification,
        navigation,
        setVerification,
      });
    }
  } else {
    const { message } = json;
    setVerification((prevState) => ({
      ...prevState,
      error: message,
    }));
  }
};

export const handleEmailConfirm = async ({
  verification,
  code,
  setVerification,
  signIn,
  navigation,
}: HandleEmailConfirmProps): Promise<void> => {
  const response = await confirmMail({
    code,
  });

  const json = await response.json();
  console.log("json confirmMail", json);

  if ([200, 201].includes(response.status)) {
    await handleSignInAfterConfirmation({
      signIn,
      verification,
      navigation,
      setVerification,
    });
  } else {
    const { message } = json;
    setVerification((prevState) => ({
      ...prevState,
      error: message,
    }));
  }
};

const handleSignInAfterConfirmation = async ({
  signIn,
  verification,
  navigation,
  setVerification,
}: HandleSignInAfterConfirmationProps) => {
  const {
    data: {
      jwt: { token, expired },
      rt: { token: refreshToken },
      user,
    },
    mode,
  } = verification;

  const isVerified = {
    phone: { isPhoneVerified: true },
    email: { isEmailVerified: true },
  };

  console.log("user in handleSignInAfterConfirmation", {
    ...user,
    ...isVerified[mode!],
  });
  await signIn({
    token,
    expired,
    refreshToken,
    user: { ...user, ...isVerified[mode!] },
  });
  setVerification((prevState) => ({
    ...prevState,
    isSubmitting: false,
    mode: null,
  }));
  navigation?.navigate("Home");
};
