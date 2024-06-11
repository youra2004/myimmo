import { dateNowSeconds, getExpired } from "./common";

// export const setSession = (
//   accessToken: string | null,
//   tokenExpirationDate: number
// ): void => {
//   if (accessToken) {
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem(
//       "tokenExpirationDate",
//       JSON.stringify(tokenExpirationDate)
//     );
//   } else {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("tokenExpirationDate");
//   }
// };

export const isSessionExpired = async (): Promise<any> => {
  const tokenExpirationDate = await getExpired();
  //console.log("tokenExpirationDate", tokenExpirationDate);
  // console.log(
  //   "tokenExpirationDate < dateNowSeconds()",
  //   tokenExpirationDate < dateNowSeconds()
  // );
  return tokenExpirationDate < dateNowSeconds();
};
