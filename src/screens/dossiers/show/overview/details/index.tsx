import React, { ReactElement } from "react";
import { Text, View } from "react-native";
import { materialTheme } from "../../../../../constants";
import { Icon } from "../../../../../components";
import { OverviewDetailsProps } from "../types";
import { width } from "../../../form/utils";
import { extractFullAddress } from "../../../../home/utils";
import useShowDimensions from "../../../../../hooks/useShowDimensions";
import { styles } from "./styles";
import OverviewValuation from "./Valuation";

const OverviewDetails = ({ dossier }: OverviewDetailsProps): ReactElement => {
  const { firstBlockRestHeight } = useShowDimensions();

  return (
    <>
      <View
        style={[
          styles.container,
          {
            height: firstBlockRestHeight,
          },
        ]}
      >
        <View>
          {dossier.title && <Text style={styles.title}>{dossier.title}</Text>}
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Icon
              name="location-on"
              color={materialTheme.COLORS.PLACEHOLDER}
              family="MaterialIcons"
              icon="location-on"
              iconSize={18}
              size={20}
              style={[]}
            />
            <Text style={styles.address}>
              {extractFullAddress(dossier.property.location)}
            </Text>
          </View>
        </View>

        <View style={styles.indicatorsContainer}>
          <View style={styles.indicators}>
            <View style={styles.amountBlock}>
              <Text style={styles.amount}>{dossier.property.buildingYear}</Text>
            </View>
            <Text>Building year</Text>
          </View>
          <View
            style={[
              styles.divider,
              {
                left: (width * 0.9) / 2,
              },
            ]}
          ></View>
          {/* Second item */}
          <View style={styles.indicators}>
            <View style={styles.amountBlock}>
              <Text style={styles.amount}>{dossier.property.livingArea}</Text>
              <Text>m²</Text>
            </View>
            <Text>Living area</Text>
          </View>
        </View>
        <OverviewValuation dossier={dossier} />
      </View>
    </>
  );
};

export default OverviewDetails;
