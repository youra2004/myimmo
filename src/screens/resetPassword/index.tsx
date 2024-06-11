import React, { ReactElement, useContext, useState } from "react";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Navigation } from "../../types/navigation";
import ConfirmationCodeField from "../../components/confirmationCodeField/ConfirmationCodeField";
import {
  handleResetPasswordSubmit,
  initActiveState,
  initResetPasswordValues,
  initVerificationState,
  ResetPasswordActive,
} from "./utils";
import DismissKeyboardHOC from "../../hoc/DismissKeyboard";
import { HelperText, TextInput } from "react-native-paper";
import { Colors } from "../../components/bottomHeader/styles";
import { ResetPassword as ResetPasswordValues } from "../../types/auth";
import useForceUpdate from "../../hooks/useForceUpdate";

const { width } = Dimensions.get("window");

const ResetPassword = (): ReactElement => {
  const navigation = useNavigation<Navigation>();
  const [secureTextEntry, setSecureTextEntry] = useState({
    password: true,
    passwordConfirm: true,
  });

  const [active, setActive] = useState(initActiveState);

  const toggleActive = (name: string) => (): void => {
    const auxActive: ResetPasswordActive = JSON.parse(JSON.stringify(active));
    auxActive[name] = !auxActive[name];
    setActive(auxActive);
  };

  const [verification, setVerification] = useState(initVerificationState);
  const [code, setCode] = useState("");
  const { password, passwordConfirm } = useValidation();

  useFocusEffect(
    React.useCallback(() => {
      useForceUpdate();
    }, [])
  );

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.25, y: 1.1 }}
      locations={[0.2, 1]}
      colors={["#transparent", "#transparent"]}
      style={[styles.signin]}
    >
      <DismissKeyboardHOC>
        <KeyboardAvoidingView enabled>
          <View style={[styles.container, { paddingHorizontal: 0 }]}>
            <Formik
              initialValues={initResetPasswordValues}
              onSubmit={handleResetPasswordSubmit({ code, navigation })}
              validationSchema={Yup.object().shape({
                password,
                passwordConfirm,
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
              }) => (
                <View>
                  <View style={{ paddingHorizontal: width * 0.05 }}>
                    <View style={styles.card}>
                      <TextInput
                        autoFocus
                        secureTextEntry={secureTextEntry.password}
                        style={[styles.inputPaper]}
                        textColor="white"
                        autoCapitalize="none"
                        label={
                          <Text style={styles.inputPaperLabel}>Password</Text>
                        }
                        activeUnderlineColor={Colors.SECONDARY}
                        underlineStyle={
                          !active.password ? styles.inputActive : null
                        }
                        value={values.password}
                        onChangeText={handleChange("password")}
                        onFocus={toggleActive("password")}
                        onBlur={toggleActive("password")}
                        right={
                          <TextInput.Icon
                            icon="eye"
                            color={() => "white"}
                            onPress={() => {
                              setSecureTextEntry((prevState) => ({
                                ...prevState,
                                password: !prevState.password,
                              }));
                            }}
                          />
                        }
                      />
                      {touched.password &&
                        (status?.errors.password || errors.password) && (
                          <HelperText
                            type="error"
                            visible={
                              touched.password &&
                              (status?.errors.password || errors.password)
                            }
                          >
                            {touched.password &&
                              (status?.errors.password || errors.password)}
                          </HelperText>
                        )}
                      <TextInput
                        secureTextEntry={secureTextEntry.passwordConfirm}
                        style={[styles.inputPaper]}
                        textColor="white"
                        autoCapitalize="none"
                        label={
                          <Text style={styles.inputPaperLabel}>
                            Repeat Password
                          </Text>
                        }
                        activeUnderlineColor={Colors.SECONDARY}
                        underlineStyle={
                          !active.passwordConfirm ? styles.inputActive : null
                        }
                        value={values.passwordConfirm}
                        onChangeText={handleChange("passwordConfirm")}
                        onFocus={toggleActive("passwordConfirm")}
                        onBlur={toggleActive("passwordConfirm")}
                        right={
                          <TextInput.Icon
                            icon="eye"
                            color={() => "white"}
                            onPress={() => {
                              setSecureTextEntry((prevState) => ({
                                ...prevState,
                                passwordConfirm: !prevState.passwordConfirm,
                              }));
                            }}
                          />
                        }
                      />
                      {touched.passwordConfirm &&
                        (status?.errors.passwordConfirm ||
                          errors.passwordConfirm) && (
                          <HelperText
                            type="error"
                            visible={
                              touched.passwordConfirm &&
                              (status?.errors.passwordConfirm ||
                                errors.passwordConfirm)
                            }
                          >
                            {touched.passwordConfirm &&
                              (status?.errors.passwordConfirm ||
                                errors.passwordConfirm)}
                          </HelperText>
                        )}
                    </View>
                  </View>
                  <View style={[]}>
                    <ConfirmationCodeField
                      verification={verification}
                      value={code}
                      setValue={setCode}
                      confirmButtonTitle="RESET PASSWORD"
                      onPress={() => {
                        submitForm();
                      }}
                      title={" "}
                      style={{ minHeight: "auto" }}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboardHOC>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  signin: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    flex: 1,
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

export default ResetPassword;
