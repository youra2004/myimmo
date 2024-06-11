import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { Appbar } from "react-native-paper";
import { styles } from "./styles";

const TopHeader = ({ navigation, title, modal = false }: any): ReactElement => {
  return (
    <View style={[styles.container]}>
      <Text>1231</Text>
    </View>
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     marginTop: -50,
    //     borderWidth: 2,
    //     backgroundColor: "#777",
    //     //padding: 8,

    //     borderColor: "red",
    //   }}
    // >
    //   <Text>222</Text>
    //   <Appbar.Header
    //     style={{
    //       //backgroundColor: "transparent",
    //       backgroundColor: "#fff",
    //       display: "flex",
    //       flexDirection: "row",
    //       justifyContent: "flex-end",
    //       // borderWidth: 2,
    //       // borderColor: "green",
    //       padding: 10,
    //       margin: 0,
    //       height: 50,
    //       marginTop: !modal ? 50 : 0,
    //     }}
    //   >
    //     <Appbar.BackAction
    //       style={{ marginBottom: 16 }}
    //       onPress={() => {
    //         navigation.goBack();
    //       }}
    //       size={15}
    //     />
    //     <Appbar.Content
    //       style={{
    //         maxWidth: 70,
    //         marginBottom: 10,
    //       }}
    //       title={title}
    //       titleStyle={{ fontSize: 17 }}
    //     />
    //     <Appbar.Content
    //       style={{
    //         maxWidth: 70,
    //         marginBottom: 10,
    //         borderWidth: 1,
    //         width: 70,
    //         padding: 0,
    //         margin: 0,
    //       }}
    //       title="Done"
    //       titleStyle={{ fontSize: 17 }}
    //     />
    //     <Appbar.Content
    //       style={{
    //         maxWidth: 70,
    //         marginBottom: 10,
    //         borderWidth: 1,
    //         width: 70,
    //         padding: 0,
    //         margin: 0,
    //       }}
    //       title="Done"
    //       titleStyle={{ fontSize: 17 }}
    //     />
    //     <Appbar.Content
    //       style={{
    //         maxWidth: 70,
    //         marginBottom: 10,
    //         borderWidth: 1,
    //         width: 70,
    //         padding: 0,
    //         margin: 0,
    //       }}
    //       title="Done"
    //       titleStyle={{ fontSize: 17 }}
    //     />
    //     <Appbar.Content
    //       style={{
    //         maxWidth: 70,
    //         marginBottom: 10,
    //         borderWidth: 1,
    //         width: 70,
    //         padding: 0,
    //         margin: 0,
    //       }}
    //       title="Done"
    //       titleStyle={{ fontSize: 17 }}
    //     />
    //     <Appbar.Content
    //       style={{
    //         maxWidth: 70,
    //         marginBottom: 10,
    //         borderWidth: 1,
    //         width: 70,
    //         padding: 0,
    //         margin: 0,
    //       }}
    //       title="Done"
    //       titleStyle={{ fontSize: 17 }}
    //     />
    //     <Appbar.Content
    //       style={{
    //         maxWidth: 70,
    //         marginBottom: 10,
    //         borderWidth: 1,
    //         width: 70,
    //         padding: 0,
    //         margin: 0,
    //       }}
    //       title="Done"
    //       titleStyle={{ fontSize: 17 }}
    //     />
    //   </Appbar.Header>
    // </View>
  );
};

export default TopHeader;
