import { useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("screen");

const useShowDimensions = () => {
  const { top } = useSafeAreaInsets();
  const screenHeightWitoutStatusBar = height - top;
  const firstBlockHeight = screenHeightWitoutStatusBar * 0.88;
  const firstBlockimageHeight = firstBlockHeight * 0.59;
  const firstBlockimagePadding = width * 0.025;
  const firstBlockRestHeight =
    firstBlockHeight - firstBlockimagePadding - firstBlockimageHeight;
  const secondBlockHeight = screenHeightWitoutStatusBar - firstBlockHeight;

  return {
    height,
    width,
    screenHeightWitoutStatusBar,
    firstBlockHeight,
    firstBlockimageHeight,
    firstBlockimagePadding,
    firstBlockRestHeight,
    secondBlockHeight,
  };
};

export default useShowDimensions;
