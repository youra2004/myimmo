import { StyleSheet } from "react-native";
import { Colors } from "../../../components/bottomHeader/styles";
import { width } from "../../dossiers/form/utils";

export const IMAGE_HEIGHT = 100;

export const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between" },
  back: { paddingLeft: 5, fontSize: 16, fontWeight: "bold" },
  imageContainer: { alignItems: "center" },
  image: { width: 100, borderRadius: 100, height: IMAGE_HEIGHT },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadBtn: { fontSize: 18, color: Colors.SECONDARY, paddingVertical: 12 },
  submitContainer: { minWidth: 55 },
  submitBtn: { display: "flex", flexDirection: "row", alignItems: "center" },
  submitBtnText: {
    paddingRight: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  submitLoader: { height: 20 },
  signOutBtn: {
    height: 45,
    width: width * 0.9,
    borderRadius: 5,
    backgroundColor: "#fff",
    padding: 0,
  },
  verifiedIcon: { marginBottom: -10 },
});
