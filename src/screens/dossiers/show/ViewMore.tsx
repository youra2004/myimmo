import React, { ReactElement } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Dossier } from "../types";
import { IconButton } from "react-native-paper";
import { Screens } from "../../../utils/constants";
import { Colors } from "../../../components/bottomHeader/styles";
import useShowDimensions from "../../../hooks/useShowDimensions";

const ViewMore = ({
  navigation,
  dossier,
}: {
  navigation: any;
  dossier: Dossier;
}): ReactElement => {
  const { width, secondBlockHeight } = useShowDimensions();
  return (
    <TouchableOpacity
      style={{
        width,
        alignItems: "center",
        backgroundColor: "#fff",
        borderColor: "blue",
        height: secondBlockHeight,
      }}
      onPress={() => {
        navigation?.navigate(Screens.MODAL, {
          screen: "ShowDossierModal",
          params: { id: dossier._id },
        });
      }}
    >
      <View style={[{}]}>
        <IconButton
          icon="chevron-up"
          iconColor={Colors.SECONDARY}
          size={60}
          style={{ borderWidth: 0, marginTop: 0 }}
        />
        <Text
          style={{
            color: Colors.SECONDARY,
            fontSize: 18,
            marginTop: -25,
          }}
        >
          View more
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ViewMore;
