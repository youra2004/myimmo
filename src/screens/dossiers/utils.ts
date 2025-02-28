import { Dimensions, StyleSheet, Platform } from "react-native";
import { theme } from "galio-framework";
import { HeaderHeight } from "../../constants/utils";
import { materialTheme } from "../../constants";
import {
  AppartmentSubtype,
  ConditionRate,
  DealType,
  DossierConfig,
  DossierConfigItem,
  DossierConfigMapped,
  DossierConfigMappedItem,
  DossierSubtype,
  DossierType,
  EnergyLabel,
  HouseSubtype,
  QualityRate,
} from "./types";
import { DossierTypeIds, DossierTypes, Rent } from "../../utils/constants";

export const initCreateDossierValues = {
  dealType: "",
  property: {
    propertyType: {
      code: DossierTypes.APARTMENT,
      subcode: "",
    },
    location: {
      address: {
        postCode: "",
        street: "",
        houseNumber: "",
      },
      coordinates: { latitude: "", longitude: "" },
    },
    buildingYear: "",
    livingArea: "",
    landArea: "",
    volume: "",
    numberOfRooms: "",
    numberOfBathrooms: "",
    numberOfIndoorParkingSpaces: "",
    numberOfOutdoorParkingSpaces: "",
    hasPool: false,
    condition: {
      bathrooms: "",
      kitchen: "",
      flooring: "",
      windows: "",
    },
    quality: {
      bathrooms: "",
      kitchen: "",
      flooring: "",
      windows: "",
    },
    image: null,
  },
  energyLabel: "",
  //
  title: "",
  address: "",
  typeId: DossierTypeIds.APPARTMENT,
  appartmentSubtypeId: "",
  appartmentDealTypeId: "",
  appartmentBuildYear: "",
  appartmentRenovationYear: "",
  appartmentNetLivingAreaInM2: "",
  appartmentEnergyLabel: "",
  appartmentFloorNumber: "",
  appartmentNumberOfFloors: "",
  appartmentNumberOfRooms: "",
  appartmentNumberOfBathrooms: "",
  appartmentBalconyOrTerraceInM2: "",
  appartmentGardenInM2: "",
  appartmentGarageSpaces: "",
  appartmentOutdoorParkingSpaces: "",
  appartmentNewBuilding: false,
  appartmentLift: false,
  description: "",

  //house

  houseLandAreaInM2: "",
  //
  phone: "+493482932441",
  email: "zainіііi@gmail.com",
  password: "pass1234",
  passwordConfirm: "pass1234",
  firstName: "muhammadu",
  lastName: "zaini",
};

export const dossierTypes: {
  value: DossierTypes;
  label: string;
  icon: string;
}[] = [
  { value: DossierTypes.APARTMENT, label: "Apartment", icon: "apartment" },
  { value: DossierTypes.HOUSE, label: "House", icon: "house" },
  {
    value: DossierTypes.MULTI_FAMILY_HOUSE,
    label: "Multi-family house",
    icon: "corporate-fare",
  },
];

export const dossierTypeIdInit = DossierTypeIds.APPARTMENT;
export const defaultRating = 0;
export const RATING_REVIEW_SIZE = 11;
export const RATING_SIZE = 14;
export const MIN_HEIGHT_RICH_CONTAINER = 150;

export const appartmentSubtypes: DossierSubtype[] = [
  { value: "apartment_normal", label: "Apartment" },
  { value: "apartment_penthouse", label: "Penthouse" },
  { value: "apartment_maisonette", label: "Maisonette" },
  { value: "apartment_attic", label: "Attic apartment" },
  { value: "apartment_terraced", label: "Terraced apartment" },
  { value: "apartment_studio", label: "Studio" },
];

export const houseSubtypes: DossierSubtype[] = [
  { value: "house_detached", label: "Detached house" },
  { value: "house_semi_detached", label: "Semi-detached house" },
  { value: "terraced_house_end", label: "Terraced house - end" },
  { value: "terraced_house_middle", label: "Terraced house - middle" },
  { value: "farm", label: "Farm" },
];

export const dealTypes: { value: DealType; label: string }[] = [
  {
    value: "sale",
    label: "Sale",
  },
  {
    value: "rent",
    label: "Rent",
  },
  {
    value: "",
    label: "Sale & Rent",
  },
];

export const energyLabels: { value: EnergyLabel; label: string }[] = [
  {
    value: "a_plus_plus",
    label: "A++",
  },
  {
    value: "a_plus",
    label: "A+",
  },
  {
    value: "a",
    label: "A",
  },
  {
    value: "b",
    label: "B",
  },
  {
    value: "c",
    label: "C",
  },
  {
    value: "d",
    label: "D",
  },
  {
    value: "e",
    label: "E",
  },
  {
    value: "f",
    label: "F",
  },
  {
    value: "g",
    label: "G",
  },
  {
    value: "h",
    label: "H",
  },
];

export const qualityRates: {
  value: QualityRate;
  label: string;
  description: string;
}[] = [
  {
    value: "simple",
    label: "Simple",
    description: "lower price segment, small, basic appliances",
  },
  {
    value: "normal",
    label: "Normal",
    description: "medium price segment, standard appliances",
  },
  {
    value: "high_quality",
    label: "High-quality",
    description: "branded appliances, high standard, spacious",
  },
  {
    value: "luxury",
    label: "Luxury",
    description: "exclusive appliances, luxury materials, very spacious",
  },
];

export const conditionRates: { value: ConditionRate; label: string }[] = [
  {
    value: "renovation_needed",
    label: "Needs renovation",
  },
  {
    value: "well_maintained",
    label: "Well maintained",
  },
  {
    value: "new_or_recently_renovated",
    label: "New / renovated",
  },
];

export const rentButtons = [
  { value: Rent.NET, label: "Net rent" },
  { value: Rent.GROSS, label: "Gross rent" },
];

export const mapDossierConfig = (
  config: DossierConfig
): DossierConfigMapped => ({
  subType: {
    apartment: mapEnumToArray(config.subType.apartment),
    house: mapEnumToArray(config.subType.house),
  },
  dealType: {
    type: [
      ...mapEnumToArray(config.dealType.type),
      {
        value: "",
        label: "Sale & Rent",
      },
    ],
  },
  property: {
    energyLabel: mapEnumToArray(config.property.energyLabel),
    condition: mapEnumToArray(config.property.condition),
    quality: mapEnumToArray(config.property.quality),
  },
});

export const mapEnumToArray = (
  itemEnum: DossierConfigItem
): DossierConfigMappedItem[] =>
  Object.keys(itemEnum).map((key) => ({ value: itemEnum[key], label: key }));
