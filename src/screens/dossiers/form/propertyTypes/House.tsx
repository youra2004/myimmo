import React, { ReactElement, useMemo } from "react";
import { Dimensions, View } from "react-native";
import { Block, Text } from "galio-framework";
import { materialTheme } from "../../../../constants";
const { width } = Dimensions.get("window");
import { FormikValues } from "formik";
import { DossierTypes } from "../../../../utils/constants";
import { styles } from "../../styles";
import Rating from "./../Rating";
import { HelperText, TextInput } from "react-native-paper";
import { Colors } from "../../../../components/bottomHeader/styles";
import { getPropertyTypeLabel } from "../utils";
import Dropdowns from "../Dropdowns";
import TextInputLabel from "../../../../components/TextInputLabel";
import Switchers from "../Switchers";
import TextField from "../../../../components/TextField";

const HouseForm = ({
  handleChange,
  values,
  touched,
  status,
  errors,
  setFieldValue,
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
        <Dropdowns
          values={values}
          touched={touched}
          status={status}
          errors={errors}
          setFieldValue={setFieldValue}
        />
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
            name="property.renovationYear"
            style={[styles.inputPaper]}
            textColor={materialTheme.COLORS.TEXT_FIELD}
            keyboardType="numeric"
            autoCapitalize="none"
            returnKeyType="done"
            label={<Text style={styles.inputPaperLabel}>Renovation year</Text>}
            value={values.property.renovationYear}
            onChangeText={handleChange("property.renovationYear")}
            left={
              <TextInput.Icon
                size={20}
                icon="wrench-clock"
                color={() => materialTheme.COLORS.ICON}
              />
            }
            activeUnderlineColor={Colors.SECONDARY}
          />
          <TextField
            name="property.numberOfFloorsInBuilding"
            style={[styles.inputPaper]}
            textColor={materialTheme.COLORS.TEXT_FIELD}
            autoCapitalize="none"
            keyboardType="numeric"
            returnKeyType="done"
            label={<Text style={styles.inputPaperLabel}>Number of floors</Text>}
            value={values.property.numberOfFloorsInBuilding}
            onChangeText={handleChange("property.numberOfFloorsInBuilding")}
            left={
              <TextInput.Icon
                size={20}
                icon="stairs-box"
                color={() => materialTheme.COLORS.ICON}
              />
            }
            activeUnderlineColor={Colors.SECONDARY}
          />
        </View>
        <View style={styles.card}>
          <TextField
            name="property.numberOfRooms"
            style={[styles.inputPaper]}
            textColor={materialTheme.COLORS.TEXT_FIELD}
            autoCapitalize="none"
            returnKeyType="done"
            label={<Text style={styles.inputPaperLabel}>Number of rooms</Text>}
            value={values.property.numberOfRooms}
            keyboardType="numeric"
            onChangeText={handleChange("property.numberOfRooms")}
            left={
              <TextInput.Icon
                size={20}
                icon="floor-plan"
                color={() => materialTheme.COLORS.ICON}
              />
            }
            activeUnderlineColor={Colors.SECONDARY}
          />
          <TextField
            name="property.numberOfBathrooms"
            style={[styles.inputPaper]}
            textColor={materialTheme.COLORS.TEXT_FIELD}
            autoCapitalize="none"
            returnKeyType="done"
            label={
              <Text style={styles.inputPaperLabel}>Number of bathrooms</Text>
            }
            value={values.property.numberOfBathrooms}
            keyboardType="numeric"
            onChangeText={handleChange("property.numberOfBathrooms")}
            left={
              <TextInput.Icon
                size={20}
                icon="bathtub-outline"
                color={() => materialTheme.COLORS.ICON}
              />
            }
            activeUnderlineColor={Colors.SECONDARY}
          />
          <TextField
            name="property.balconyArea"
            style={[styles.inputPaper]}
            textColor={materialTheme.COLORS.TEXT_FIELD}
            autoCapitalize="none"
            returnKeyType="done"
            label={
              <Text style={styles.inputPaperLabel}>Balcony / Terrace (m²)</Text>
            }
            value={values.property.balconyArea}
            onChangeText={handleChange("property.balconyArea")}
            left={
              <TextInput.Icon
                size={20}
                icon="balcony"
                color={() => materialTheme.COLORS.ICON}
              />
            }
            activeUnderlineColor={Colors.SECONDARY}
          />
        </View>
        <View style={styles.card}>
          <TextField
            name="property.numberOfIndoorParkingSpaces"
            style={[styles.inputPaper]}
            textColor={materialTheme.COLORS.TEXT_FIELD}
            returnKeyType="done"
            autoCapitalize="none"
            label={<Text style={styles.inputPaperLabel}>Garage spaces</Text>}
            keyboardType="numeric"
            value={values.property?.numberOfIndoorParkingSpaces}
            onChangeText={handleChange("property.numberOfIndoorParkingSpaces")}
            left={
              <TextInput.Icon
                size={20}
                icon="garage-variant-lock"
                color={() => materialTheme.COLORS.ICON}
              />
            }
            activeUnderlineColor={Colors.SECONDARY}
          />
          <TextField
            name="property.numberOfOutdoorParkingSpaces"
            style={[styles.inputPaper]}
            textColor={materialTheme.COLORS.TEXT_FIELD}
            autoCapitalize="none"
            label={
              <Text style={styles.inputPaperLabel}>Outdoor parking spaces</Text>
            }
            keyboardType="numeric"
            returnKeyType="done"
            value={values.property.numberOfOutdoorParkingSpaces}
            onChangeText={handleChange("property.numberOfOutdoorParkingSpaces")}
            left={
              <TextInput.Icon
                size={20}
                icon="car-brake-parking"
                color={() => materialTheme.COLORS.ICON}
              />
            }
            activeUnderlineColor={Colors.SECONDARY}
          />
        </View>
        <Switchers values={values} setFieldValue={setFieldValue} />
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
            type={DossierTypes.HOUSE}
          />
        </View>
      </View>
    </>
  );
};

export default HouseForm;
