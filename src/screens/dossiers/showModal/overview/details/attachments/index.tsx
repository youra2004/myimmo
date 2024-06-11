import React, { ReactElement, useState } from "react";
import { Text, View, Image } from "react-native";
import { Block } from "galio-framework";
import { styles } from "../../../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import Dialog from "../../../../../../components/modal";
import { PDF_VIEW_BASE_URL } from "../../../utils";
import PdfReader from "./PdfReader";
import { Dossier } from "../../../../types";
import { isRunningInExpoGo } from "../../../../../../utils/common";
import ReactNativePdf from "./ReactNativePdf";

const Attachments = ({ dossier }: { dossier: Dossier }): ReactElement => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfReaderUrl, setPdfReaderUrl] = useState("");
  const [pdfReadercacheKey] = useState("");
  const handleCloseModal = (): void => setModalVisible(false);
  const handleOpenModal = (): void => setModalVisible(true);
  return (
    <>
      {Boolean(dossier.attachments.length) && (
        <>
          <View>
            <Text style={[styles.showSubtitle]}>Attachments</Text>
          </View>
          <View
            style={[
              styles.paddingHorizontal5,
              styles.showValuationContainer,
              styles.paddingVerticalCard,
              { borderRadius: 5, marginBottom: 50 },
            ]}
          >
            <Block>
              {dossier.attachments.map(
                ({ originalName, _id, originalUrl }, index) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.showFieldInfoBlock,
                        { flexDirection: "row" },
                        index === 0 && { paddingTop: 0 },
                      ]}
                      onPress={() => {
                        setPdfReaderUrl(originalUrl);
                        handleOpenModal();
                      }}
                      key={_id}
                    >
                      <Image
                        style={{ width: 15, height: 18, marginRight: 10 }}
                        source={require("../../../../../../assets/icons/PDF_file_icon.png")}
                      />

                      <Text style={styles.showFieldInfoText}>
                        {originalName}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              )}
            </Block>
          </View>
          <Dialog
            modalVisible={modalVisible}
            handleCloseModal={handleCloseModal}
            animationType="fade"
          >
            {isRunningInExpoGo() ? (
              <PdfReader
                uri={`${PDF_VIEW_BASE_URL}${pdfReaderUrl}`}
                cacheKey={pdfReadercacheKey}
              />
            ) : (
              <ReactNativePdf source={{ uri: pdfReaderUrl }} />
              //<></>
            )}
          </Dialog>
        </>
      )}
    </>
  );
};

export default Attachments;
