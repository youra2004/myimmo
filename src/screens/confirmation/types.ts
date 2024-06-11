import { Dispatch, SetStateAction } from "react";
import {
  SignInResponseData,
  Verification,
  VerificationMode,
  VerificationStep,
} from "../../types/auth";
import { SignInValues as BESignInValues } from "../../types/be/auth";
import { Navigation } from "../../types/navigation";

export interface HandleVerificationProps {
  verification: Verification;
  setVerification: Dispatch<SetStateAction<Verification>>;
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  navigation: Navigation;
  dispatch: any;
  signIn: ({ token, expired, user }: SignInResponseData) => Promise<void>;
}

export interface HandlePhoneConfirmProps
  extends Pick<
    HandleVerificationProps,
    "verification" | "setVerification" | "code" | "setCode" | "signIn"
  > {}

export interface HandleEmailConfirmProps extends HandleVerificationProps {}

export type ParamList = {
  Confirmation: {
    data: BESignInValues;
    mode: VerificationMode;
    steps?: VerificationStep;
  };
};

export type HandleSignInAfterConfirmationProps = Pick<
  HandleVerificationProps,
  "signIn" | "verification" | "navigation" | "setVerification"
>;
