import { StyleSheet } from "react-native";
import { width } from "../../dossiers/form/utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rectButton: {
    flex: 1,
    height: 60,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
  },
  rowAction: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  leftAction: {
    backgroundColor: "#4CAF50",
  },
  rightAction: {
    backgroundColor: "#F44336",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
  },
  buttonDelimiter: {
    height: 1,
    backgroundColor: "#999",
  },
  buttonText: {
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  infoButton: {
    width: 40,
    height: 40,
  },
  infoButtonBorders: {
    borderColor: "#467AFB",
    borderWidth: 2,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
  },
  infoButtonText: {
    color: "#467AFB",
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  swipeableContainer: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: width * 0.05,
    overflow: "hidden",
  },
  animatedView: { borderBottomLeftRadius: 5, borderBottomRightRadius: 5 },
});
