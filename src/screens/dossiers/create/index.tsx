import React, { useState, ReactElement, useContext, useEffect } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import useValidation from "../../../hooks/useValidation";
import * as Yup from "yup";
import Form from "../form";
import { styles } from "../styles";
import { handleCreateDossierSubmit, initCreateDossier } from "./utils";
import { prepareDossierBeforeForm, width } from "../form/utils";
import { GeneralContext } from "../../../context/General";
import ScrollIntoViewScrollView from "../../../components/ScrollIntoViewScrollView";
import { useFetch } from "../../../hooks/useFetch";
import { DossierConfig, DossierConfigMapped } from "../types";
import { getDossierConfig } from "../../../api/dossier";
import { FormContext } from "../../../context/Form";
import { mapDossierConfig, mapEnumToArray } from "../utils";

const CreateDossier = ({ navigation }: any): ReactElement => {
  const { property, title } = useValidation();
  const [createDossierInit] = useState(initCreateDossier);
  const { data: config, run } = useFetch<DossierConfig>();
  const [dossierConfig, setDossierConfig] =
    useState<DossierConfigMapped | null>(null);
  const { setRefreshHome, setRefreshShow } = useContext(GeneralContext);

  useEffect(() => {
    run(getDossierConfig());
  }, []);

  useEffect(() => {
    if (!config) return;
    setDossierConfig(mapDossierConfig(config));
  }, [config]);

  return (
    <FormContext.Provider value={{ dossierConfig }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0.25, y: 1.1 }}
        locations={[0.2, 1]}
        colors={["transparent", "transparent"]}
        style={[styles.signup, { flex: 1 }]}
      >
        <KeyboardAvoidingView
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
          //behavior={Platform.OS === "ios" ? "padding" : "position"}
          enabled
          keyboardVerticalOffset={100}
        >
          <ScrollIntoViewScrollView
            keyboardShouldPersistTaps={"always"}
            style={{
              width,
            }}
          >
            <Formik
              initialValues={prepareDossierBeforeForm(createDossierInit)}
              onSubmit={handleCreateDossierSubmit({
                navigation,
                setRefreshHome,
                setRefreshShow,
              })}
              validationSchema={Yup.object().shape({
                property,
                title,
              })}
              enableReinitialize
            >
              {(props) => <Form {...props} config={config}></Form>}
            </Formik>
          </ScrollIntoViewScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </FormContext.Provider>
  );
};

export default CreateDossier;
