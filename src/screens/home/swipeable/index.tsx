import React, { useState } from "react";
import { View, Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { styles } from "./styles";
import { SwipeableProps } from "../types";

const RATIO = 3;

const Swipeable = ({ children, ...props }: SwipeableProps) => {
  const [_width, setWidth] = useState(0);
  const [_dragX] = useState(new Animated.Value(0));
  const _transX = _dragX.interpolate({
    inputRange: [0, RATIO],
    outputRange: [0, 1],
  });

  const _showRightAction = _dragX.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [1, 0, 0],
  });

  const _onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: _dragX,
        },
      },
    ],
    { useNativeDriver: true }
  );
  const _onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const dragToss = 0.05;
      const endOffsetX =
        event.nativeEvent.translationX + dragToss * event.nativeEvent.velocityX;

      let toValue = 0;

      if (endOffsetX > _width / 2) {
        // prevent left shipe
        toValue = 0;
      } else if (endOffsetX < -_width / 2) {
        toValue = (-_width / 2) * RATIO;
      }

      Animated.spring(_dragX, {
        velocity: event.nativeEvent.velocityX,
        tension: 15,
        friction: 5,
        toValue,
        useNativeDriver: true,
      }).start();
    }
  };

  const _onLayout = (event: any) => {
    setWidth(event.nativeEvent.layout.width);
  };
  const _reset = () => {
    Animated.spring(_dragX, {
      toValue: 0,
      useNativeDriver: true,
      tension: 15,
      friction: 5,
    }).start();
  };

  return (
    <>
      <View style={styles.swipeableContainer}>
        <Animated.View></Animated.View>
        <Animated.View
          style={[
            styles.rowAction,
            {
              opacity: _showRightAction,
            },
          ]}
        ></Animated.View>
        <PanGestureHandler
          {...props}
          activeOffsetX={[-10, 10]}
          onGestureEvent={_onGestureEvent}
          onHandlerStateChange={_onHandlerStateChange}
        >
          <Animated.View
            style={[
              styles.animatedView,
              {
                transform: [
                  {
                    translateX: _transX,
                  },
                ],
              },
            ]}
            onLayout={_onLayout}
          >
            {React.cloneElement(children, { _reset })}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </>
  );
};

export default Swipeable;
