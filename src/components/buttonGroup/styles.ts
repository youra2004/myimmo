import { Dimensions, StyleSheet } from "react-native";
import { theme } from "galio-framework";
import { materialTheme } from "../../constants";
import { Colors } from "../bottomHeader/styles";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.SECONDARY,
    borderWidth: 0,
    borderRadius: 0,
    minHeight: 30,
  },
  firstChild: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  lastChild: { borderTopRightRadius: 5, borderBottomRightRadius: 5 },
  selected: {
    borderWidth: 2,
  },
  fullWidth: { width: "100%", flexShrink: 1 },
});
