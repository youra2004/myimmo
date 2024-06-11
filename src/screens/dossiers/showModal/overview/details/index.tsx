import React, { ReactElement, useState } from "react";
import { Text, View, StyleSheet, Pressable, Platform } from "react-native";
import { styles } from "../../../styles";
import { materialTheme } from "../../../../../constants";
import { Icon } from "../../../../../components";
import { OverviewDetailsProps } from "../types";
import { height, width } from "../../../form/utils";
import { extractFullAddress } from "../../../../home/utils";
import SocioEconomics from "../../socioEconomics";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../../../components/bottomHeader/styles";
import { useNavigation } from "@react-navigation/native";
import Details from "./Details";
import Attachments from "./attachments";
import { StatusHeight } from "../../../../../constants/utils";

const OverviewDetails = ({ dossier }: OverviewDetailsProps): ReactElement => {
  const navigation = useNavigation();
  const [pdfReadercacheKey, setPdfReadercacheKey] = useState("");

  return (
    <>
      <View
        style={{
          paddingHorizontal: "5%",
          paddingTop: Platform.OS === "android" ? StatusHeight : 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {dossier.title && (
            <Text
              style={[styles.showSubtitle, { fontSize: 25, paddingTop: 10 }]}
            >
              {dossier.title}
            </Text>
          )}
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={{ fontSize: 18, color: Colors.SECONDARY }}>Back</Text>
          </Pressable>
        </View>

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
          <Text style={{ fontSize: 15, paddingLeft: 6, color: "#999" }}>
            {extractFullAddress(dossier.property.location)}
          </Text>
        </View>
        <View>
          {dossier.populationSize && dossier.employedRate && (
            <SocioEconomics
              socioEconomic={dossier.populationSize}
              employedRate={dossier.employedRate}
            />
          )}
        </View>
        <Details dossier={dossier} />
        <Attachments dossier={dossier} />
      </View>
    </>
  );
};

export default OverviewDetails;
