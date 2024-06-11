import React, { ReactElement } from "react";
import { View, StyleSheet, Platform } from "react-native";
const StatusBarBackground = ({ style }: any): ReactElement => {
  return <View style={[styles.statusBarBackground, { ...style } || {}]}></View>;
};

const styles = StyleSheet.create({
  statusBarBackground: {
    height: Platform.OS === "ios" ? 18 : 0, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
    backgroundColor: "white",
  },
});

export default StatusBarBackground;
