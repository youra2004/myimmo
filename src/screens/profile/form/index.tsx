import React, { ReactElement, useContext } from "react";
import { FormikValues } from "formik";
import { Block } from "galio-framework";
import { materialTheme } from "../../../constants";
import { styles } from "../../dossiers/styles";
import { styles as childStyles } from "./styles";
import { Button, HelperText, TextInput } from "react-native-paper";
import { AuthContext } from "../../../context/Auth";
import { View } from "react-native";
import { width } from "../../dossiers/form/utils";
import TextInputLabel from "../../../components/TextInputLabel";
import { Colors } from "../../../components/bottomHeader/styles";
import ProfileFormHeader from "./Header";

const ProfileForm = ({
  handleChange,
  values,
  touched,
  status,
  errors,
  dirty,
  setFieldValue,
  isSubmitting,
  handleSubmit,
}: FormikValues): ReactElement => {
  const { signOut } = useContext(AuthContext);

  return (
    <View
      style={{
        paddingHorizontal: width * 0.05,
      }}
    >
      <ProfileFormHeader
        values={values}
        dirty={dirty}
        setFieldValue={setFieldValue}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
      />
      <View style={styles.card}>
        <TextInput
          style={[styles.inputPaper]}
          textColor={materialTheme.COLORS.TEXT_FIELD}
          autoCapitalize="none"
          label={<TextInputLabel title="First name" required />}
          value={values.firstName}
          returnKeyType="done"
          onChangeText={handleChange("firstName")}
          activeUnderlineColor={Colors.SECONDARY}
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
          label={<TextInputLabel title="Last name" required />}
          value={values.lastName}
          returnKeyType="done"
          onChangeText={handleChange("lastName")}
          activeUnderlineColor={Colors.SECONDARY}
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
      </View>
      <View style={[styles.card, { marginBottom: 0 }]}>
        <TextInput
          style={[styles.inputPaper]}
          textColor={materialTheme.COLORS.TEXT_FIELD}
          keyboardType="phone-pad"
          autoCapitalize="none"
          label={<TextInputLabel title="Phone" />}
          value={values.phone}
          returnKeyType="done"
          onChangeText={handleChange("phone")}
          activeUnderlineColor={Colors.SECONDARY}
          right={
            values.isPhoneVerified &&
            values.phone && (
              <TextInput.Icon
                icon="check-circle"
                color={() => Colors.GREEN}
                style={childStyles.verifiedIcon}
              />
            )
          }
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
          label={<TextInputLabel title="Email" />}
          value={values.email}
          returnKeyType="done"
          onChangeText={handleChange("email")}
          activeUnderlineColor={Colors.SECONDARY}
          right={
            values.isEmailVerified && (
              <TextInput.Icon
                icon="check-circle"
                color={() => Colors.GREEN}
                style={[childStyles.verifiedIcon]}
              />
            )
          }
        />
        {touched.email && (status?.errors.email || errors.email) && (
          <HelperText
            type="error"
            visible={touched.email && (status?.errors.email || errors.email)}
          >
            {touched.email && (status?.errors.email || errors.email)}
          </HelperText>
        )}
      </View>
      <HelperText type="info" visible={true}>
        This fields have to be verified via SMS and e-mail.
      </HelperText>
      <Block center></Block>
      <Block style={{ marginTop: 20 }}>
        <Button
          style={childStyles.signOutBtn}
          textColor={Colors.ALERT}
          onPress={() => {
            signOut();
          }}
          contentStyle={{
            height: 45,
          }}
          mode="contained"
        >
          Log Out
        </Button>
      </Block>
    </View>
  );
};

export default ProfileForm;
