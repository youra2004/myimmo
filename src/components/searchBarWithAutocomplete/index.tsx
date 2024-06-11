import { Button, Input } from "galio-framework";
import React, { FunctionComponent, useState } from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
const { width } = Dimensions.get("window");
import { TextInput } from "react-native-paper";
import { materialTheme } from "../../constants";
import { Colors } from "../bottomHeader/styles";
import TextField from "../TextField";
import { MAX_PREDICTIONS } from "./utils";
import { PredictionType } from "./Wrapper";

type SearchBarProps = {
  value: string;
  style?: ViewStyle | ViewStyle[];
  onChangeText: (text: string) => void;
  predictions: PredictionType[];
  showPredictions: boolean;
  onPredictionTapped: (placeId: string, description: string) => void;
  onCancel: () => void;
};

const SearchBarWithAutocomplete: FunctionComponent<SearchBarProps> = (
  props
) => {
  const [inputSize, setInputSize] = useState({ width: 0, height: 0 });

  const {
    value,
    style,
    onChangeText,
    onPredictionTapped,
    predictions,
    showPredictions,
    onCancel,
  } = props;

  const { container } = styles;
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;
  const inputBottomRadius = showPredictions
    ? {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }
    : {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      };

  const _renderPredictions = (predictions: PredictionType[]) => {
    const { predictionsContainer, predictionRow, lastPredictionRow } = styles;
    const calculatedStyle = {
      //width: inputSize.width,
      width: width * 0.8,
    };

    return (
      <ScrollView horizontal={false} keyboardShouldPersistTaps={"always"}>
        <ScrollView horizontal={true} keyboardShouldPersistTaps={"always"}>
          <FlatList
            nestedScrollEnabled
            data={predictions}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={[
                    predictionRow,
                    index === MAX_PREDICTIONS - 1 && lastPredictionRow,
                  ]}
                  onPress={() =>
                    onPredictionTapped(item.place_id, item.description)
                  }
                >
                  <Text numberOfLines={1}>{item.description}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.place_id}
            keyboardShouldPersistTaps="handled"
            style={[predictionsContainer, calculatedStyle]}
          />
        </ScrollView>
      </ScrollView>
    );
  };

  return (
    <View
      style={[
        container,
        {
          ...passedStyles,
        },
      ]}
    >
      <TextField
        name="property.location"
        textColor={materialTheme.COLORS.TEXT_FIELD}
        autoCapitalize="none"
        label={
          <>
            <Text style={styles.inputPaperLabel}>Address</Text>
            <Text style={{ color: "red" }}>*</Text>
          </>
        }
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        //multiline={true}
        numberOfLines={1}
        style={[styles.inputPaper]}
        //underlineColor="white"
        underlineStyle={[inputBottomRadius]}
        onLayout={(event) => {
          const { height, width } = event.nativeEvent.layout;
          setInputSize({ height, width });
        }}
        activeUnderlineColor={Colors.SECONDARY}
        right={
          value ? (
            <TextInput.Icon
              style={styles.icon}
              icon="close"
              onPress={onCancel}
              color={() => materialTheme.COLORS.TEXT_FIELD}
            />
          ) : null
        }
        showHelperText={false}
      />
      <View
        style={{
          position: "absolute",
          top: 55,
          left: 0,
          right: 0,
        }}
      >
        {showPredictions && _renderPredictions(predictions)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    position: "relative",
  },
  inputStyle: {
    fontSize: 14,
  },
  predictionsContainer: {
    backgroundColor: "#cfcfcf",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  predictionRow: {
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  lastPredictionRow: {
    marginBottom: 0,
  },
  icon: {
    top: 5,
    marginRight: -20,
  },
  outlineStyle: {
    borderRadius: 10,
  },
  inputPaper: {
    //width: width * 0.9,
    backgroundColor: "transparent",
  },
  inputPaperLabel: {
    color: materialTheme.COLORS.PLACEHOLDER,
  },
  inputPaperIcon: {
    marginBottom: -15,
  },
});

export default SearchBarWithAutocomplete;
