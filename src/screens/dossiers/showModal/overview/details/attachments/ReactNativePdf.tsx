import React, { ReactElement } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Pdf from "react-native-pdf";

const ReactNativePdf = ({ source }: any): ReactElement => {
  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    height: Dimensions.get("window").height * 0.75,
    width: Dimensions.get("window").width,
  },
});

export default ReactNativePdf;
