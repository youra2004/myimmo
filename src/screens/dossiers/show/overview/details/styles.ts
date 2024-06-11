import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    borderColor: "green",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    color: "#3d454d",
    fontSize: 25,
  },
  address: { fontSize: 15, paddingLeft: 6, color: "#999" },
  indicatorsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#ccc",
    padding: 20,
    paddingHorizontal: 35,
    marginTop: "auto",
    marginBottom: "auto",
    position: "relative",
  },
  indicators: {
    alignItems: "center",
    justifyContent: "center",
  },
  amountBlock: { flexDirection: "row", alignItems: "flex-end" },
  amount: { fontSize: 30 },
  divider: {
    height: "100%",
    width: 0.4,
    backgroundColor: "#ccc",
    position: "absolute",
  },
  valuationBlock: { marginTop: "auto", marginBottom: "auto" },
  valuationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  valuationItemTitle: {
    fontSize: 15,
    color: "#999",
    textTransform: "uppercase",
  },
  valuationItemAmount: {
    fontWeight: "bold",
    fontSize: 19,
    color: "#38454f",
  },
});
