import Reeact, { ReactElement, useContext, useEffect } from "react";
import { isSessionExpired } from "../utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Navigation } from "../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { getRefreshToken, getUser } from "../utils/common";
import { freshToken, signIn } from "../api/auth";
import { AuthContext } from "../context/Auth";

interface AuthGuardType {
  children: React.ReactNode;
}
/* istanbul ignore next */
const AuthGuard = ({ children }: AuthGuardType): ReactElement => {
  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    handleSessionExpired();
  });

  const handleSessionExpired = async () => {
    if (await isSessionExpired()) {
      const response = await freshToken();
      const json = await response.json();
      if ([200, 201].includes(response.status)) {
        const {
          jwt: { token, expired },
          rt: { token: refreshToken },
        } = json;
        const user = await getUser();
        await signIn({ token, expired, refreshToken, user });
      }
    }
  };

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthGuard;
