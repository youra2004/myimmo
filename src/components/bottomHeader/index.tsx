import { Button } from "galio-framework";
import React, { ReactElement, useContext } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StatusBar,
  Dimensions,
} from "react-native";
import { Colors, styles } from "./styles";
import { Avatar, IconButton } from "react-native-paper";
import { getAvatarBorderColor, getIconColor } from "./utils";
import { Screens } from "../../utils/constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../context/Auth";
import { Images } from "../../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomHeader = ({
  navigation,
  modal,
  currentRoute,
}: any): ReactElement => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const smallUrl = user?.profileImg?.smallUrl;
  const source = smallUrl ? { uri: smallUrl } : Images.Navigation.DefaultAvatar;

  return (
    <React.Fragment>
      {!["Modal", "ShowDossier"].includes(currentRoute) && (
        <View style={[styles.container, modal && styles.modal]}>
          <View style={styles.item}>
            <Pressable
              onPress={() => {
                navigation?.navigate(Screens.MAIN, {
                  screen: "Profile",
                });
              }}
              style={{
                borderWidth: 4,
                borderRadius: 23,
                borderColor: getAvatarBorderColor("Profile", currentRoute),
              }}
            >
              <Avatar.Image size={20} source={source} />
            </Pressable>
            <IconButton
              icon="home"
              iconColor={getIconColor(["Home", "Wrapper"], currentRoute)}
              size={20}
              onPress={() => {
                navigation?.navigate(Screens.MAIN, {
                  screen: "Home",
                });
              }}
            />
            <IconButton
              icon="home-plus-outline"
              iconColor={getIconColor("CreateDossier", currentRoute)}
              size={20}
              onPress={() => {
                navigation?.navigate(Screens.MAIN, {
                  screen: "CreateDossier",
                });
              }}
            />
          </View>
        </View>
      )}
    </React.Fragment>
  );
};

export default BottomHeader;
