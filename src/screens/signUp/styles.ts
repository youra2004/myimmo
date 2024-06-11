import { theme } from "galio-framework";
import { StyleSheet, Platform } from "react-native";
import { materialTheme } from "../../constants";
import { HeaderHeight } from "../../constants/utils";
import { width } from "../dossiers/form/utils";

export const styles = StyleSheet.create({
  signup: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  social: {
    width: (theme.SIZES?.BASE || 0) * 3.5,
    height: (theme.SIZES?.BASE || 0) * 3.5,
    borderRadius: (theme.SIZES?.BASE || 0) * 1.75,
    justifyContent: "center",
  },
  input: {
    width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderWidth: 0.7,
    borderColor: "#ccc",
  },
  inputPaper: {
    backgroundColor: "transparent",
  },
  inputUnderline: { borderWidth: 0.7 },
  inputPaperLabel: {
    color: materialTheme.COLORS.PLACEHOLDER,
  },
  inputPaperUnderlineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  container: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
  },
  card: {
    backgroundColor: "#fff",
    paddingHorizontal: width * 0.05,
    borderRadius: 5,
    paddingBottom: width * 0.05,
    marginBottom: width * 0.1,
  },
  signUpBtn: { height: 48, width: "100%", margin: 0 },
});
