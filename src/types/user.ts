import { DossierAttachment, DossierImage } from "../screens/dossiers/types";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  profileImg: DossierImage | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}
