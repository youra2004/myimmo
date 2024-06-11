import React, { ReactElement } from "react";
import { Text, View } from "react-native";
import { width } from "../../form/utils";
import { OverviewProps } from "../types";
import OverviewDetails from "./details";
import { styles } from "../../styles";
import Rating from "../../form/Rating";
import { DossierTypes } from "../../../../utils/constants";

const Overview = ({ dossier }: OverviewProps): ReactElement => {
  return (
    <View style={styles.fullWidth}>
      <OverviewDetails dossier={dossier} />
    </View>
  );
};

export default Overview;
