import React, { useState, ReactElement, useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Icon } from "galio-framework";
import { materialTheme } from "../../../constants";
import {
  appartmentSubtypes,
  houseSubtypes,
  energyLabels,
  dealTypes,
} from "../utils";
import { styles } from "../styles";
import { HelperText, Divider } from "react-native-paper";
import Dialog from "../../../components/modal";
import DialogContent from "./DialogContent";
import { DossierDropdown, DossierDropdownMode } from "./types";
import { DossierTypes } from "../../../utils/constants";
import { DossierConfigMappedItem, DossierSubtype } from "../types";
import { FormContext } from "../../../context/Form";

const Dropdowns = ({
  values,
  touched,
  status,
  errors,
  setFieldValue,
}: any): ReactElement => {
  const [modal, setModal] = useState<DossierDropdown>({
    visible: false,
    mode: null,
  });

  const formContext = useContext(FormContext);
  const dossierConfig = formContext.dossierConfig;

  const appartmentSubtypes = dossierConfig?.subType.apartment;
  const houseSubtypes = dossierConfig?.subType.house;
  const energyLabels = dossierConfig?.property.energyLabel || [];
  const dealTypes = dossierConfig?.dealType.type || [];

  const DossierTypeDict: Record<DossierTypes, DossierConfigMappedItem[]> = {
    [DossierTypes.APARTMENT]: appartmentSubtypes || [],
    [DossierTypes.HOUSE]: houseSubtypes || [],
    [DossierTypes.MULTI_FAMILY_HOUSE]: [],
  };

  const handleCloseModal = (): void => setModal({ visible: false, mode: null });
  const handleOpenModal = (mode: DossierDropdownMode): void =>
    setModal({ visible: true, mode });

  return (
    <View style={[styles.card, { paddingBottom: 5, position: "relative" }]}>
      <TouchableOpacity
        onPress={() => {
          handleOpenModal("dealType");
        }}
      >
        <View
          style={[
            {
              marginTop: 15,
              justifyContent: "space-between",
              flexDirection: "row",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon
              name="vpn-key"
              color="#000"
              family="MaterialIcons"
              size={20}
              style={styles.pickerLabelIcon}
            />
            <Text style={styles.pickerLabelText}>
              Deal type<Text color="red">*</Text>
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 17,
                color: materialTheme.COLORS.PLACEHOLDER,
                paddingRight: 4,
              }}
            >
              {
                dealTypes.find((el) => el.value === values.dealType || "")
                  ?.label
              }
            </Text>
            <Icon
              name="right"
              color={materialTheme.COLORS.PLACEHOLDER}
              family="AntDesign"
              size={20}
              style={[]}
            />
          </View>
        </View>
      </TouchableOpacity>
      {touched?.dealType && (status?.errors.dealType || errors?.dealType) && (
        <HelperText
          style={{ borderWidth: 2 }}
          type="error"
          visible={
            touched?.dealType && (status?.errors.dealType || errors?.dealType)
          }
        >
          {touched?.dealType && (status?.errors.dealType || errors?.dealType)}
        </HelperText>
      )}
      <Divider />
      <TouchableOpacity
        onPress={() => {
          handleOpenModal("property.propertyType.subcode");
        }}
      >
        <View
          style={[
            {
              marginTop: 15,
              justifyContent: "space-between",
              flexDirection: "row",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon
              name="business"
              color="#000"
              family="MaterialIcons"
              size={20}
              style={styles.pickerLabelIcon}
            />
            <Text style={styles.pickerLabelText}>Subtype</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 17,
                color: materialTheme.COLORS.PLACEHOLDER,
                paddingRight: 4,
              }}
            >
              {appartmentSubtypes?.find(
                (el) => el.value === values.property?.propertyType.subcode || ""
              )?.label || "Choose one"}
            </Text>
            <Icon
              name="right"
              color={materialTheme.COLORS.PLACEHOLDER}
              family="AntDesign"
              size={20}
              style={[]}
            />
          </View>
        </View>
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity
        onPress={() => {
          handleOpenModal("property.energyLabel");
        }}
      >
        <View
          style={[
            {
              marginTop: 15,
              justifyContent: "space-between",
              flexDirection: "row",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon
              name="battery-charging-full"
              color="#000"
              family="MaterialIcons"
              size={20}
              style={styles.pickerLabelIcon}
            />
            <Text style={styles.pickerLabelText}>Energy label</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 17,
                color: materialTheme.COLORS.PLACEHOLDER,
                paddingRight: 4,
              }}
            >
              {energyLabels.find(
                (el) => el.value === values.property.energyLabel || ""
              )?.label || "Choose one"}
            </Text>
            <Icon
              name="right"
              color={materialTheme.COLORS.PLACEHOLDER}
              family="AntDesign"
              size={20}
              style={[]}
            />
          </View>
        </View>
      </TouchableOpacity>

      <View style={{ position: "absolute" }}>
        <Dialog
          modalVisible={modal.visible}
          handleCloseModal={handleCloseModal}
          showHeader={true}
        >
          {modal.mode === "dealType" && (
            <DialogContent
              items={dealTypes}
              value={values.dealType}
              onPress={(value) => {
                setFieldValue("dealType", value, false);
              }}
            />
          )}
          {modal.mode === "property.propertyType.subcode" && (
            <DialogContent
              items={
                DossierTypeDict[
                  values.property.propertyType.code as DossierTypes
                ]
              }
              value={values.property.propertyType.subcode}
              onPress={(value) => {
                setFieldValue("property.propertyType.subcode", value, false);
              }}
            />
          )}
          {modal.mode === "property.energyLabel" && (
            <DialogContent
              items={energyLabels}
              value={values.property.energyLabel}
              onPress={(value) => {
                setFieldValue("property.energyLabel", value, false);
              }}
            />
          )}
        </Dialog>
      </View>
    </View>
  );
};

export default Dropdowns;
