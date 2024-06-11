import React, { useContext, useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Keyboard,
  View,
  NativeEventEmitter,
  DeviceEventEmitter,
  ActivityIndicator,
} from "react-native";
import { Button, Block, NavBar, Input, Text, theme } from "galio-framework";
import { LogBox } from "react-native";
import Icon from "./Icon";
import materialTheme from "../constants/Theme";
import Tabs from "./Tabs";
import { AuthContext } from "../context/Auth";
import { useNavigation } from "@react-navigation/native";
import { useEvent } from "react-native-reanimated";
import { CustomEvents } from "../utils/constants";
import { Colors } from "./bottomHeader/styles";

LogBox.ignoreLogs(["new NativeEventEmitter"]);

const { height, width } = Dimensions.get("window");
const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const ChatButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate("Chat")}
  >
    <Icon
      family="GalioExtra"
      size={16}
      name="chat-33"
      color={theme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const BasketButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate("Cart")}
  >
    <Icon
      family="GalioExtra"
      size={16}
      name="basket-simple"
      color={theme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const LogoutButton = ({ isWhite, style, signOut, navigation }) => (
  <>
    <TouchableOpacity
      style={[
        style,

        { display: "flex", flexDirection: "row", alignItems: "center" },
      ]}
      onPress={() => {
        signOut();
      }}
    >
      <Text style={{ paddingRight: 5, fontSize: 16, fontWeight: "bold" }}>
        Logout
      </Text>
      <Icon
        family="MaterialIcons"
        size={14}
        name="logout"
        color={theme.COLORS[isWhite ? "WHITE" : "ICON"]}
      />
    </TouchableOpacity>
  </>
);

const EditButton = ({ id, navigation }) => (
  <>
    <TouchableOpacity
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      onPress={() => {
        navigation.navigate("EditDossier", { id });
      }}
    >
      <Text style={{ paddingRight: 5, fontSize: 16, fontWeight: "bold" }}>
        Edit
      </Text>
    </TouchableOpacity>
  </>
);

const SubmitButton = ({ id, navigation }) => (
  <>
    <TouchableOpacity
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      onPress={() => {
        navigation.navigate("EditDossier", { id });
      }}
    >
      <Text style={{ paddingRight: 5, fontSize: 16, fontWeight: "bold" }}>
        Done
      </Text>
    </TouchableOpacity>
  </>
);

const SearchButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate("Search")}
  >
    <Icon
      size={16}
      family="entypo"
      name="magnifying-glass"
      color={theme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
  </TouchableOpacity>
);

const Header = (props) => {
  const handleLeftPress = () => {
    const { back, navigation } = props;
    if (back) navigation.goBack();
    else navigation.openDrawer();
  };

  const renderRight = () => {
    const [emitter, setEmitter] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
      const auxEmitter = new NativeEventEmitter("start");
      setEmitter(auxEmitter);
      return () => {
        setEmitter(undefined);
      };
    }, []);

    const emitEvent = () => emitter.emit(CustomEvents.SUBMIT_DOSSIER);

    useEffect(() => {
      DeviceEventEmitter.addListener(CustomEvents.IS_SUBMITTING, () =>
        setIsSubmitting(true)
      );
      DeviceEventEmitter.addListener(CustomEvents.IS_NOT_SUBMITTING, () =>
        setIsSubmitting(false)
      );
      DeviceEventEmitter.addListener(CustomEvents.IS_DIRTY, () =>
        setIsDirty(true)
      );
      DeviceEventEmitter.addListener(CustomEvents.IS_NOT_DIRTY, () =>
        setIsDirty(false)
      );

      return () => {
        DeviceEventEmitter.removeAllListeners(CustomEvents.IS_SUBMITTING);
        DeviceEventEmitter.removeAllListeners(CustomEvents.IS_NOT_SUBMITTING);
        DeviceEventEmitter.removeAllListeners(CustomEvents.IS_DIRTY);
        DeviceEventEmitter.removeAllListeners(CustomEvents.IS_NOT_DIRTY);
      };
    }, []);

    const { title, navigation, route } = props;

    if (isSubmitting) {
      return <ActivityIndicator size={10} color={Colors.BLACK} />;
    }

    if (title === "Show")
      return <EditButton id={route?.params?.id} navigation={navigation} />;

    if (["CreateDossier", "EditDossier"].includes(title))
      return (
        <TouchableOpacity
          disabled={!isDirty}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={emitEvent}
        >
          <Text
            style={{
              paddingRight: 5,
              fontSize: 16,
              fontWeight: "bold",
              color: isDirty ? "#000" : Colors.DISABLED,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      );

    return <></>;
  };

  const renderSearch = () => {
    return <Block></Block>;
  };

  const renderOptions = () => {
    return <Block></Block>;
  };

  renderTabs = () => {
    const { tabs, tabIndex, navigation } = props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;

    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={(id) => navigation.setParams({ tabId: id })}
      />
    );
  };

  const renderHeader = () => {
    const { search, tabs, options } = props;
    if (search || tabs || options) {
      return (
        <Block center>
          {search ? renderSearch() : null}
          {options ? renderOptions() : null}
          {tabs ? renderTabs() : null}
        </Block>
      );
    }
    return null;
  };
  const { back, title, white, transparent, modal } = props;

  const headerStyles = [
    transparent ? { backgroundColor: "rgba(0,0,0,0)" } : null,
  ];

  return (
    <Block style={headerStyles}>
      <NavBar
        back={back}
        title={""}
        style={[styles.navbar, modal && styles.modal]}
        transparent={transparent}
        right={renderRight()}
        rightStyle={{
          alignItems: "center",
        }}
        leftStyle={{
          flex: 0.3,
          width: 55,
          height: 30,
        }}
        leftIconName={back ? null : "navicon"}
        leftIconColor={white ? theme.COLORS.WHITE : theme.COLORS.ICON}
        leftIconSize={30}
        titleStyle={[
          styles.title,
          { color: theme.COLORS[white ? "WHITE" : "ICON"] },
        ]}
        onLeftPress={handleLeftPress}
      />
      {renderHeader()}
    </Block>
  );
};

export default Header;

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: "relative",
  },
  title: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  modal: { paddingBottom: 0, paddingTop: 0, height: 50 },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: "absolute",
    top: 8,
    right: 8,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
});
