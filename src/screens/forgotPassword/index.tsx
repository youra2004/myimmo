import React, { ReactElement, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  Platform,
  View,
} from "react-native";
import { Block, Button, Input, Text, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import { materialTheme } from "../../constants";
import { HeaderHeight } from "../../constants/utils";
import { Formik } from "formik";
import useValidation from "../../hooks/useValidation";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../../types/navigation";
import {
  handleForgotPasswordSubmit,
  initActiveState,
  initForgotPasswordValues,
  SignInActive,
} from "./utils";
import DismissKeyboardHOC from "../../hoc/DismissKeyboard";
import { HelperText, TextInput } from "react-native-paper";
import { Colors } from "../../components/bottomHeader/styles";
import { ForgotPassword as ForgotPasswordValues } from "../../types/auth";

const { width } = Dimensions.get("window");

const ForgotPassword = (): ReactElement => {
  const navigation = useNavigation<Navigation>();
  const { email } = useValidation();
  const [active, setActive] = useState(initActiveState);
  const toggleActive = (name: keyof ForgotPasswordValues) => (): void => {
    const auxActive: SignInActive = JSON.parse(JSON.stringify(active));
    auxActive[name] = !auxActive[name];
    setActive(auxActive);
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.25, y: 1.1 }}
      locations={[0.2, 1]}
      colors={["#transparent", "#transparent"]}
      style={[styles.signin, { flex: 1 }]}
    >
      <DismissKeyboardHOC>
        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={styles.container}>
            <Formik
              initialValues={initForgotPasswordValues}
              onSubmit={handleForgotPasswordSubmit({ navigation })}
              validationSchema={Yup.object().shape({
                email,
              })}
              enableReinitialize
            >
              {({
                handleChange,
                values,
                touched,
                errors,
                status,
                isSubmitting,
                submitForm,
                resetForm,
              }) => (
                <View>
                  <View style={styles.card}>
                    <TextInput
                      autoFocus
                      style={[styles.inputPaper]}
                      textColor={materialTheme.COLORS.TEXT_FIELD}
                      autoCapitalize="none"
                      label={<Text style={styles.inputPaperLabel}>Email</Text>}
                      activeUnderlineColor={Colors.SECONDARY}
                      underlineStyle={!active.email ? styles.inputActive : null}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onFocus={toggleActive("email")}
                      onBlur={toggleActive("email")}
                    />
                    {touched.email &&
                      (status?.errors.email || errors.email) && (
                        <HelperText
                          type="error"
                          visible={
                            touched.email &&
                            (status?.errors.email || errors.email)
                          }
                        >
                          {touched.email &&
                            (status?.errors.email || errors.email)}
                        </HelperText>
                      )}
                    {/* <TextInput
                          autoFocus
                          style={[styles.inputPaper]}
                          textColor="white"
                          autoCapitalize="none"
                          label={
                            <Text style={styles.inputPaperLabel}>Email</Text>
                          }
                          underlineStyle={styles.inputPaperUnderlineStyle}
                          value={values.email}
                          onChangeText={handleChange("email")}
                        />
                        <HelperText
                          type="error"
                          visible={
                            touched.email &&
                            (status?.errors.email || errors.email)
                          }
                        >
                          {touched.email &&
                            (status?.errors.email || errors.email)}
                        </HelperText> */}
                  </View>
                  <Block center flex style={{ marginTop: 20 }}>
                    <Button
                      size="large"
                      shadowless
                      color={Colors.BLACK}
                      style={{ height: 48 }}
                      loading={isSubmitting}
                      onPress={() => {
                        submitForm();
                      }}
                    >
                      SEND LINK
                    </Button>

                    <Button
                      size="large"
                      color="transparent"
                      shadowless
                      onPress={() => {
                        resetForm();
                        navigation?.navigate("Sign Up");
                      }}
                    >
                      <Text
                        center
                        size={(theme.SIZES?.FONT || 0) * 0.75}
                        style={{ marginTop: 20 }}
                      >
                        {"Don't have an account? "}
                        <Text
                          style={{
                            color: Colors.SECONDARY,
                          }}
                        >
                          Sign Up
                        </Text>
                      </Text>
                    </Button>
                  </Block>
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboardHOC>
    </LinearGradient>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  signin: {
    //marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  social: {
    width: (theme.SIZES?.BASE || 0) * 3.5,
    height: (theme.SIZES?.BASE || 0) * 3.5,
    borderRadius: (theme.SIZES?.BASE || 0) * 1.75,
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  input: {
    width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: "white",
  },
  inputPaper: {
    backgroundColor: "transparent",
  },
  inputPaperLabel: {
    color: materialTheme.COLORS.PLACEHOLDER,
  },
  inputPaperUnderlineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    paddingHorizontal: width * 0.05,
    borderRadius: 5,
    paddingBottom: width * 0.05,
    marginBottom: width * 0.1,
  },
  container: {
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
    height: "100%",
  },
});
