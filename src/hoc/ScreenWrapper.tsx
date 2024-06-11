import React, { ReactElement, useContext } from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  StatusBarProps,
} from "react-native";
import ThemeProvider, { ThemeContext } from "../context/Theme";

const CustomStatusBar = ({
  backgroundColor: backgroundColorProp,
  ...props
}: StatusBarProps): ReactElement => {
  const {
    state: { statusBarBackground },
  } = useContext(ThemeContext);
  const backgroundColor = backgroundColorProp || statusBarBackground;

  return (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
};

const ScreenWrapper = ({
  backgroundColor,
  children,
}: {
  backgroundColor?: string;
  children: ReactElement;
}) => {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <CustomStatusBar
          backgroundColor={backgroundColor}
          barStyle="dark-content"
        />
        {children}
      </View>
    </ThemeProvider>
  );
};

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
export default ScreenWrapper;
