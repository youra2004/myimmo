import { createStackNavigator } from "@react-navigation/stack";
import React, { ReactElement } from "react";
import { Screens } from "../../../utils/constants";
import MainStackScreen from "./MainScreen";
import ModalStackScreen from "./ModalScreen";

const MainStack = createStackNavigator();

export const WrapperStackScreen = (): ReactElement => {
  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
    >
      <MainStack.Screen name={Screens.MAIN} component={MainStackScreen} />
      <MainStack.Screen name={Screens.MODAL} component={ModalStackScreen} />
    </MainStack.Navigator>
  );
};

export default WrapperStackScreen;
