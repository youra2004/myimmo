import React, { useState, ReactElement, useEffect, useContext } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import useValidation from "../../../hooks/useValidation";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Form from "../form";
import { styles } from "../styles";
import { Dossier, DossierConfig, DossierConfigMapped } from "../types";
import { fetchDossier, handleEditDossierSubmit } from "./utils";
import { prepareDossierBeforeForm, width } from "../form/utils";
import { LogBox } from "react-native";
import { GeneralContext } from "../../../context/General";
import { Colors } from "../../../components/bottomHeader/styles";
import ScrollIntoViewScrollView from "../../../components/ScrollIntoViewScrollView";
import { FormContext } from "../../../context/Form";
import { useFetch } from "../../../hooks/useFetch";
import { getDossierConfig } from "../../../api/dossier";
import { mapDossierConfig } from "../utils";

LogBox.ignoreAllLogs();
const EditDossier = (): ReactElement => {
  const { property, title } = useValidation();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const id = route?.params?.id;
  const [dossier, setDossier] = useState<Dossier>();
  const [isLoading, setIsLoading] = useState(false);
  const { setRefreshHome, setRefreshShow } = useContext(GeneralContext);
  const { data: config, run } = useFetch<DossierConfig>();
  const [dossierConfig, setDossierConfig] =
    useState<DossierConfigMapped | null>(null);

  useEffect(() => {
    fetchDossier({ setDossier, setIsLoading, id });
  }, []);

  useEffect(() => {
    run(getDossierConfig());
  }, []);

  useEffect(() => {
    if (!config) return;
    setDossierConfig(mapDossierConfig(config));
  }, [config]);

  //console.log("dossier in edit", dossier);
  // if (isLoading) {
  //   return (
  //     <View style={styles.activityIndicator}>
  //       <ActivityIndicator size="large" color={Colors.BLACK} />
  //     </View>
  //   );
  // }
  console.log("Edit dossier rendered!!!!");

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
            {dossier && (
              <Formik
                initialValues={prepareDossierBeforeForm(dossier)}
                enableReinitialize
                onSubmit={handleEditDossierSubmit({
                  navigation,
                  setRefreshHome,
                  setRefreshShow,
                })}
                validationSchema={Yup.object().shape({
                  property,
                  title,
                })}
              >
                {(props) => (
                  <Form
                    {...props}
                    mode="edit"
                    setRefreshHome={setRefreshHome}
                  ></Form>
                )}
              </Formik>
            )}
          </ScrollIntoViewScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </FormContext.Provider>
  );
};

export default EditDossier;
