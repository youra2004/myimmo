import { ReactElement } from "react";
import { Navigation } from "../../types/navigation";
import { Rent } from "../../utils/constants";
import { DealType, Dossier, DossierValuation } from "../dossiers/types";

export interface ValuationProps {
  dealType?: DealType;
  valuationSale?: DossierValuation;
  valuationRentNet?: DossierValuation;
  livingArea?: number | string;
}

export interface ShowValuationPrice {
  valuation?: DossierValuation;
  livingArea?: number | string;
  style?: any;
}

export interface ShowValuationRent extends ShowValuationPrice {
  type?: Rent;
}

export interface SwipeableProps {
  // handleEdit: () => void;
  // handleDelete: () => void;
  // item: Dossier;
  // defaultImageSrc: number;
  // navigation: Navigation;
  children: ReactElement;
}

export interface CardProps extends Dossier {
  navigation: Navigation;
  defaultImageSrc: number;
  _reset?: () => void;
  handleEdit: () => void;
  handleDelete: () => Promise<void>;
}
