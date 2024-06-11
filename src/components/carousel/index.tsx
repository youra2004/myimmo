import { Button } from "galio-framework";
import React, { ReactElement, useEffect, useState } from "react";
import { View, Image } from "react-native";
import FastImage from "react-native-fast-image";
import Carousel from "react-native-reanimated-carousel";
import { DossierImage } from "../../screens/dossiers/types";
import { styles, width } from "./styles";
import { CarouselCustomProps, LoadingDict } from "./types";

const CarouselCustom = ({
  images,
  callback,
}: CarouselCustomProps): ReactElement => {
  const [loadingDict, setLoadingDict] = useState<LoadingDict>({});

  const CarouselCardItem =
    (handleOnPress: (index: number) => void) =>
    ({ item, index }: any) => {
      return (
        <View style={[styles.container, { position: "relative" }]} key={index}>
          <Image source={{ uri: item.url }} style={styles.image} />
          <Button
            onlyIcon
            shadowless
            icon="delete"
            iconFamily="MaterialIcons"
            color="red"
            iconSize={30}
            onPress={() => {
              handleOnPress(index);
            }}
            style={{
              width: 40,
              height: 40,
              position: "absolute",
              top: 0,
              right: 15,
            }}
          ></Button>
        </View>
      );
    };

  return (
    <View>
      <Carousel
        loop={true}
        width={width}
        height={width / 2}
        autoPlay={false}
        data={images}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={CarouselCardItem(callback)}
        mode={images?.length > 1 ? "horizontal-stack" : undefined}
        enabled={images?.length > 1}
        modeConfig={{
          snapDirection: "left",
          moveSize: 400,
          stackInterval: 30,
          scaleInterval: 0.08,
          rotateZDeg: 135,
        }}
      />
    </View>
  );
};

export default CarouselCustom;
