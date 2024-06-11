import { DossierImage } from "../../screens/dossiers/types";

export type LoadingDict = Record<string, boolean>;

export interface CarouselCardItem {
  url: string;
}

export interface CarouselCustomProps {
  images: CarouselCardItem[];
  callback: (index: number) => void;
}
