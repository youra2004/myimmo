import { width } from "../dossiers/form/utils";
import { Platform, StyleSheet } from "react-native";
import { HeaderHeight } from "../../constants/utils";
import { materialTheme } from "../../constants";
import { theme } from "galio-framework";

export const styles = StyleSheet.create({
  signin: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  social: {
    width: (theme.SIZES?.BASE || 0) * 3.5,
    height: (theme.SIZES?.BASE || 0) * 3.5,
    borderRadius: (theme.SIZES?.BASE || 0) * 1.75,
    justifyContent: "center",
  },
  container: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
  },
  inputPaper: {
    backgroundColor: "transparent",
  },
  inputPaperLabel: {
    color: materialTheme.COLORS.PLACEHOLDER,
  },
  card: {
    backgroundColor: "#fff",
    paddingHorizontal: width * 0.05,
    borderRadius: 5,
    paddingBottom: width * 0.05,
    marginBottom: width * 0.1,
  },
  signInBtn: { height: 48, width: "100%", margin: 0 },
  inputActive: {
    borderWidth: 0.7,
    borderColor: "#ccc",
  },
});
