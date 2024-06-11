import { Dispatch, SetStateAction } from "react";
import { resendEmail, resendPhone } from "../../api/auth";
import { Verification } from "../../types/auth";

export const handleResendCode =
  ({
    verification,
    setVerification,
  }: {
    verification: Verification;
    setVerification: Dispatch<SetStateAction<Verification>>;
  }) =>
  async (): Promise<void> => {
    const { mode } = verification;

    const response =
      mode === "email" ? await resendEmail() : await resendPhone();

    if ([200, 201].includes(response.status)) {
    } else {
      setVerification((prevState) => ({
        ...prevState,
        error: "Error while resending code",
      }));
    }
  };
