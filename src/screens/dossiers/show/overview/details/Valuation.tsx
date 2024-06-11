import React, { ReactElement } from "react";
import { Text, View } from "react-native";
import { showPriceRange, showRentRange } from "../../../../home/utils";
import { Dossier } from "../../../types";
import { styles } from "./styles";

const OverviewValuation = ({ dossier }: { dossier: Dossier }): ReactElement => {
  return (
    <View style={styles.valuationBlock}>
      {dossier?.valuationSale && (
        <View style={styles.valuationItem}>
          <Text style={styles.valuationItemTitle}>Sale range </Text>
          <Text style={styles.valuationItemAmount}>
            {showPriceRange(
              dossier?.valuationSale?.valueRange.lower || 0,
              dossier?.valuationSale?.valueRange.upper || 0
            )}
          </Text>
        </View>
      )}
      {dossier?.valuationRentNet && (
        <View style={styles.valuationItem}>
          <Text style={styles.valuationItemTitle}>Rent range </Text>
          <Text style={styles.valuationItemAmount}>
            {showRentRange(
              dossier?.valuationRentNet?.valueRange.lower || 0,
              dossier?.valuationRentNet?.valueRange.upper || 0
            )}
          </Text>
        </View>
      )}
    </View>
  );
};

export default OverviewValuation;
