import React, { useState, ReactElement, memo } from "react";
import { Block, Button, Text } from "galio-framework";
import { styles } from "../styles";
import { View, ActivityIndicator, Pressable } from "react-native";
import { pickImage, width } from "./utils";
import { ImagesFormProps } from "./types";
import { Colors } from "../../../components/bottomHeader/styles";
import CarouselWithPaging from "../show/carouselBlock/carousel";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "../../../components";

const ImagesForm = ({
  images,
  setFieldValue,
  cover,
}: ImagesFormProps): ReactElement => {
  console.log("ImagesForm rendered");
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState<string[]>([]);

  const handleRemoveImage = (selectedId: string) =>
    setFieldValue(
      "images",
      images.filter(({ _id }) => _id !== selectedId),
      false
    );

  const handleSetCover = (selectedId: string) =>
    setFieldValue(
      "cover",
      images.find(({ _id }) => _id === selectedId)
    );

  const isCover = (id: string): Boolean => cover?._id === id;

  const renderAction = (id: string): ReactElement => (
    <View style={{ flexDirection: "row" }}>
      {!isCover(id) && (
        <Button
          shadowColor={true}
          shadowless
          color={Colors.BLACK}
          iconSize={30}
          onPress={() => {
            handleSetCover(id);
          }}
          style={{
            width: 53,
            height: 40,
          }}
        >
          Main
        </Button>
      )}
      <Button
        onlyIcon
        shadowless
        shadowColor={true}
        icon="delete"
        iconFamily="MaterialIcons"
        color="red"
        iconSize={30}
        onPress={() => {
          handleRemoveImage(id);
        }}
        style={{
          width: 40,
          height: 40,
        }}
      ></Button>
    </View>
  );

  return (
    <React.Fragment>
      <Block style={{ width: width * 0.9, marginTop: 60, marginBottom: 20 }}>
        <Pressable
          style={{
            alignItems: "center",
            backgroundColor: "#fff",
            paddingTop: 20,
            borderRadius: 5,
          }}
          onPress={pickImage({
            setImageIsLoading,
            setImageErrors,
            setFieldValue,
            images,
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
            Upload photos
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
            Photos must be less than{" "}
            <Text style={{ fontFamily: "poppinsBold", color: Colors.BLACK }}>
              25 MB
            </Text>{" "}
            in size
          </Text>
          <Button
            shadowless
            iconSize={19}
            style={[styles.pickerButton, { marginBottom: -20 }]}
            color={Colors.BLACK}
            disabled
          >
            <Text style={{ fontFamily: "poppinsMedium", color: "#fff" }}>
              Upload
            </Text>
          </Button>
        </Pressable>
      </Block>
      {images?.length > 0 && (
        <View style={{ width: width * 0.9, paddingTop: 20 }}>
          <CarouselWithPaging
            images={images}
            style={{ height: 300 }}
            width={width * 0.9}
            renderAction={renderAction}
          />
        </View>
      )}
      {imageIsLoading && (
        <Block style={styles.activityIndicator}>
          <ActivityIndicator size="large" color={Colors.BLACK} />
        </Block>
      )}
      {imageErrors.map((error, index) => (
        <View key={index + " " + error}>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      ))}
    </React.Fragment>
  );
};

export default memo(ImagesForm);
