import { createContext } from "react";
import { DossierConfigMapped } from "../screens/dossiers/types";

export const FormContext = createContext<{
  dossierConfig: DossierConfigMapped | null;
}>({ dossierConfig: null });
