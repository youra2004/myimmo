import { getDossiers } from "../../api/dossier";
import { separateThousands } from "../../utils/common";
import { Measurement_Units } from "../../utils/constants";
import { Dossier, DossierLocation } from "../dossiers/types";

// export const fetchDossiers = async ({
//   params,
//   setDossiers,
//   setIsLoading,
//   scrolled,
// }: any) => {
//   !scrolled && setIsLoading(true);
//   console.log("fetchDossiers", fetchDossiers);
//   const response = await getDossiers(params);
//   const json = await response.json();
//   console.log("json fetchDossiers", json);
//   if ([200, 201].includes(response.status)) {
//     const { dossiers } = json;
//     setDossiers((prevState: Dossier[]) => {
//       const auxDossiers = !scrolled ? dossiers : [...prevState, ...dossiers];
//       console.log("auxDossiers", auxDossiers.length);
//       return auxDossiers;
//     });
//   }
//   !scrolled && setIsLoading(false);
// };

export const extractFullAddress = ({
  address: { street, houseNumber, city, postCode },
}: DossierLocation): string =>
  street || postCode ? `${street} ${houseNumber}, ${city}, ${postCode}` : "";

export const showPrice = (value: number, unit?: string | null): string =>
  `${separateThousands(value)}${
    unit === undefined ? Measurement_Units.EURO : unit || ""
  }`;

export const showPricePerM2 = (value: number, area: number | string): string =>
  `${(value / 1000 / Number(area)).toFixed(3)}`;

export const showNetRentPerM2 = (
  netRent: number,
  area: number | string
): string => Math.round(netRent / Number(area)).toFixed(0);

export const showPriceRange = (lower: number, upper: number): string =>
  `${showPrice(lower, null)} - ${showPrice(upper, null)}${
    Measurement_Units.EURO
  }`;

export const showRentRange = (lower: number, upper: number): string =>
  `${showPrice(lower, null)} - ${showPrice(upper, null)}${
    Measurement_Units.EURO
  }`;

export const showPricePerM2Range = (
  lower: number,
  upper: number,
  area: number | string
): string =>
  `${showPricePerM2(lower, area)} - ${showPricePerM2(upper, area)}€ / m`;

export const showNetRentPerM2Range = (
  lower: number,
  upper: number,
  area: number | string
): string =>
  `${showNetRentPerM2(lower, area)} - ${showNetRentPerM2(upper, area)}€ / m`;

export const STARTING_PAGE = 1;
