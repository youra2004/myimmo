import React, { useState, ReactElement } from "react";
import { ScrollView, View, ActivityIndicator, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Block } from "galio-framework";
import { styles } from "../styles";
import { Dossier } from "../types";
import { fetchDossier } from "../edit/utils";
import { Colors } from "../../../components/bottomHeader/styles";
import OverviewDetails from "./overview/details";
const ShowDossierModal = ({ route }: any): ReactElement => {
  const id = route?.params?.id;
  const [dossier, setDossier] = useState<Dossier>();
  const [isLoading, setIsLoading] = useState(false);
  const { width } = Dimensions.get("window");

  useFocusEffect(
    React.useCallback(() => {
      fetchDossier({ setDossier, setIsLoading, id });
    }, [])
  );

  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color={Colors.BLACK} />
      </View>
    );
  }

  return (
    <ScrollView style={{ width }}>
      <Block>
        {dossier && (
          <>
            <Block flex middle style={{ paddingBottom: 38 }}>
              <Block>
                <View style={styles.fullWidth}>
                  <OverviewDetails dossier={dossier} />
                </View>
              </Block>
            </Block>
          </>
        )}
      </Block>
    </ScrollView>
  );
};

export default ShowDossierModal;
