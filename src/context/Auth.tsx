import React, { useEffect, useState, useReducer, useCallback } from "react";
import { Images } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signUp as signUpRequest } from "../api/auth";
import { getToken, getUser } from "../utils/common";
import { ActionMap, SignInResponseData, SignUpValues } from "../types/auth";
import { User } from "../types/user";
import { SignInValues as BESignInValues } from "../types/be/auth";

interface AuthState {
  isSignout: boolean;
  userToken: null | string;
}

const authInitState: AuthState = {
  isSignout: false,
  userToken: null,
};

export type AuthContextType = {
  signIn: (data: any, onSuccess: any, onError: any) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (data: any, onSuccess: any, onError: any) => Promise<void>;
};

export const AuthContext = React.createContext<any>(null);

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const RESTORE_TOKEN = "RESTORE_TOKEN";
export const UPDATE_USER = "UPDATE_USER";

export type AuthActionTypes = {
  [SIGN_IN]: {
    token: string | null;
    user: User | null;
  };
  [SIGN_OUT]: undefined;
  [RESTORE_TOKEN]: {
    token: string | null;
  };
  [UPDATE_USER]: {
    user: User | null;
  };
};

const AuthReducer = (
  prevState: AuthState,
  action: ActionMap<AuthActionTypes>[keyof ActionMap<AuthActionTypes>]
) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.payload.token,
      };
    case "UPDATE_USER":
      return {
        ...prevState,
        user: action.payload.user,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.payload.token,
        user: action.payload.user,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
};

type Props = {
  children: React.ReactElement;
};

const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(AuthReducer, authInitState);
  const [_, setProfile] = useState<any>();

  useEffect(() => {
    const bootstrapAsync = async () => {
      const token = await getToken();
      const user = await getUser();
      console.log("bootstrapAsync", bootstrapAsync);
      token &&
        dispatch({
          type: "RESTORE_TOKEN",
          payload: {
            token,
          },
        });

      user &&
        dispatch({
          type: "UPDATE_USER",
          payload: {
            user,
          },
        });
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    console.log("Token changed", state.userToken);
  }, [state.userToken]);

  const authContext = React.useMemo(
    () => ({
      state,
      dispatch,
      signIn: async ({
        token,
        expired,
        refreshToken,
        user,
      }: SignInResponseData) => {
        try {
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("refreshToken", refreshToken);
          await AsyncStorage.setItem("expired", expired.toString());
          await AsyncStorage.setItem("user", JSON.stringify(user));
        } catch (e) {
          console.log("Error when saving token to AsyncStorage");
        }

        dispatch({
          type: "SIGN_IN",
          payload: {
            token,
            user,
          },
        });
      },
      signOut: async () => {
        try {
          dispatch({ type: "SIGN_OUT" });
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("refreshToken");
          await AsyncStorage.removeItem("expired");
          await AsyncStorage.removeItem("user");
          await AsyncStorage.removeItem("dossiers");
        } catch (e) {
          console.log("Error: ", e);
        }
      },
      signUp: async (
        data: SignUpValues,
        onSuccess: (data: BESignInValues) => void,
        onError: any
      ) => {
        const response = await signUpRequest(data);
        const json = await response.json();
        console.log("signUp json", json);
        if ([200, 201].includes(response.status)) {
          onSuccess && onSuccess(json as BESignInValues);
        } else {
          const { message }: { message: string[] } = json;
          onError && onError(message.join(", "));
        }
      },
    }),
    [state, dispatch]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
