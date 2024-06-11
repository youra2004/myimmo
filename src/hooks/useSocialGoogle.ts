import { useContext, useEffect, useRef } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import {
  REACT_APP_FACEBOOK_CLIENT_ID,
  REACT_APP_GOOGLE_CLIENT_ID,
} from "../utils/config";
import { social } from "../api/auth";
import { SignInValues as BESignInValues } from "../types/be/auth";
import { ParamList } from "../screens/confirmation/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../types/navigation";
import { AuthContext } from "../context/Auth";
import { FacebookAuthRequestConfig } from "expo-auth-session/providers/facebook";

const scopes = ["https://www.googleapis.com/auth/user.phonenumbers.read"];

const useSocial = (onError?: (mesage: string) => void) => {
  const navigation = useNavigation<Navigation>();
  const { signIn } = useContext(AuthContext);
  const [googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      iosClientId: REACT_APP_GOOGLE_CLIENT_ID,
      androidClientId: REACT_APP_GOOGLE_CLIENT_ID,
      expoClientId: REACT_APP_GOOGLE_CLIENT_ID,
      scopes,
    });

  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: REACT_APP_FACEBOOK_CLIENT_ID,
  } as Partial<FacebookAuthRequestConfig>);

  useEffect(() => {
    if (!googleResponse) return;
    const handleGoogleResponse = async () => {
      if (googleResponse?.type !== "success") return;

      const { authentication } = googleResponse;
      const token = authentication?.idToken;

      if (!token) return;
      const response = await social({ token, type: "google" });
      handleSocialResponse({
        response,
        signIn,
        navigation,
        onError,
      });
    };
    handleGoogleResponse();
  }, [googleResponse]);

  useEffect(() => {
    const handleFacebookResponse = async () => {
      if (fbResponse?.type === "success") {
        const { authentication } = fbResponse;
        const accessToken = authentication?.accessToken;

        if (!accessToken) return;
        const response = await social({ token: accessToken, type: "facebook" });
        handleSocialResponse({ response, signIn, navigation, onError });
      }
    };
    handleFacebookResponse();
  }, [fbResponse]);

  const handleSocialResponse = async ({
    response,
    signIn,
    navigation,
    onError,
  }: {
    response: Response;
    signIn: any;
    navigation: Navigation;
    onError?: (message: string) => void;
  }) => {
    const json = await response.json();
    //console.log("json22", json);
    if ([200, 201].includes(response.status)) {
      const {
        jwt: { token: newToken, expired },
        rt: { token: refreshToken },
        user,
      } = json as BESignInValues;
      const { isEmailVerified, isPhoneVerified } = user;
      console.log("isEmailVerified", isEmailVerified);
      console.log("isPhoneVerified", isPhoneVerified);

      const navProps: ParamList["Confirmation"] = {
        mode: null,
        data: json,
      };

      if (!isPhoneVerified && !isEmailVerified) {
        console.log("!isPhoneVerified && !isEmailVerified");
        navProps.mode = "phone";
        navProps.steps = 2;
      } else if (!isPhoneVerified) {
        console.log("!isPhoneVerified");
        navProps.mode = "phone";
        navProps.steps = 1;
      } else if (!isEmailVerified) {
        console.log("!isEmailVerified");
        navProps.mode = "email";
        navProps.steps = 1;
      } else {
        return await signIn({ token: newToken, expired, refreshToken, user });
      }

      try {
        await AsyncStorage.setItem("token", newToken);
      } catch (e) {
        console.log("Error when saving token to AsyncStorage");
      }

      navigation?.navigate("Confirmation", navProps);
    } else {
      const { message } = json;
      onError && onError(message);
      //setSocialError(message);
    }
  };
  return {
    googleRequest,
    googleResponse,
    googlePromptAsync,
    fbRequest,
    fbResponse,
    fbPromptAsync,
  };
};

export default useSocial;
