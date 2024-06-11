import React, { ReactElement, useEffect, useState } from "react";
import { Dimensions, View, Text, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Colors } from "../../../../components/bottomHeader/styles";
import { materialTheme } from "../../../../constants";
import { width } from "../../form/utils";
import { styles } from "../../styles";
import { SocioEconomicsProps } from "../types";

const SocioEconomics = ({
  socioEconomic,
  employedRate,
}: SocioEconomicsProps): ReactElement => {
  const years = socioEconomic?.divisions[0].years;
  const yearsEmployedPupulation = employedRate?.divisions[0].years;

  const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 1,
    color: () => materialTheme.COLORS.TEXT_FIELD,
    labelColor: () => materialTheme.COLORS.TEXT_FIELD,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: Colors.SECONDARY,
      fill: "#fff",
    },
    propsForBackgroundLines: {
      strokeWidth: "0.5",
      strokeDasharray: [1],
      stroke: "#ccc",
    },
  };

  return (
    <View>
      {years && (
        <>
          <View>
            <Text style={[styles.showSubtitle, {}]}>Population size</Text>
          </View>

          <LineChart
            data={{
              labels: years?.map(({ year }: any) => year),
              datasets: [
                {
                  data: years?.map(
                    ({ values }: any) => values?.[0]?.absoluteValue / 1000 || 0
                  ),
                  color: () => Colors.SECONDARY,
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.9} // from react-native
            height={220}
            yAxisSuffix="k"
            yAxisInterval={1}
            chartConfig={chartConfig}
            style={{ borderRadius: 5 }}
          />
        </>
      )}
      {yearsEmployedPupulation && (
        <>
          <View>
            <Text style={[styles.showSubtitle, { width: width * 0.9 }]}>
              Employed rate
            </Text>
          </View>
          <LineChart
            data={{
              labels: yearsEmployedPupulation?.map(({ year }: any) => year),
              datasets: [
                {
                  data: yearsEmployedPupulation?.map(
                    ({ values }: any) => values?.[0]?.absoluteValue || 0
                  ),
                  color: () => Colors.SECONDARY,
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.9} // from react-native
            height={220}
            yAxisSuffix="%"
            yAxisInterval={1}
            chartConfig={{ ...chartConfig, decimalPlaces: 2 }}
            style={{ borderRadius: 5 }}
          />
        </>
      )}
    </View>
  );
};

export default SocioEconomics;
