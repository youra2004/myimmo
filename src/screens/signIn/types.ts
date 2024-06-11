import { SignInResponseData } from "../../types/auth";
import { Navigation } from "../../types/navigation";
import { SocialLogIn } from "../../types/social";

export interface HandleSocialSignInProps {
  values: SocialLogIn;
  signIn: ({ token, user }: SignInResponseData) => Promise<void>;
  navigation: Navigation;
  setStatus: any;
  setSubmitting: any;
}
