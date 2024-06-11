import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/user";
import Constants from "expo-constants";

export const mapBackendValidationErrors = (
  errors: Record<string, Array<string>>
): Record<string, string> => {
  const mappedErrors = {} as Record<string, string>;
  for (const [key, value] of Object.entries(errors))
    mappedErrors[key] = value[0];
  return mappedErrors;
};

export const getToken = async (): Promise<string | null | undefined> => {
  let token;
  try {
    token = await AsyncStorage.getItem("token");
  } catch (e) {
    console.log("Error when reading token from AsyncStorage");
  }

  return token;
};

export const getUser = async (): Promise<User | null> => {
  let user;
  try {
    const auxUser = await AsyncStorage.getItem("user");
    if (!auxUser) return null;
    user = JSON.parse(auxUser);
  } catch (e) {
    console.log("Error when reading token from AsyncStorage");
    return null;
  }
  return user;
};

export const getExpired = async (): Promise<number> => {
  try {
    const expired = await AsyncStorage.getItem("expired");
    if (!expired) return 0;
    return +expired;
  } catch (e) {
    console.log("Error when reading expired from AsyncStorage");
    return 0;
  }
};

export const getRefreshToken = async (): Promise<string | null | undefined> => {
  let token;
  try {
    token = await AsyncStorage.getItem("refreshToken");
  } catch (e) {
    console.log("Error when reading token from AsyncStorage");
  }
  return token;
};

export const setAuthStorageData = async ({
  token,
  user,
}: {
  token: string;
  user: User;
}): Promise<boolean> => {
  try {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    return true;
  } catch (e) {
    console.log("Error when saving token to AsyncStorage", e);
    return false;
  }
};

export const isRunningInExpoGo = (): boolean =>
  Constants.appOwnership === "expo";

export const dateNowSeconds = (): number => {
  return Math.floor(Date.now() / 1000);
};

export const separateThousands = (
  value: number | string,
  separator = "."
): string => {
  const number = Number(value);
  if (!number) return "";
  const string = Math.round(number).toString();
  const arr = [];
  for (let i = string.length; i >= 1; i = i - 3) {
    const sub = string.substring(i, i - 3);
    arr.push(sub);
  }

  return arr.reverse().join(separator);
};

export const setToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (e) {
    console.log("Error when saving token to AsyncStorage");
  }
};
