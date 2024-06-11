import React, { memo, ReactElement, useState } from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import { Block, Button, Text } from "galio-framework";
import { Icon } from "../../../components";
import { extractFullAddress } from "../utils";
import { styles } from "../../dossiers/styles";
import { materialTheme } from "../../../constants";
import { dealTypes } from "../../dossiers/utils";
import { Screens } from "../../../utils/constants";
import CustomFastImage from "../../../components/CustomFastImage";
import FastImage from "react-native-fast-image";
import {
  RectButton,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Colors } from "../../../components/bottomHeader/styles";
import { CardProps } from "../types";
import head from "lodash/head";
import Valuation from "./ValuationHome";
import { isRunningInExpoGo } from "../../../utils/common";

const { width } = Dimensions.get("screen");

const Card = ({
  title,
  _id,
  images,
  dealType,
  property: { location, livingArea },
  cover,
  navigation,
  defaultImageSrc,
  valuationSale,
  valuationRentNet,
  _reset,
  handleEdit,
  handleDelete,
}: CardProps): ReactElement => {
  const coverImage = cover || head(images);
  const uri = coverImage?.mediumUrl;
  const imageSrc = uri ? { uri } : defaultImageSrc;
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  return (
    <View
      style={{
        //width: width * 0.9,
        width,
        flexDirection: "row",
      }}
      key={_id + " " + Math.random()}
    >
      <Block
        card
        space="between"
        style={{
          backgroundColor: "#fff",
          borderBottomWidth: 0,
          //width: width * 0.9,
          width,
          borderWidth: 0,
          borderRadius: 5,
        }}
      >
        <Pressable
          onPress={() => {
            navigation?.navigate(Screens.MAIN, {
              screen: "ShowDossier",
              params: { id: _id },
            });
          }}
        >
          <View
            style={{
              position: "relative",
              flexDirection: "row",
            }}
          >
            {isRunningInExpoGo() ? (
              <Image
                source={imageSrc}
                resizeMode="cover"
                style={[
                  styles.imageBackground,
                  {
                    justifyContent: "flex-start",
                    width: "100%",
                    height: materialTheme.HEIGHT.HOME.IMAGE,
                  },
                ]}
              />
            ) : (
              <FastImage
                source={imageSrc}
                resizeMode="cover"
                style={[
                  styles.imageBackground,
                  {
                    justifyContent: "flex-start",
                    width: "100%",
                    height: materialTheme.HEIGHT.HOME.IMAGE,
                  },
                ]}
              />
            )}
            {(valuationSale || valuationRentNet) && (
              <View
                style={{
                  position: "absolute",
                  top: 15,
                  left: 15,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  padding: 6,
                  paddingHorizontal: 6,
                  borderRadius: 5,
                }}
              >
                <Valuation
                  dealType={dealType}
                  valuationSale={valuationSale}
                  valuationRentNet={valuationRentNet}
                  livingArea={livingArea}
                />
              </View>
            )}
          </View>

          <Block style={{ padding: 15, backgroundColor: "transparent" }}>
            <Block row style={{ alignItems: "center" }}>
              <Text
                size={12}
                style={{
                  padding: 5,
                  backgroundColor: "#e4effb",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  color: "#1871bf",
                }}
              >
                {dealTypes.find((el) => el.value === (dealType || ""))?.label}
              </Text>
              <Text style={styles.homeDossierTitle}>{title}</Text>
            </Block>

            <Block row style={{ alignItems: "center", paddingTop: 10 }}>
              <Icon
                name="location-on"
                color={materialTheme.COLORS.PLACEHOLDER}
                family="MaterialIcons"
                icon="location-on"
                iconSize={18}
                size={20}
                style={[]}
              />
              <Text style={{ fontSize: 15, paddingLeft: 6 }}>
                {extractFullAddress(location)}
              </Text>
            </Block>
          </Block>
        </Pressable>
      </Block>
      <View
        style={{
          width: width / 2,
          flexDirection: "row",
          height: "100%",
        }}
      >
        <RectButton
          style={[
            {
              width: "50%",
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
          onPress={() => {
            handleEdit();
            _reset && _reset();
          }}
        >
          <Icon
            name="edit"
            color={Colors.SECONDARY}
            family="MaterialIcons"
            size={30}
            style={{
              borderRadius: 37,
              padding: 20,
              borderColor: "#fff",
              backgroundColor: "#fff",
              overflow: "hidden",
            }}
          />
        </RectButton>
        <RectButton
          style={[
            {
              width: "50%",
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              //borderWidth: 2,
            },
          ]}
          onPress={async () => {
            setIsDeleteLoading(true);
            await handleDelete();
            setIsDeleteLoading(false);
            _reset && _reset();
          }}
        >
          <Button
            onlyIcon
            icon="delete"
            shadowless
            iconFamily="antdesign"
            iconSize={30}
            loading={isDeleteLoading}
            color={!isDeleteLoading ? "#fff" : "#ccc"}
            iconColor={Colors.ALERT}
            style={{ width: 71, height: 71 }}
          ></Button>
        </RectButton>
      </View>
    </View>
  );
};

export default memo(Card);
