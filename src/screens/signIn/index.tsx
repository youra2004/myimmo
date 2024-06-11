import React, { useContext, useState } from "react";
import {
  View,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, Text, theme } from "galio-framework";
import { Images, materialTheme } from "../../constants";
import { Formik } from "formik";
import useValidation from "../../hooks/useValidation";
import * as Yup from "yup";
import {
  handleSignInSubmit,
  initActiveState,
  initSignInValues,
  SignInActive,
} from "./utils";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Navigation } from "../../types/navigation";
import { AuthContext } from "../../context/Auth";
import DismissKeyboardHOC from "../../hoc/DismissKeyboard";
import { HelperText, TextInput } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import { isRunningInExpoGo } from "../../utils/common";
import { Colors } from "../../components/bottomHeader/styles";
import { SignInValues } from "../../types/auth";
import { styles } from "./styles";
import useSocial from "../../hooks/useSocialGoogle";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<any>();
  const params = route?.params;
  const [secureTextEntry, setSecureTextEntry] = useState({
    password: true,
  });
  const { email, password } = useValidation();
  const { signIn } = useContext(AuthContext);
  const [active, setActive] = useState(initActiveState);
  const toggleActive = (name: keyof SignInValues) => (): void => {
    const auxActive: SignInActive = JSON.parse(JSON.stringify(active));
    auxActive[name] = !auxActive[name];
    setActive(auxActive);
  };
  const [socialError, setSocialError] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      setSocialError("");
    }, [])
  );

  const onError = (message: string) => setSocialError(message);

  const { googleRequest, googlePromptAsync, fbRequest, fbPromptAsync } =
    useSocial(onError);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? undefined : "padding"}
      enabled
    >
      <DismissKeyboardHOC>
        <View style={styles.container}>
          <Formik
            initialValues={
              params?.email
                ? { email: params?.email, password: "" }
                : initSignInValues
            }
            onSubmit={handleSignInSubmit({
              signIn,
              navigation,
            })}
            validationSchema={Yup.object().shape({
              email,
              password,
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
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    round
                    onlyIcon
                    iconSize={(theme.SIZES?.BASE || 0) * 1.625}
                    icon="facebook"
                    iconFamily="font-awesome"
                    color={theme.COLORS?.FACEBOOK}
                    shadowless
                    iconColor={theme.COLORS?.WHITE}
                    style={[styles.social, { marginRight: 10 }]}
                    disabled={!fbRequest}
                    onPress={() => {
                      fbPromptAsync();
                    }}
                  />

                  <View style={{ marginTop: "auto", marginBottom: "auto" }}>
                    <Pressable
                      style={{
                        backgroundColor: "#fff",
                        width: 57,
                        height: 57,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 57,
                      }}
                      onPress={() => {
                        googlePromptAsync();
                      }}
                      disabled={!googleRequest}
                    >
                      <Image
                        source={Images.Social.Google}
                        style={{
                          width: 29,
                          height: 29,
                          backgroundColor: "#fff",
                          borderRadius: 29,
                        }}
                      />
                    </Pressable>
                  </View>
                </View>
                <View style={{ paddingBottom: 12, paddingTop: 2 }}>
                  <Text center size={14}>
                    or be classical
                  </Text>
                </View>
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
                  {touched.email && (status?.errors.email || errors.email) && (
                    <HelperText
                      type="error"
                      visible={
                        touched.email && (status?.errors.email || errors.email)
                      }
                    >
                      {touched.email && (status?.errors.email || errors.email)}
                    </HelperText>
                  )}
                  <TextInput
                    secureTextEntry={secureTextEntry.password}
                    style={[styles.inputPaper]}
                    textColor={materialTheme.COLORS.TEXT_FIELD}
                    autoCapitalize="none"
                    label={<Text style={styles.inputPaperLabel}>Password</Text>}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    right={
                      <TextInput.Icon
                        icon="eye"
                        onPress={() => {
                          setSecureTextEntry((prevState) => ({
                            ...prevState,
                            password: !prevState.password,
                          }));
                        }}
                        style={{ marginBottom: -10 }}
                        color={() => Colors.SECONDARY}
                      />
                    }
                    activeUnderlineColor={Colors.SECONDARY}
                    underlineStyle={
                      !active.password ? styles.inputActive : null
                    }
                    onFocus={toggleActive("password")}
                    onBlur={toggleActive("password")}
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
                  {socialError && (
                    <HelperText type="error" visible={Boolean(socialError)}>
                      {socialError}
                    </HelperText>
                  )}
                </View>
                <View>
                  <Text
                    size={(theme.SIZES?.FONT || 0) * 0.75}
                    onPress={() => {
                      resetForm();
                      navigation?.navigate("Forgot Password");
                    }}
                    style={{
                      alignSelf: "flex-end",
                    }}
                  >
                    Forgot your password?
                  </Text>
                  <View style={{ marginTop: 20 }}>
                    <Button
                      shadowless
                      color={Colors.BLACK}
                      style={styles.signInBtn}
                      onPress={() => {
                        submitForm();
                      }}
                      loading={isSubmitting}
                    >
                      SIGN IN
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
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </DismissKeyboardHOC>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
