import React, { useState, ReactElement, memo } from "react";
import { Block, Button, Text } from "galio-framework";
import { HelperText } from "react-native-paper";
import { styles } from "../styles";
import { View, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { pickDocument } from "./utils";
import { AttachmentsFormProps } from "./types";
import { Colors } from "../../../components/bottomHeader/styles";
import { Icon } from "../../../components";

const AttachmentsForm = ({
  attachments,
  setFieldValue,
}: AttachmentsFormProps): ReactElement => {
  console.log("AttachmentsForm rendered");
  const [documentIsLoading, setDocumentIsLoading] = useState(false);
  const [documentError, setDocumentError] = useState("");

  const handleRemoveDocument = (id: string) => () => {
    const auxAttachments = attachments.filter((el) => el._id !== id);
    setFieldValue("attachments", auxAttachments);
    setDocumentError("");
  };

  return (
    <Block
      style={[styles.attachmentsContainer, { marginTop: 60, marginBottom: 20 }]}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          paddingTop: 20,
          borderRadius: 5,
        }}
        onPress={pickDocument({
          setDocumentIsLoading,
          setDocumentError,
          setFieldValue,
          attachments,
        })}
      >
        <Icon
          name="upload"
          color={Colors.BLACK}
          family="AntDesign"
          iconSize={18}
          size={22}
        />
        <Text style={{ fontFamily: "poppinsBold", paddingVertical: 10 }}>
          Upload attachments
        </Text>
        <Text
          style={{
            fontFamily: "poppinsLight",
            color: "#999",
            paddingBottom: 10,
            textAlign: "center",
            lineHeight: 25,
          }}
        >
          File must be less then{" "}
          <Text style={{ fontFamily: "poppinsBold", color: Colors.BLACK }}>
            25 MB
          </Text>
          {"\n"}
          File must be in{" "}
          <Text style={{ fontFamily: "poppinsBold", color: Colors.BLACK }}>
            .pdf
          </Text>{" "}
          format
        </Text>
        <Button
          shadowless
          iconSize={19}
          style={[styles.pickerButton, { marginBottom: -20, zIndex: -1 }]}
          color={Colors.BLACK}
          disabled
        >
          <Text style={{ fontFamily: "poppinsMedium", color: "#fff" }}>
            Upload
          </Text>
        </Button>
      </TouchableOpacity>

      <View style={{ paddingTop: 24 }}>
        {attachments.map(({ originalName, _id }) => {
          return (
            <View key={_id} style={[styles.attachmentContainer, {}]}>
              <Image
                style={{ width: 15, height: 18, marginRight: 10 }}
                source={require("../../../assets/icons/PDF_file_icon.png")}
              />
              <Text style={{ width: "80%" }}>{originalName}</Text>

              <Button
                disabled={documentIsLoading}
                onlyIcon
                shadowless
                icon="delete"
                iconFamily="MaterialIcons"
                color="red"
                iconSize={30}
                onPress={handleRemoveDocument(_id)}
                style={[styles.attachmentBtn]}
              ></Button>
            </View>
          );
        })}
      </View>
      {documentIsLoading && (
        <Block style={styles.activityIndicator}>
          <ActivityIndicator size="large" color={Colors.BLACK} />
        </Block>
      )}
      <HelperText type="error" visible={Boolean(documentError)}>
        {documentError}
      </HelperText>
    </Block>
  );
};

export default memo(AttachmentsForm);
