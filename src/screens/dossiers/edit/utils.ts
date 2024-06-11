import { FormikValues } from "formik";
import { Dossier } from "../types";
import { editDossier, getDossierById } from "../../../api/dossier";
import { prepareBeforeFormJsonDara } from "../create/utils";

export const fetchDossier = async ({ setDossier, setIsLoading, id }: any) => {
  setIsLoading(true);
  const response = await getDossierById(id);
  const json = await response.json();
  //console.log("json", json);
  if ([200, 201].includes(response.status)) {
    setDossier(json);
    setIsLoading(false);
  } else if (response.status === 401) {
    //console.log("gog3");
  }
  setIsLoading(false);
};

export const handleEditDossierSubmit = ({
  navigation,
  setRefreshHome,
  setRefreshShow,
}: any) => {
  return async (
    dossier: Dossier,
    { setStatus, setSubmitting, setValues, setTouched }: FormikValues
  ): Promise<void> => {
    if (!dossier._id) return;
    setSubmitting(true);
    const clone = JSON.parse(JSON.stringify(dossier));
    const result = prepareBeforeFormJsonDara(clone);
    console.log("result55555555", result);
    const response = await editDossier(result);
    const json = await response.json();
    console.log("json edit dossier", json);
    if ([200, 201].includes(response.status)) {
      setSubmitting(false);
      setRefreshHome(true);
      setRefreshShow(true);
      navigation.navigate("ShowDossier", { id: dossier._id });
      //navigation.navigate("Home", { refresh: true });
      //setValues(initCreateDossier);
    } else if (response.status === 401) {
      navigation.navigate("Logout");
    } else {
      const { message } = json;
      setSubmitting(false);
    }
  };
};
