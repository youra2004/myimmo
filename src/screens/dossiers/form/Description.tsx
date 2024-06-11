import React, { useState, ReactElement, useEffect, memo } from "react";
import { Block, Text } from "galio-framework";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { MIN_HEIGHT_RICH_CONTAINER } from "../utils";
import { styles } from "../styles";
import { width } from "./utils";
import { DescriptionFormProps } from "./types";
import { Colors } from "../../../components/bottomHeader/styles";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { materialTheme } from "../../../constants";

const DescriptionForm = ({
  description,
  setFieldValue,
}: DescriptionFormProps): ReactElement => {
  //console.log("DescriptionForm");
  // const [height, setHeight] = useState(MIN_HEIGHT_RICH_CONTAINER);
  // const [editorDisabled, setEditorDisabled] = useState(true);
  // const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setVisible(true);
  //   }, 3000);
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setEditorDisabled(false);
  //   }, 5000);
  // }, []);

  // const handleEditorTextChange = (newText: string) =>
  //   setFieldValue("description", newText, false);

  // const handleHeightChange = (newHeight: number) =>
  //   setHeight(
  //     newHeight < MIN_HEIGHT_RICH_CONTAINER
  //       ? MIN_HEIGHT_RICH_CONTAINER
  //       : Number(newHeight)
  //   );

  return (
    <React.Fragment>
      <View>
        <TextInput
          multiline
          mode="outlined"
          numberOfLines={4}
          placeholder="Write description here"
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          value={description}
          onChangeText={(description) => {
            setFieldValue("description", description, false);
          }}
          //blurOnSubmit={true}
          activeOutlineColor={Colors.SECONDARY}
          outlineColor="transparent"
          style={{
            height: 130,
            backgroundColor: Colors.GREY,
            borderWidth: 0,
            marginTop: -6, // <- set the max height here
          }}
        />
      </View>
      {/* {visible && (
        <Block
          style={[
            styles.richContainer,
            {
              height,
            },
          ]}
        >
          <RichEditor
            disabled={editorDisabled}
            initialContentHTML={description}
            editorStyle={{ backgroundColor: Colors.GREY }}
            containerStyle={{
              flexBasis: height,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              //borderWidth: 2,
            }}
            ref={RichText}
            style={{
              flexBasis: height,
            }}
            placeholder={"Write description here"}
            onChange={handleEditorTextChange}
            onHeightChange={handleHeightChange}
          />
          <RichToolbar
            style={[
              styles.richBar,
              {
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                backgroundColor: Colors.GREY,
                borderTopWidth: 0.3,
                borderColor: "#ccc",
                //borderWidth: 2,
                flexDirection: "row",
                //marginLeft: -2,
                //backgroundColor: "red",
              },
            ]}
            actions={["bold", "underline", "unorderedList"]}
            editor={RichText}
            disabled={false}
            iconTint={"#000"}
            selectedIconTint={Colors.SECONDARY}
            disabledIconTint={"purple"}
            iconMap={{
              [actions.heading1]: ({ tintColor }) => (
                <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
              ),
            }}
          />
        </Block>
      )} */}
    </React.Fragment>
  );
};

export default memo(DescriptionForm);
