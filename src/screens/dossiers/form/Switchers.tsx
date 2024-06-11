import React, { ReactElement } from "react";
import { View } from "react-native";
import { Text } from "galio-framework";
import { styles } from "../styles";
import { Switch, Divider } from "react-native-paper";
import { Colors } from "../../../components/bottomHeader/styles";
import { DossierTypes } from "../../../utils/constants";
import { FormikValues } from "formik";

const Switchers = ({ values, setFieldValue }: FormikValues): ReactElement => {
  return (
    <View style={styles.switchersCard}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.inputPaperLabel, { fontSize: 17 }]}>
          New building
        </Text>
        <Switch
          value={Boolean(values.property.isNew)}
          color={Colors.GREEN}
          onValueChange={(isChecked: boolean) => {
            setFieldValue("property.isNew", isChecked, false);
          }}
        />
      </View>
      <Divider style={{ marginVertical: 10 }} />
      {values.property.propertyType.code === DossierTypes.APARTMENT && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={[styles.inputPaperLabel, { fontSize: 17 }]}>Lift</Text>
          <Switch
            value={Boolean(values.property.hasLift)}
            color={Colors.GREEN}
            onValueChange={(isChecked: boolean) => {
              setFieldValue("property.hasLift", isChecked, false);
            }}
          />
        </View>
      )}
      {values.property.propertyType.code === DossierTypes.HOUSE && (
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={[styles.inputPaperLabel, { fontSize: 17 }]}>Pool</Text>
            <Switch
              value={Boolean(values.property.hasPool)}
              color={Colors.GREEN}
              onValueChange={(isChecked: boolean) => {
                setFieldValue("property.hasPool", isChecked, false);
              }}
            />
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={[styles.inputPaperLabel, { fontSize: 17 }]}>
              Sauna
            </Text>
            <Switch
              value={Boolean(values.property.hasSauna)}
              color={Colors.GREEN}
              onValueChange={(isChecked: boolean) => {
                setFieldValue("property.hasSauna", isChecked, false);
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default Switchers;
