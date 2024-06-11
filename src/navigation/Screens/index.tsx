import React, { useState, useContext, ReactElement } from "react";
import BottomHeader from "../../components/bottomHeader";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../../context/Auth";
import WrapperStackScreen from "./wrapperScreen";
import { getActiveRouteName } from "../../utils/screens";
import NoAuthStackScreen from "./NoAuthScreen";

const RootStack = createStackNavigator();

export const AppStack = (): ReactElement => {
  const { state } = useContext(AuthContext);
  const [currentRoute, setCurrentRoute] = useState("");
  return (
    <>
      {state.userToken == null ? (
        <RootStack.Navigator
          screenOptions={{ headerShown: false, presentation: "card" }}
        >
          <RootStack.Screen name="NoAuth" component={NoAuthStackScreen} />
        </RootStack.Navigator>
      ) : (
        <RootStack.Navigator screenOptions={{ presentation: "card" }}>
          <RootStack.Screen
            name="Wrapper"
            component={WrapperStackScreen}
            listeners={({ route }) => ({
              state: () => {
                setCurrentRoute(getActiveRouteName(route));
              },
            })}
            options={{
              header: ({ navigation, route }) => (
                <>
                  <BottomHeader
                    navigation={navigation}
                    route={route}
                    currentRoute={currentRoute}
                  />
                </>
              ),
            }}
          />
        </RootStack.Navigator>
      )}
    </>
  );
};

export default AppStack;
