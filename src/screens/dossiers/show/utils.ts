import { ShowPageTabs } from "./types";

export const showPageTabs: {
  value: ShowPageTabs;
  label: string;
  icon: string;
  tab: string;
}[] = [
  {
    value: "overview",
    label: "Overview",
    icon: "info-with-circle",
    tab: "Overview",
  },
  {
    value: "socio-economics",
    label: "Socio-Economics",
    icon: "users",
    tab: "SocioEconomics",
  },
];

export const SWOW_RATING_REVIEW_SIZE = 10;

export const SHOW_RATING_SIZE = 12;
