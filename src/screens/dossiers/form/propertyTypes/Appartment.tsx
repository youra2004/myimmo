import React, { ReactElement, useMemo } from "react";
import { Dimensions, View } from "react-native";
import { Block, Text } from "galio-framework";
import { materialTheme } from "../../../../constants";
import Rating from "../Rating";
import { getPropertyTypeLabel } from "../utils";
const { width } = Dimensions.get("window");
import { FormikValues } from "formik";
import { DossierTypes } from "../../../../utils/constants";
import { styles } from "../../styles";
import { HelperText, TextInput } from "react-native-paper";
import { Colors } from "../../../../components/bottomHeader/styles";
import Dropdowns from "../Dropdowns";
import Switchers from "../Switchers";
import TextField from "../../../../components/TextField";

const AppartmentForm = ({
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
            name="property.floorNumber"
            style={[styles.inputPaper]}
            keyboardType="numeric"
            textColor={materialTheme.COLORS.TEXT_FIELD}
            autoCapitalize="none"
            returnKeyType="done"
            label={<Text style={styles.inputPaperLabel}>Floor number</Text>}
            value={values.property.floorNumber}
            onChangeText={handleChange("property.floorNumber")}
            left={
              <TextInput.Icon
                size={20}
                icon="stairs-up"
                color={() => materialTheme.COLORS.ICON}
              />
            }
            activeUnderlineColor={Colors.SECONDARY}
          />
          <TextField
            name="property.numberOfFloorsInBuilding"
            style={[styles.inputPaper]}
            textColor={materialTheme.COLORS.TEXT_FIELD}
            keyboardType="numeric"
            returnKeyType="done"
            autoCapitalize="none"
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
            keyboardType="numeric"
            returnKeyType="done"
            autoCapitalize="none"
            label={<Text style={styles.inputPaperLabel}>Number of rooms</Text>}
            value={values.property.numberOfRooms}
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
            keyboardType="numeric"
            autoCapitalize="none"
            returnKeyType="done"
            label={
              <Text style={styles.inputPaperLabel}>Number of bathrooms</Text>
            }
            value={values.property.numberOfBathrooms}
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
            name="property.gardenArea"
            style={[styles.inputPaper]}
            textColor={materialTheme.COLORS.TEXT_FIELD}
            autoCapitalize="none"
            returnKeyType="done"
            label={<Text style={styles.inputPaperLabel}>Garden (m²)</Text>}
            value={values.property.gardenArea}
            onChangeText={handleChange("property.gardenArea")}
            left={
              <TextInput.Icon
                size={20}
                icon="shovel"
                color={() => materialTheme.COLORS.ICON}
              />
            }
            activeUnderlineColor={Colors.SECONDARY}
          />
          <TextField
            name="property.numberOfIndoorParkingSpaces"
            style={[styles.inputPaper]}
            textColor={materialTheme.COLORS.TEXT_FIELD}
            autoCapitalize="none"
            keyboardType="numeric"
            returnKeyType="done"
            label={<Text style={styles.inputPaperLabel}>Garage spaces</Text>}
            value={values.property.numberOfIndoorParkingSpaces}
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
            keyboardType="numeric"
            returnKeyType="done"
            autoCapitalize="none"
            label={
              <Text style={styles.inputPaperLabel}>Outdoor parking spaces</Text>
            }
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
            type={DossierTypes.APARTMENT}
          />
        </View>
      </View>
    </>
  );
};

export default AppartmentForm;
