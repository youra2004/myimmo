import * as React from "react";
import { Platform, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import type { ScaledSize } from "react-native";
import { Dimensions } from "react-native";
import { SBItem } from "./SBItem";
import { DossierImage } from "../../../types";

export const window: ScaledSize =
  Platform.OS === "web"
    ? {
        ...Dimensions.get("window"),
        width: 375,
      }
    : Dimensions.get("window");

const CarouselWithPaging = ({
  images,
  style,
  width,
  renderAction,
}: {
  images: DossierImage[];
  style: any;
  width: number;
  renderAction?: (id: string) => React.ReactNode;
}) => {
  const progressValue = useSharedValue<number>(0);
  const multiple = images.length > 1;

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Carousel
        width={width}
        style={style}
        loop
        pagingEnabled={true}
        snapEnabled={true}
        autoPlay={false}
        autoPlayInterval={1500}
        enabled={multiple}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={images}
        renderItem={({ index, item }) => (
          <SBItem index={index} item={item} renderAction={renderAction} />
        )}
      />
      {!!progressValue && multiple && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: 100,
            alignSelf: "center",
            marginTop: -30,
            marginBottom: 30,
          }}
        >
          {images.map((_, index) => {
            return (
              <PaginationItem
                backgroundColor="#000"
                animValue={progressValue}
                index={index}
                key={index}
                isRotate={false}
                length={images.length}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const PaginationItem: React.FC<{
  index: number;
  backgroundColor: string;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
}> = (props) => {
  const { animValue, index, length, backgroundColor, isRotate } = props;
  const width = 8;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: "white",
        width,
        height: width,
        marginHorizontal: 5,
        borderRadius: 50,
        overflow: "hidden",
        transform: [
          {
            rotateZ: isRotate ? "90deg" : "0deg",
          },
        ],
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default CarouselWithPaging;
