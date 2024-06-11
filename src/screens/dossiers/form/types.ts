import { FormikValues } from "formik";
import { Dispatch, SetStateAction } from "react";
import { RichEditor } from "react-native-pell-rich-editor";
import { DossierTypes } from "../../../utils/constants";
import {
  Dossier,
  DossierAttachment,
  DossierImage,
  DossierLocation,
  DossierProperty,
} from "../types";

export interface PickImageProps {
  setImageIsLoading: Dispatch<SetStateAction<boolean>>;
  setImageErrors: Dispatch<SetStateAction<string[]>>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  images: DossierImage[];
}

export interface AddressFormProps extends FormikValues {
  mode: "create" | "edit";
  location: DossierLocation;
}

export interface DescriptionFormProps extends FormikValues {
  description: string;
  RichText: React.MutableRefObject<RichEditor | null>;
}

export interface AttachmentsFormProps extends FormikValues {
  attachments: DossierAttachment[];
}

export interface RatingProps {
  property: DossierProperty;
  handleQualityRate?: (field: string) => (rating: number) => void;
  handleConditionRate?: (field: string) => (rating: number) => void;
  type: DossierTypes;
  disabled?: boolean;
}

export interface ImagesFormProps extends FormikValues {
  images: DossierImage[];
  cover?: DossierImage;
}

export type DossierDropdownMode =
  | null
  | "dealType"
  | "property.propertyType.subcode"
  | "property.energyLabel";
export interface DossierDropdown {
  visible: boolean;
  mode: DossierDropdownMode;
}
