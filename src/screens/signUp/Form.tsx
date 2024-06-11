import React, { ReactElement, useState } from "react";
import { View } from "react-native";
import { FormikValues } from "formik";
import { Button, Text, theme } from "galio-framework";
import { materialTheme } from "../../constants";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Navigation } from "../../types/navigation";
import { HelperText, TextInput } from "react-native-paper";
import { styles } from "./styles";
import { Colors } from "../../components/bottomHeader/styles";

const SignUpForm = ({
  handleChange,
  isSubmitting,
  values,
  submitForm,
  touched,
  status,
  errors,
  resetForm,
  toggleActive,
  active,
  socialError,
}: FormikValues): ReactElement => {
  const navigation = useNavigation<Navigation>();
  const [secureTextEntry, setSecureTextEntry] = useState({
    password: true,
    passwordConfirm: true,
  });

  useFocusEffect(
    React.useCallback(() => {
      resetForm();
    }, [])
  );

  return (
    <React.Fragment>
      <View style={styles.card}>
        <TextInput
          style={[styles.inputPaper]}
          textColor={materialTheme.COLORS.TEXT_FIELD}
          autoCapitalize="none"
          label={<Text style={styles.inputPaperLabel}>First name</Text>}
          activeUnderlineColor={Colors.SECONDARY}
          underlineStyle={!active.firstName ? styles.inputActive : null}
          value={values.firstName}
          onChangeText={handleChange("firstName")}
          onFocus={toggleActive("firstName")}
          onBlur={toggleActive("firstName")}
          returnKeyType="done"
        />
        {touched.firstName &&
          (status?.errors.firstName || errors.firstName) && (
            <HelperText
              type="error"
              visible={
                touched.firstName &&
                (status?.errors.firstName || errors.firstName)
              }
            >
              {touched.firstName &&
                (status?.errors.firstName || errors.firstName)}
            </HelperText>
          )}
        <TextInput
          style={[styles.inputPaper]}
          textColor={materialTheme.COLORS.TEXT_FIELD}
          autoCapitalize="none"
          label={<Text style={styles.inputPaperLabel}>Last name</Text>}
          activeUnderlineColor={Colors.SECONDARY}
          underlineStyle={!active.lastName ? styles.inputActive : null}
          value={values.lastName}
          onChangeText={handleChange("lastName")}
          onFocus={toggleActive("lastName")}
          onBlur={toggleActive("lastName")}
          returnKeyType="done"
        />
        {touched.lastName && (status?.errors.lastName || errors.lastName) && (
          <HelperText
            type="error"
            visible={
              touched.lastName && (status?.errors.lastName || errors.lastName)
            }
          >
            {touched.lastName && (status?.errors.lastName || errors.lastName)}
          </HelperText>
        )}
        <TextInput
          keyboardType="phone-pad"
          style={[styles.inputPaper]}
          textColor={materialTheme.COLORS.TEXT_FIELD}
          autoCapitalize="none"
          label={<Text style={styles.inputPaperLabel}>Phone</Text>}
          activeUnderlineColor={Colors.SECONDARY}
          underlineStyle={!active.phone ? styles.inputActive : null}
          value={values.phone}
          onChangeText={handleChange("phone")}
          onFocus={toggleActive("phone")}
          onBlur={toggleActive("phone")}
          returnKeyType="done"
        />
        {touched.phone && (status?.errors.phone || errors.phone) && (
          <HelperText
            type="error"
            visible={touched.phone && (status?.errors.phone || errors.phone)}
          >
            {touched.phone && (status?.errors.phone || errors.phone)}
          </HelperText>
        )}
        <TextInput
          keyboardType="email-address"
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
          returnKeyType="done"
        />
        {touched.email && (status?.errors.email || errors.email) && (
          <HelperText
            type="error"
            visible={touched.email && (status?.errors.email || errors.email)}
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
          activeUnderlineColor={Colors.SECONDARY}
          underlineStyle={!active.password ? styles.inputActive : null}
          value={values.password}
          onChangeText={handleChange("password")}
          onFocus={toggleActive("password")}
          onBlur={toggleActive("password")}
          returnKeyType="done"
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
        {touched.password && (status?.errors.password || errors.password) && (
          <HelperText
            type="error"
            visible={
              touched.password && (status?.errors.password || errors.password)
            }
          >
            {touched.password && (status?.errors.password || errors.password)}
          </HelperText>
        )}
        <TextInput
          secureTextEntry={secureTextEntry.passwordConfirm}
          style={[styles.inputPaper]}
          textColor={materialTheme.COLORS.TEXT_FIELD}
          autoCapitalize="none"
          label={<Text style={styles.inputPaperLabel}>Repeat Password</Text>}
          activeUnderlineColor={Colors.SECONDARY}
          underlineStyle={!active.passwordConfirm ? styles.inputActive : null}
          value={values.passwordConfirm}
          onChangeText={handleChange("passwordConfirm")}
          onFocus={toggleActive("passwordConfirm")}
          onBlur={toggleActive("passwordConfirm")}
          returnKeyType="done"
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
          (status?.errors.passwordConfirm || errors.passwordConfirm) && (
            <HelperText
              type="error"
              visible={
                touched.passwordConfirm &&
                (status?.errors.passwordConfirm || errors.passwordConfirm)
              }
            >
              {touched.passwordConfirm &&
                (status?.errors.passwordConfirm || errors.passwordConfirm)}
            </HelperText>
          )}
        {socialError && (
          <HelperText type="error" visible={Boolean(socialError)}>
            {socialError}
          </HelperText>
        )}
      </View>
      <View style={{ marginTop: 40 }}>
        <Button
          shadowless
          style={styles.signUpBtn}
          color={Colors.BLACK}
          onPress={() => {
            submitForm();
          }}
          loading={isSubmitting}
        >
          SIGN UP
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
          <Text center size={(theme.SIZES?.FONT || 0) * 0.75}>
            Already have an account?{" "}
            <Text color={Colors.SECONDARY}>Sign In</Text>
          </Text>
        </Button>
      </View>
    </React.Fragment>
  );
};

export default SignUpForm;
