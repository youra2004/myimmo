import React, { ReactElement } from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { width } from "../../screens/dossiers/form/utils";
import { Colors } from "../bottomHeader/styles";
import { styles } from "./styles";

const Dialog = ({
  modalVisible,
  handleCloseModal,
  animationType = "slide",
  showHeader = true,
  children,
}: any): ReactElement => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType={animationType}
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={[styles.centeredView, { position: "relative" }]}>
          <View style={[styles.modalView, { position: "relative" }]}>
            {showHeader && (
              <View
                style={{
                  //borderWidth: 2,
                  width: "100%",
                  paddingHorizontal: width * 0.05,
                  alignItems: "flex-end",
                  borderColor: "red",
                  paddingVertical: 10,
                  //paddingTop: 20,
                }}
              >
                <Pressable onPress={handleCloseModal}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.SECONDARY,
                      //paddingTop: 20,
                    }}
                  >
                    Close
                  </Text>
                </Pressable>
              </View>
            )}
            <View>{children}</View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Dialog;
