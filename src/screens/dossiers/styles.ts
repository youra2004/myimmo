import { Dimensions, Platform, StyleSheet } from "react-native";
import { theme } from "galio-framework";
import { HeaderHeight } from "../../constants/utils";
import { materialTheme } from "../../constants";

const { width } = Dimensions.get("window");

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export const styles = StyleSheet.create({
  container: { flex: 1 },
  homeContainer: { backgroundColor: "#fff" },
  paddingHorizontal5: { paddingHorizontal: materialTheme.PADDING.HORIZONTAL },
  paddingVerticalCard: {
    paddingTop: 20,
    paddingBottom: 15,
  },
  pr0: {
    paddingRight: 0,
  },
  pl0: {
    paddingLeft: 0,
  },
  pt0: {
    paddingTop: 0,
  },
  pb0: {
    paddingBottom: 0,
  },
  mrAuto: {
    marginRight: "auto",
  },
  mlAuto: {
    marginLeft: "auto",
  },
  mtAuto: {
    marginTop: "auto",
  },
  mbAuto: {
    marginBottom: "auto",
  },
  fullWidth: {
    width,
  },
  signup: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
  },
  social: {
    width: (theme.SIZES?.BASE || 0) * 3.5,
    height: (theme.SIZES?.BASE || 0) * 3.5,
    borderRadius: (theme.SIZES?.BASE || 0) * 1.75,
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  input: {
    width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: "white",
  },
  typesBlock: {
    width: width * 0.9,
    justifyContent: "space-between",
    marginTop: -30,
    marginBottom: 15,
    z: 111,
  },
  typesButtons: {
    flexShrink: 1,
    margin: 0,
    width: "100%",
    borderColor: materialTheme.COLORS.BUTTON_COLOR,
    borderWidth: 0,
    //borderRadius: 5,
  },
  selected: {
    borderWidth: 2,
  },
  pickerLabel: {
    width: width * 0.9,
    color: materialTheme.COLORS.PLACEHOLDER,
    marginBottom: -15,
  },
  pickerLabelText: {
    paddingTop: 2,
    color: "#000",
    fontSize: 12,
    paddingBottom: 10,
  },
  pickerLabelIcon: {
    //paddingLeft: 17,
    paddingRight: 17,
  },
  picker: {
    //width: width * 0.93,
    width: width * 0.8,
  },
  checkboxBlock: {
    width: width * 0.9,
    paddingTop: 10,
    paddingBottom: 10,
  },
  ratingBlock: {
    width: width * 0.9,
  },
  ratingBlockTitle: {
    color: materialTheme.COLORS.PLACEHOLDER,
  },
  ratingBlockSubTitle: {
    paddingBottom: 3,
    paddingTop: 10,
  },
  ratingContainerStyle2: {
    flexDirection: "row-reverse",
    wordBreak: "break-word",
    flexWrap: "wrap",
  },
  checkboxText: { color: materialTheme.COLORS.PLACEHOLDER, paddingLeft: 16 },
  checkbox: { marginRight: "18%", paddingLeft: 14 },
  //rich-editor
  richContainer: { marginBottom: 100 },
  richBar: {
    height: 50,
    width: "100%",
    backgroundColor: "#F5FCFF",
  },
  tib: {
    textAlign: "center",
    color: "#515156",
  },
  dropDownPickerBlock: {
    width: width * 0.9,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    zIndex: 2,
  },
  dropDownPickerContainer: { width: width * 0.9 },
  googlePlacesLabelContainer: {
    width: width * 0.9,
    color: materialTheme.COLORS.PLACEHOLDER,
    marginTop: 15,
  },
  googlePlacesContainer: {
    width: width * 0.9,
    backgroundColor: "transparent",
    zIndex: 222,
  },
  googlePlacesAutocomplete: {
    width: width * 0.9,
  },
  disableScrollingWarning: {
    width: "100%",
  },
  activityIndicator: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  homeImageContainer: {
    width: width * 0.9,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  homeImage: {
    width: width * 0.4,
    //flex: 500,
  },
  imageBackground: {
    width: width * 0.9,
    // borderWidth: 2,
    // borderColor: "red",
  },
  showSubtitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 30,
    paddingBottom: materialTheme.PADDING.BOTTOM.SUB_TITLE,
    color: "#3d454d",
  },
  showImage: {
    width: "100%",
    height: materialTheme.HEIGHT.SHOW.IMAGE,
    borderRadius: materialTheme.BORDER_RADIUS.SHOW.IMAGE,
  },
  showFieldInfoBlock: { alignItems: "center", paddingTop: 15 },
  showFieldInfoText: { fontSize: 15, paddingLeft: 8 },
  showTabsBlock: { width: width * 0.9 },
  showTabBlock: {
    width: width,
  },
  showTab: {
    backgroundColor: "#38454f",
    alignItems: "center",
    width: width / 4,
    height: 85,
    paddingTop: 7,
    paddingBottom: 7,
  },
  showTabHighlighted: {
    backgroundColor: "#3f93e2",
  },
  showTabText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 10,
    paddingTop: 5,
  },
  showRatingBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  showRatingContainerStyle: {
    flexDirection: "row-reverse",
    wordBreak: "break-word",
    //justifyContent: "flex-start",
  },
  bordered: {
    borderColor: "red",
    borderWidth: 2,
  },
  inputPaper: {
    //width: width * 0.9,
    backgroundColor: "transparent",
  },
  inputPaperLabel: {
    color: materialTheme.COLORS.PLACEHOLDER,
  },
  inputPaperUnderlineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  inputPaperIcon: {
    marginBottom: -15,
  },
  submitDossierBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    borderRadius: 20,
    width: 120,
  },
  submitDossierBtnText: {
    color: "white",
    fontSize: 19,
  },
  homeCreateButton: { position: "absolute", bottom: 12, right: 10 },
  pickerButton: {
    paddingLeft: 20,
    paddingRight: 20,
    //borderRadius: 30,
    marginLeft: 0,
    height: 48,
  },
  attachmentsContainer: { width: width * 0.9 },
  attachmentsTitle: { color: "#000", paddingTop: 60 },
  attachmentContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  attachmentImage: {
    height: width * 0.23,
    borderColor: "green",
    width: width * 0.35,
  },
  attachmentBtn: { width: 40, height: 40, margin: 0 },
  attachmentBtnDownload: { marginLeft: "auto" },
  attachmentBtnDelete: { marginLeft: 12 },
  homeDossierTitle: {
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 10,
    color: "#38454f",
    flex: 1,
    flexWrap: "wrap",
  },
  homeValuationContainer: {
    flexDirection: "row",
  },
  homeValuationItemContainer: {
    //marginRight: 35,
    paddingTop: 20,
    paddingBottom: 15,
  },
  homePriceTitle: {
    paddingBottom: 5,
  },
  homePriceText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#38454f",
    flex: 1,
    flexWrap: "wrap",
  },
  homePricePerM2: { color: "#777" },
  showRentBtn: {
    flexShrink: 1,
    margin: 0,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 0,
    height: 30,
  },
  showRentBtnLeft: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  showRentBtnRight: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  showSaleAndRentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  showValuationContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  formRatingsRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
  },
  formRatingsColumn: {
    flexDirection: "row",
    alignItems: "center",
    //borderWidth: 1,
  },
  formRatingsColumnLeft: {
    width: "36%",
  },
  formRatingsColumnRight: {
    display: "flex",
    flexDirection: "row",
    width: "64%",
    //wordBreak: "break-word",
    flexWrap: "wrap",
  },
  formRatingsLabelIcon: {
    paddingRight: 10,
  },
  formRatingsStarContainerStyle: {
    //marginRight: 8,
  },
  formRatingsDefaultText: {
    marginLeft: -15,
    fontSize: 12,
  },
  flatListLoader: { marginVertical: 16, alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    paddingHorizontal: width * 0.05,
    borderRadius: 5,
    paddingBottom: width * 0.05,
    marginBottom: width * 0.1,
  },
  switchersCard: {
    backgroundColor: "#fff",
    paddingHorizontal: width * 0.05,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: width * 0.1,
  },
  ratingCard: {
    backgroundColor: "#fff",
    padding: width * 0.05,
    borderRadius: 5,
    marginBottom: width * 0.1,
    paddingLeft: width * 0.03,
    paddingRight: 0,
  },
  uploadCardContainer: {},
});

export const styles2 = StyleSheet.create({});
