import React, { ReactNode } from "react";
import { StyleProp, ViewStyle, ViewProps, View } from "react-native";
import type { AnimateProps } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { SBImageItem } from "./SBImageItem";
import { DossierImage } from "../../../types";

interface Props extends AnimateProps<ViewProps> {
  style?: StyleProp<ViewStyle>;
  index: number;
  pretty?: boolean;
  item: DossierImage;
  renderAction?: (id: string) => ReactNode;
  cached?: boolean;
}

export const SBItem: React.FC<Props> = (props) => {
  const {
    style,
    index,
    item,
    pretty,
    renderAction,
    testID,
    cached,
    ...animatedViewProps
  } = props;

  return (
    <Animated.View
      testID={testID}
      style={{ flex: 1, position: "relative" }}
      {...animatedViewProps}
    >
      <SBImageItem style={style} index={index} item={item} cached={cached} />
      {!!renderAction && (
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          {renderAction(item._id)}
        </View>
      )}
    </Animated.View>
  );
};
