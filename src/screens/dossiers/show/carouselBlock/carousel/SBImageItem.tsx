import React, { FC } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View, Image } from "react-native";
import FastImage from "react-native-fast-image";
import { materialTheme } from "../../../../../constants";
import { isRunningInExpoGo } from "../../../../../utils/common";
import { DossierImage } from "../../../types";

interface Props {
  style?: StyleProp<ViewStyle>;
  index?: number;
  showIndex?: boolean;
  item: DossierImage;
  cached?: boolean;
}

export const SBImageItem: FC<Props> = ({
  style,
  index: _index,
  item: { mediumUrl },
}) => {
  return (
    <View style={[styles.container, style]}>
      {isRunningInExpoGo() ? (
        <Image
          source={{ uri: mediumUrl }}
          resizeMode="cover"
          style={{ width: "100%", height: materialTheme.HEIGHT.SHOW.IMAGE }}
        />
      ) : (
        <FastImage
          source={{ uri: mediumUrl }}
          resizeMode="cover"
          style={{ width: "100%", height: materialTheme.HEIGHT.SHOW.IMAGE }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
});
