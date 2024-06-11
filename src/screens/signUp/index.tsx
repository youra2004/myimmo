import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Image,
  Platform,
} from "react-native";
import { Formik } from "formik";
import useValidation from "../../hooks/useValidation";
import * as Yup from "yup";
import {
  initSignUpValues,
  handleSignUpSubmit,
  initActiveState,
  SignUpActive,
} from "./utils";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../../types/navigation";
import { AuthContext } from "../../context/Auth";
import { SignUpValues } from "../../types/auth";
import Form from "./Form";
import { styles } from "./styles";
import DismissKeyboardHOC from "../../hoc/DismissKeyboard";
import { Button, theme, Text } from "galio-framework";
import Images from "../../constants/Images";
import useSocial from "../../hooks/useSocialGoogle";

const SignUp = () => {
  const navigation = useNavigation<Navigation>();
  const { firstName, lastName, password, passwordConfirm, phone, email } =
    useValidation();
  const [initValues] = useState(initSignUpValues);
  const { signUp } = useContext(AuthContext);
  const [active, setActive] = useState(initActiveState);
  const toggleActive = (name: keyof SignUpValues) => (): void => {
    const auxActive: SignUpActive = JSON.parse(JSON.stringify(active));
    auxActive[name] = !auxActive[name];
    setActive(auxActive);
  };
  const [socialError, setSocialError] = useState("");
  const isInputActive = Object.values(active).some((val) => val);

  const onError = (message: string) => setSocialError(message);

  const { googleRequest, googlePromptAsync, fbRequest, fbPromptAsync } =
    useSocial(onError);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? undefined : "padding"}
      enabled
      keyboardVerticalOffset={!isInputActive ? 0 : -100}
    >
      <DismissKeyboardHOC>
        <View style={[styles.container]}>
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
            <View
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                backgroundColor: "#fff",
                width: 57,
                height: 57,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 57,
              }}
            >
              <TouchableWithoutFeedback
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
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={{ paddingBottom: 12, paddingTop: 2 }}>
            <Text center size={14}>
              or be classical
            </Text>
          </View>
          <Formik
            initialValues={initValues}
            onSubmit={handleSignUpSubmit({
              navigation,
              signUp,
            })}
            validationSchema={Yup.object().shape({
              firstName,
              lastName,
              email,
              phone,
              password,
              passwordConfirm,
            })}
          >
            {(props) => (
              <Form
                {...props}
                toggleActive={toggleActive}
                active={active}
                socialError={socialError}
              />
            )}
          </Formik>
        </View>
      </DismissKeyboardHOC>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
