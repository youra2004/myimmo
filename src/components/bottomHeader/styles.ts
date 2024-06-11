import { Dimensions, StyleSheet, StatusBar, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const fin = height + (StatusBar?.currentHeight || 0);

const finalHeight =
  height + (Platform.OS === "android" ? StatusBar?.currentHeight || 0 : 0);

export enum Colors {
  MAIN = "#212121",
  SECONDARY = "#256def",
  GREY = "#f2f2f2",
  BLACK = "#000",
  DISABLED = "#bbafaf",
  ALERT = "#fd4949",
  GREEN = "#2cd058",
}

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: 75,
    top: finalHeight - 75,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: width * 0.05,
  },
  modal: {
    top: height - 132,
  },
  item: {
    flexDirection: "row",
    width: width * 0.9,
    borderWidth: 0,
    //borderColor: "red",
    height: "100%",
    //height: 60,
    backgroundColor: Colors.MAIN,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 45,
  },
  button: { width: 35, height: 35 },
});
