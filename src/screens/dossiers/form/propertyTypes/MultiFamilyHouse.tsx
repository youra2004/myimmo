import React, { ReactElement, useMemo } from "react";
import { Dimensions, View } from "react-native";
import { Block, Text } from "galio-framework";
import { materialTheme } from "../../../../constants";
const { width } = Dimensions.get("window");
import { FormikValues } from "formik";
import { DossierTypes } from "../../../../utils/constants";
import { styles } from "../../styles";
import { HelperText, TextInput } from "react-native-paper";
import Rating from "../Rating";
import { Colors } from "../../../../components/bottomHeader/styles";
import { getPropertyTypeLabel } from "../utils";
import TextInputLabel from "../../../../components/TextInputLabel";
import TextField from "../../../../components/TextField";

const MultiFamilyHouseForm = ({
  handleChange,
  values,
  touched,
  status,
  errors,
  handleQualityRate,
  handleConditionRate,
}: FormikValues): ReactElement => {
  const memoedProperty = useMemo(() => values.property, [values.property]);
  return (
    <>
      <View>
        <Block style={{ width: width * 0.9 }}>
          <Text style={[styles.showSubtitle, { color: "#000" }]}>
            {`${getPropertyTypeLabel(
              values.property.propertyType.code
            )} details`}
          </Text>
        </Block>
        <View style={styles.card}>
          <TextField
            name="property.landArea"
            style={[styles.inputPaper]}
            textColor={materialTheme.COLORS.TEXT_FIELD}
            autoCapitalize="none"
            returnKeyType="done"
            label={<TextInputLabel title="Land area (m²)" required />}
            value={values.property.landArea}
            onChangeText={handleChange("property.landArea")}
            left={
              <TextInput.Icon
                size={20}
                icon="image-filter-hdr"
                color={() => materialTheme.COLORS.ICON}
              />
            }
            activeUnderlineColor={Colors.SECONDARY}
          />
          <TextField
            name="property.numberOfUnits"
            style={[styles.inputPaper]}
            textColor={materialTheme.COLORS.TEXT_FIELD}
            returnKeyType="done"
            autoCapitalize="none"
            label={
              <TextInputLabel title="Number of residential units" required />
            }
            value={values.property.numberOfUnits}
            onChangeText={handleChange("property.numberOfUnits")}
            left={
              <TextInput.Icon
                size={20}
                icon="wrench-outline"
                color={() => materialTheme.COLORS.ICON}
              />
            }
            activeUnderlineColor={Colors.SECONDARY}
          />
          <TextField
            name="property.annualRentIncome"
            style={[styles.inputPaper]}
            textColor={materialTheme.COLORS.TEXT_FIELD}
            autoCapitalize="none"
            returnKeyType="done"
            label={
              <Text style={styles.inputPaperLabel}>
                Annual net rent income (EUR)
              </Text>
            }
            value={values.property.annualRentIncome}
            onChangeText={handleChange("property.annualRentIncome")}
            left={
              <TextInput.Icon
                size={20}
                icon="currency-eur"
                color={() => materialTheme.COLORS.ICON}
              />
            }
            activeUnderlineColor={Colors.SECONDARY}
          />
        </View>
        <Block style={{ width: width * 0.9, paddingBottom: 10 }}>
          <Text style={[styles.showSubtitle, { color: "#000", paddingTop: 0 }]}>
            Quality and Condition
          </Text>
        </Block>

        <View style={styles.ratingCard}>
          <Rating
            property={memoedProperty}
            handleQualityRate={handleQualityRate}
            handleConditionRate={handleConditionRate}
            type={DossierTypes.MULTI_FAMILY_HOUSE}
          />
        </View>
      </View>
    </>
  );
};

export default MultiFamilyHouseForm;
