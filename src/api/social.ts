import { GOOGLE_API_KEY } from "../utils/config";

export const getGoogleUserByToken = async (accessToken: string) => {
  const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`;
  return await fetch(url);
};

export const getGoogleUserPhoneMumber = async (
  UID: string,
  accessToken: string
) => {
  const url = `https://people.googleapis.com/v1/people/${UID}?personFields=phoneNumbers&key=${GOOGLE_API_KEY}`;
  return await fetch(url, {
    method: "GET",
    headers: {
      authorization: "Bearer " + accessToken,
    },
  });
};

export const getFacebookUserByToken = async (accessToken: string) => {
  const url = `https://graph.facebook.com/v15.0/me?fields=id,name,email,birthday&access_token=${accessToken}`;
  return await fetch(url);
};
