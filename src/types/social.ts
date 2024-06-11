export type SocialLoginProvider = "google" | "facebook";

export type SocialLogIn = {
  email: string;
  phone: string;
  provider: SocialLoginProvider;
  name: string;
};
