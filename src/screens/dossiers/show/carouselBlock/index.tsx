import React, { useState, ReactElement } from "react";
import { View, ActivityIndicator, Text, Image } from "react-native";
import { styles } from "../../styles";
import { Dossier } from "../../types";
import { IconButton } from "react-native-paper";
import { Screens } from "../../../../utils/constants";
import { showPrice } from "../../../home/utils";
import { Colors } from "../../../../components/bottomHeader/styles";
import useShowDimensions from "../../../../hooks/useShowDimensions";
import { Images } from "../../../../constants";
import { styles as childStyles } from "../styles";
import CarouselWithPaging from "./carousel";
import FastImage from "react-native-fast-image";
import { isRunningInExpoGo } from "../../../../utils/common";

const CarouselBlock = ({
  navigation,
  dossier,
}: {
  navigation: any;
  dossier: Dossier;
}): ReactElement => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { width, firstBlockimageHeight, firstBlockimagePadding } =
    useShowDimensions();

  return (
    <View
      style={{
        position: "relative",
        padding: firstBlockimagePadding,
        paddingTop: 0,
      }}
    >
      {Number(dossier?.images?.length) > 0 ? (
        <CarouselWithPaging
          images={dossier?.images.sort((el) => {
            return el._id === dossier.cover?._id ? -1 : 1;
          })}
          style={childStyles.carousel}
          width={width - 2 * firstBlockimagePadding}
        />
      ) : (
        <>
          {isRunningInExpoGo() ? (
            <Image
              onLoadEnd={() => {
                setIsImageLoading(false);
              }}
              onLoadStart={() => {
                setIsImageLoading(true);
              }}
              source={Images.Home.Default}
              style={[styles.showImage, { height: firstBlockimageHeight }]}
            />
          ) : (
            <FastImage
              onLoadEnd={() => {
                setIsImageLoading(false);
              }}
              onLoadStart={() => {
                setIsImageLoading(true);
              }}
              source={Images.Home.Default}
              style={[styles.showImage, { height: firstBlockimageHeight }]}
            />
          )}
        </>
      )}

      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: width,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: width * 0.075,
          paddingHorizontal: width * 0.05,
          zIndex: 9999999999,
        }}
      >
        <IconButton
          icon="arrow-left"
          iconColor="#fff"
          size={20}
          onPress={() => {
            navigation.goBack();
          }}
          style={{ borderRadius: 5, margin: 0 }}
          containerColor={Colors.MAIN}
        />
        {(dossier.valuationSale || dossier.valuationRentNet) && (
          <View
            style={{
              padding: 10,
              borderRadius: 5,
              backgroundColor: "#fff",
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {dossier.dealType === "sale" &&
                dossier.valuationSale &&
                showPrice(dossier.valuationSale.value)}

              {/* `${showPrice(dossier.valuationSale.value)}€` */}
              {dossier.dealType === "rent" &&
                dossier.valuationRentNet &&
                showPrice(dossier.valuationRentNet.value)}

              {/* `${showRent(dossier.valuationRentNet.value)}€` */}
              {dossier.dealType === undefined &&
                dossier.valuationSale &&
                showPrice(dossier.valuationSale.value)}

              {/* `${showPrice(dossier.valuationSale.value)}€` */}
            </Text>
          </View>
        )}
        <IconButton
          icon="pencil"
          iconColor="#fff"
          size={20}
          onPress={() => {
            navigation?.navigate(Screens.MAIN, {
              screen: "EditDossier",
              params: { id: dossier._id },
            });
          }}
          style={{ borderRadius: 5, margin: 0 }}
          containerColor={Colors.MAIN}
        />
      </View>
      {isImageLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999999,
          }}
        >
          <ActivityIndicator size="small" color={Colors.BLACK} />
        </View>
      )}
    </View>
  );
};

export default CarouselBlock;
