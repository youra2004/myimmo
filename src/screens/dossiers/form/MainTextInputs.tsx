import React, { ReactElement } from "react";
import { materialTheme } from "../../../constants";
import { FormikValues } from "formik";
import { styles } from "../styles";
import { Colors } from "../../../components/bottomHeader/styles";
import TextInputLabel from "../../../components/TextInputLabel";
import TextField from "../../../components/TextField";

const MainTextInputs = ({
  values,
  handleChange,
}: FormikValues): ReactElement => {
  return (
    <React.Fragment>
      <TextField
        name="title"
        style={[styles.inputPaper]}
        textColor={materialTheme.COLORS.TEXT_FIELD}
        autoCapitalize="none"
        label={<TextInputLabel title="Title" required />}
        value={values.title}
        returnKeyType="done"
        onChangeText={handleChange("title")}
        activeUnderlineColor={Colors.SECONDARY}
      />

      <TextField
        name="property.buildingYear"
        style={[styles.inputPaper]}
        textColor={materialTheme.COLORS.TEXT_FIELD}
        keyboardType="number-pad"
        autoCapitalize="none"
        label={<TextInputLabel title="Building year" required />}
        value={values.property.buildingYear}
        returnKeyType="done"
        onChangeText={handleChange("property.buildingYear")}
        activeUnderlineColor={Colors.SECONDARY}
      />

      <TextField
        name="property.livingArea"
        style={[styles.inputPaper]}
        textColor={materialTheme.COLORS.TEXT_FIELD}
        autoCapitalize="none"
        label={<TextInputLabel title="Net living area (m²)" required />}
        value={values.property.livingArea}
        onChangeText={handleChange("property.livingArea")}
        returnKeyType="done"
        activeUnderlineColor={Colors.SECONDARY}
      />
    </React.Fragment>
  );
};

export default MainTextInputs;
