import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export enum Colors {
  MAIN = "#212121",
}

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: 75,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
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
