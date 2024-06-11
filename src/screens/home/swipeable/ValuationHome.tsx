import React, { ReactElement } from "react";
import { View } from "react-native";
import { Block, Text } from "galio-framework";
import {
  showNetRentPerM2Range,
  showPrice,
  showPricePerM2Range,
  showPriceRange,
  showRentRange,
} from "../utils";
import { styles } from "../../dossiers/styles";
import {
  ShowValuationPrice,
  ShowValuationRent,
  ValuationProps,
} from "../types";
import { Measurement_Units, Rent } from "../../../utils/constants";
import { separateThousands } from "../../../utils/common";

const Valuation = ({
  dealType,
  valuationSale,
  valuationRentNet,
  livingArea,
}: ValuationProps): ReactElement => {
  return (
    <Block style={styles.homeValuationContainer}>
      {dealType === "sale" && (
        <>
          <PriceSimple valuation={valuationSale} livingArea={livingArea} />
        </>
      )}
      {dealType === "rent" && (
        <>
          <RentSimple valuation={valuationRentNet} livingArea={livingArea} />
        </>
      )}

      {dealType == undefined && (
        <>
          <PriceSimple valuation={valuationSale} livingArea={livingArea} />
        </>
      )}
    </Block>
  );
};

export const PriceSimple = ({
  valuation,
  style,
}: ShowValuationPrice): ReactElement => {
  if (!valuation) return <></>;

  return (
    <View style={[{}, style]}>
      <Text style={styles.homePriceText}>{showPrice(valuation.value)}</Text>
    </View>
  );
};

export const RentSimple = ({
  valuation,
  style,
}: ShowValuationRent): ReactElement => {
  if (!valuation) return <></>;
  return (
    <View style={[style]}>
      <Text style={styles.homePriceText}>{showPrice(valuation.value)}</Text>
    </View>
  );
};

export const PriceRange = ({
  valuation,
  livingArea,
  style,
}: ShowValuationPrice): ReactElement => {
  if (!valuation) return <></>;
  return (
    <View style={[styles.homeValuationItemContainer, style]}>
      <View>
        <Text style={[styles.homePriceTitle, styles.homePriceText]}>
          Price range
        </Text>
      </View>
      <View>
        <Text style={styles.homePriceText}>
          {showPriceRange(
            valuation.valueRange.lower,
            valuation.valueRange.upper
          )}
        </Text>
      </View>
      <View>
        <Text style={styles.homePricePerM2}>
          {livingArea &&
            showPricePerM2Range(
              valuation.valueRange.lower,
              valuation.valueRange.upper,
              livingArea
            )}
        </Text>
      </View>
    </View>
  );
};

export const RentRange = ({
  type = Rent.NET,
  valuation,
  livingArea,
  style,
}: ShowValuationRent): ReactElement => {
  if (!valuation) return <></>;
  return (
    <View style={[styles.homeValuationItemContainer, style]}>
      <View>
        <Text style={[styles.homePriceTitle, styles.homePriceText]}>
          {type === Rent.NET
            ? "Net rent range"
            : Rent.GROSS
            ? "Gross rent range"
            : ""}
        </Text>
      </View>
      <View>
        <Text style={styles.homePriceText}>
          {showRentRange(
            valuation?.valueRange.lower,
            valuation?.valueRange.upper
          )}
        </Text>
      </View>
      <View>
        <Text style={styles.homePricePerM2}>
          {livingArea &&
            showNetRentPerM2Range(
              valuation?.valueRange.lower,
              valuation?.valueRange.upper,
              livingArea
            )}
        </Text>
      </View>
    </View>
  );
};
export default Valuation;
