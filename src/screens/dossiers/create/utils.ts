import { FormikValues } from "formik";
import { createDossier } from "../../../api/dossier";
import { DossierTypes } from "../../../utils/constants";
import { initSignInValues } from "../../signIn/utils";
import { prepareDossierBeforeForm } from "../form/utils";
import { Dossier } from "../types";

export const handleCreateDossierSubmit = ({
  navigation,
  setRefreshHome,
  setRefreshShow,
}: any) => {
  return async (
    dossier: Dossier,
    { setStatus, setSubmitting, setValues, setTouched, resetForm }: FormikValues
  ): Promise<void> => {
    setSubmitting(true);

    const clone = JSON.parse(JSON.stringify(dossier));
    const result = prepareBeforeFormJsonDara(clone);
    //console.log()
    //console.log("finally before submission", result);

    //console.log("condition", result.property.condition);
    console.log("result", result);
    const response = await createDossier(result);
    const json = await response.json();
    console.log("json", json);
    if ([200, 201].includes(response.status)) {
      //console.log("json.dossier.property111", json.dossier.property);
      setSubmitting(false);
      setRefreshHome(true);
      setRefreshShow(true);
      navigation.navigate("Home");
    } else if (response.status === 401) {
      navigation.navigate("Logout");
    } else {
      console.log("error", json);
      setSubmitting(false);
    }
  };
};

export const prepareBeforeFormJsonDara = (dossier: Dossier) => {
  const clone: any = { ...dossier };
  removeEmptyString(clone);
  if (clone.property.propertyType.code === DossierTypes.APARTMENT)
    delete clone.property?.landArea;
  if (clone.property.propertyType.code === DossierTypes.HOUSE) {
    delete clone.property?.floorNumber;
    delete clone.property?.gardenArea;
  }
  if (clone.property.propertyType.code === DossierTypes.MULTI_FAMILY_HOUSE) {
    delete clone.dealType;
  }

  return clone;
};

function removeEmptyString(object: any) {
  Object.entries(object).forEach(([key, value]) => {
    if (value && typeof value === "object") removeEmptyString(value);
    if (value === null || value === undefined || value === "") {
      if (Array.isArray(object)) object.splice(key as any, 1);
      else delete object[key];
    }
  });
  return object;
}

export const initCreateDossier: Dossier = {
  title: "",
  dealType: "",
  description: "",
  property: {
    buildingYear: "",
    location: {
      address: {
        city: "",
        houseNumber: "",
        postCode: "",
        street: "",
      },
      coordinates: { latitude: 0, longitude: 0 },
    },
    propertyType: {
      code: DossierTypes.APARTMENT,
    },
    hasLift: false,
    isNew: false,
    hasSauna: false,
    hasPool: false,
  },
  images: [],
  userDefinedFields: [],
  attachments: [],
  countryCode: "DE",
  employedRate: { divisions: [] },
  populationSize: { divisions: [] },
};
