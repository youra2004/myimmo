import { Dossier, SocioEconomic } from "../types";

export type ShowPageTabs = "overview" | "socio-economics";

export interface SocioEconomicsProps {
  socioEconomic: SocioEconomic;
  employedPopulation: SocioEconomic;
}

export interface OverviewProps {
  dossier: Dossier;
}
