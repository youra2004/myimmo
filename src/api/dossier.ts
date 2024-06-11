import { Dossier } from "../screens/dossiers/types";
import { DossierTypes } from "../utils/constants";
import { http } from "../utils/http";
import kebabCase from "lodash/kebabCase";

export const createDossier = async (data: Dossier) => {
  return await http.post(
    `dossier/${kebabCase(data.property.propertyType.code)}`,
    data
  );
};

export const editDossier = async (data: Dossier) => {
  return await http.put(
    `dossier/${kebabCase(data.property.propertyType.code)}/${data._id}`,
    data
  );
};

export const getDossiers = async (params?: string) => {
  return await http.get(`dossier${params ?? ""}`);
};

export const getDossierById = async (id: string) => {
  return await http.get(`dossier/${id}`);
};

export const deleteDossier = async (id: string) => {
  return await http.delete(`dossier/${id}`);
};

export const getSocioEconomicData = async (id: string, data: any) => {
  return await http.post(`/dossiers/socio-economics/${id}`, data);
};

export const getAttachments = async (data: {
  dossierId: string;
  countryCode: string;
}) => {
  return await http.post("/dossiers/attachments/for-dossier", data);
};

export const getDossierConfig = async () => {
  return await http.get("data/dossier");
};
