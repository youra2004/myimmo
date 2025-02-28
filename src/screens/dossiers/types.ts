import { number } from "yup/lib/locale";
import { DossierTypeIds, DossierTypes } from "../../utils/constants";

export interface Dossier {
  _id?: string;
  id?: string;
  title?: string;
  description?: string;
  dealType?: DealType; //*
  property: DossierProperty;
  countryCode?: "DE";
  images: DossierImage[];
  cover?: DossierImage;
  userDefinedFields?: any;
  attachments: DossierAttachment[];
  updatedAt?: Date | string;
  valuationSale?: DossierValuation;
  valuationRentGross?: DossierValuation;
  valuationRentNet?: DossierValuation;
  employedRate: SocioEconomic;
  populationSize: SocioEconomic;
}

export interface DossierProperty {
  propertyType: {
    code: DossierTypes; //*
    subcode?: AppartmentSubtype | HouseSubtype;
  };
  location: DossierLocation;
  buildingYear: number | string; //* 1850 - current year
  renovationYear?: number | string; // 1950 - current year
  livingArea?: number | string; // 10 - 800
  landArea?: number | string; //* - only for multi and house 50 - 5000
  volume?: number | string;
  balconyArea?: number | string; // 1-200
  hasLift?: boolean | string;
  isNew?: boolean | string;
  hasSauna?: boolean | string;
  hasPool?: boolean | string;
  floorNumber?: number | string; // 1-30
  numberOfUnits?: number | string;
  annualRentIncome?: number | string; // 5’000 - 1’000’000
  numberOfFloorsInBuilding?: number | string; // 1-30
  numberOfRooms?: number | string; // 1-20, step 0.5: 1, 1.5, 2, 2.5
  numberOfBathrooms?: number | string; // 1-5
  numberOfIndoorParkingSpaces?: number | string;
  numberOfOutdoorParkingSpaces?: number | string; // 1-6
  condition?: {
    bathrooms?: string;
    kitchen?: string;
    flooring?: string;
    windows?: string;
    overall?: string;
    masonry?: string;
  };
  quality?: {
    bathrooms?: string;
    kitchen?: string;
    flooring?: string;
    windows?: string;
    overall?: string;
    masonry?: string;
  };
  gardenArea?: number | string; // 1-200
  energyLabel?: EnergyLabel;
  garage_spaces?: number | string; // 1-6
}

export interface DossierLocation {
  address: DossierAddress;
  coordinates: DossierCoordinates;
}

export interface DossierAddress {
  postCode: string;
  city: string;
  street: string;
  houseNumber: string;
}

export interface DossierCoordinates {
  latitude: number;
  longitude: number;
}

export type DossierFileTypes = "image" | "attachment";

export interface DossierFile {
  _id: string;
  originalName: string;
  type: DossierFileTypes;
  originalUrl: string;
}

export interface DossierImage extends DossierFile {
  type: "image";
  largeUrl: string;
  mediumUrl: string;
  smallUrl: string;
}

export interface DossierAttachment extends DossierFile {
  type: "attachment";
}

export interface DossierImageError {
  error: { isOperational: boolean; status: string; statusCode: number };
  message: string;
}

export interface DossierType {
  id: DossierTypeIds;
  name: DossierTypeName;
  icon?: string;
}

export interface DossierValuation {
  valueRange: DossierValuationRange;
  valuationConfidence: string;
  valuationDate: string;
  value: number;
}

export interface DossierValuationRange {
  lower: number;
  upper: number;
}

export type DossierTypeName = "Apartment" | "House" | "Multi-family house";

export type AppartmentSubtype =
  | "apartment_normal"
  | "apartment_penthouse"
  | "apartment_maisonette"
  | "apartment_attic"
  | "apartment_terraced"
  | "apartment_studio";

export type DealType = "sale" | "rent" | "";

export type HouseSubtype =
  | "house_detached"
  | "house_semi_detached"
  | "terraced_house_end"
  | "terraced_house_middle"
  | "farm";

export interface DossierSubtype {
  value: AppartmentSubtype | HouseSubtype;
  label: string;
}

export type EnergyLabel =
  | "a_plus_plus"
  | "a_plus"
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h";

export type QualityRate = "simple" | "normal" | "high_quality" | "luxury";

// export interface QualityRate {
//   id: number;
//   name: "Simple" | "Normal" | "High-quality" | "Luxury";
//   description: string;
// }

export type ConditionRate =
  | "renovation_needed"
  | "well_maintained"
  | "new_or_recently_renovated";

// export interface ConditionRate {
//   id: number;
//   name: "Needs renovation" | "Well Maintained" | "New/Recently renovated";
// }

export interface SocioEconomic {
  divisions: SocioEconomicSizeDivision[];
}

export interface SocioEconomicSizeDivision {
  officialId: string;
  years: SocioEconomicSizeDivisionYear[];
}

export interface SocioEconomicSizeDivisionYear {
  year: number;
  values: SocioEconomicSizeDivisionYearValue[];
}

export interface SocioEconomicSizeDivisionYearValue {
  absoluteValue: number;
  relativeValue: number;
}

export interface DossierSocket {
  dossierId: Dossier["_id"];
  employedRate: Dossier["employedRate"];
  populationSize: Dossier["populationSize"];
  valuationRentGross?: Dossier["valuationRentGross"];
  valuationRentNet?: Dossier["valuationRentNet"];
  valuationSale?: Dossier["valuationSale"];
}

export interface DossierConfigItem {
  [key: string]: string;
}

export interface DossierConfig {
  subType: {
    apartment: DossierConfigItem;
    house: DossierConfigItem;
  };
  dealType: {
    type: DossierConfigItem;
  };
  property: {
    energyLabel: DossierConfigItem;
    condition: DossierConfigItem;
    quality: DossierConfigItem;
  };
}

export interface DossierConfigMappedItem {
  value: string;
  label: string;
}

export interface DossierConfigMapped {
  subType: {
    apartment: DossierConfigMappedItem[];
    house: DossierConfigMappedItem[];
  };
  dealType: {
    type: DossierConfigMappedItem[];
  };
  property: {
    energyLabel: DossierConfigMappedItem[];
    condition: DossierConfigMappedItem[];
    quality: DossierConfigMappedItem[];
  };
}
