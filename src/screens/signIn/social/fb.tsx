import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import { ResponseType } from "expo-auth-session";
import { Block, Button, Input, Text, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import { materialTheme } from "../../../constants";
import { HeaderHeight } from "../../../constants/utils";
import { Formik } from "formik";
import useValidation from "../../../hooks/useValidation";
import * as Yup from "yup";
import {
  fetchFacebookUserByToken,
  fetchGoogleUserByToken,
  handleSignInSubmit,
  handleSocialSignInSubmit,
  initSignInValues,
  initSocailSignInValues,
  scopes,
} from "./../utils";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Navigation } from "../../../types/navigation";
import { AuthContext } from "../../../context/Auth";
import DismissKeyboardHOC from "../../../hoc/DismissKeyboard";
import { HelperText, TextInput } from "react-native-paper";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { FacebookAuthRequestConfig } from "expo-auth-session/providers/facebook";
import {
  REACT_APP_FACEBOOK_CLIENT_ID,
  REACT_APP_GOOGLE_CLIENT_ID,
} from "../../../utils/config";
const { width } = Dimensions.get("window");

WebBrowser.maybeCompleteAuthSession();

const FacebookSignIn = () => {
  const navigation = useNavigation<Navigation>();
  const [socialSignInValues, setSocialSignInValues] = useState(
    initSocailSignInValues
  );
  const route = useRoute<any>();
  const params = route?.params;

  const { name, email, provider } = params;
  const { phone } = useValidation();
  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    setSocialSignInValues((prevState) => ({
      ...prevState,
      name,
      email,
      provider,
    }));
  }, [name, email, provider]);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.25, y: 1.1 }}
      locations={[0.2, 1]}
      colors={["#6C24AA", "#15002B"]}
      style={[
        styles.signin,
        { flex: 1, paddingTop: (theme.SIZES?.BASE || 0) * 4 },
      ]}
    >
      <DismissKeyboardHOC>
        <Block flex middle>
          <KeyboardAvoidingView behavior="padding" enabled>
            <Block
              middle
              style={{
                paddingVertical: (theme.SIZES?.BASE || 0) * 2.625,
                paddingTop: "50%",
              }}
            >
              <Text center color="white" size={14}>
                Please enter your Facebook account phone
              </Text>
            </Block>

            <Formik
              initialValues={socialSignInValues}
              onSubmit={handleSocialSignInSubmit({
                signIn,
                navigation,
              })}
              validationSchema={Yup.object().shape({
                phone,
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
                <>
                  <Text>{JSON.stringify(values)}</Text>
                  <Block flex>
                    <Block center>
                      <TextInput
                        keyboardType="phone-pad"
                        style={[styles.inputPaper]}
                        textColor="white"
                        autoCapitalize="none"
                        label={
                          <Text style={styles.inputPaperLabel}>Phone</Text>
                        }
                        underlineStyle={styles.inputPaperUnderlineStyle}
                        value={values.phone}
                        onChangeText={handleChange("phone")}
                      />
                      <HelperText
                        type="error"
                        visible={
                          touched.phone &&
                          (status?.errors.phone || errors.phone)
                        }
                      >
                        {touched.phone &&
                          (status?.errors.phone || errors.phone)}
                      </HelperText>
                    </Block>
                    <Block center flex style={{ marginTop: 20 }}>
                      <Button
                        size="large"
                        shadowless
                        color={materialTheme.COLORS.BUTTON_COLOR}
                        style={{ height: 48 }}
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
                          navigation?.navigate("Sign In");
                        }}
                      >
                        <Text
                          center
                          color={theme.COLORS?.WHITE}
                          size={(theme.SIZES?.FONT || 0) * 0.75}
                        >
                          Already have an account? Sign In
                        </Text>
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
                          color={theme.COLORS?.WHITE}
                          size={(theme.SIZES?.FONT || 0) * 0.75}
                          style={{ marginTop: 0 }}
                        >
                          {"Don't have an account? Sign Up"}
                        </Text>
                      </Button>
                    </Block>
                  </Block>
                </>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </Block>
      </DismissKeyboardHOC>
    </LinearGradient>
  );
};

export default FacebookSignIn;

const styles = StyleSheet.create({
  signin: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
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
    width: width * 0.9,
    backgroundColor: "transparent",
  },
  inputPaperLabel: {
    color: materialTheme.COLORS.PLACEHOLDER,
  },
  inputPaperUnderlineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
});
