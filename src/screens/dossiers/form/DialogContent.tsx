import { Icon } from "galio-framework";
import React, { ReactElement } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Divider } from "react-native-paper";
import { width } from "./utils";

const DialogContent = <T,>({
  items,
  value: formValue,
  onPress,
}: {
  items: {
    value: T;
    label: string;
  }[];
  value: T;
  onPress: (value: T) => void;
}): ReactElement => {
  return (
    <View
      style={{
        width: width,
        paddingHorizontal: width * 0.05,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 5,
          //padding: width * 0.05,
          paddingHorizontal: width * 0.05,
          //borderWidth: 2,
        }}
      >
        {items.map(({ label, value }, i, arr) => (
          <TouchableOpacity
            onPress={() => {
              onPress(value);
            }}
            key={value + label}
          >
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 12,
                  paddingBottom: 8,
                  // backgroundColor: "#fff",
                  // borderRadius: 5,
                  // padding: width * 0.05,
                }}
              >
                <Text style={{ fontSize: 17 }}>{label}</Text>
                {(formValue || "") === value && (
                  <Icon
                    name="check"
                    color="#2b82e0"
                    family="Entypo"
                    size={20}
                  />
                )}
              </View>
              {i !== arr.length - 1 && <Divider />}
            </>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DialogContent;
