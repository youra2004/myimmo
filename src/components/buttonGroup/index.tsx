import React, { ReactElement } from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";
import { Icon } from "..";
import { materialTheme } from "../../constants";
import { styles } from "./styles";

const ButtonGroup = <
  T extends { value: R; label: string; icon?: string },
  R extends string
>({
  data,
  onPress,
  selectWith,
  fullWidth = false,
  style,
}: {
  data: T[];
  onPress: (...args: R[]) => void;
  selectWith?: string;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}): ReactElement => {
  return (
    <React.Fragment>
      {data.map(({ value, label, icon }, index, arr) => (
        <TouchableOpacity
          key={value}
          onPress={() => {
            onPress(value);
          }}
          style={[
            styles.button,
            fullWidth && styles.fullWidth,
            selectWith == value && styles.selected,
            index === 0 && styles.firstChild,
            index === arr.length - 1 && styles.lastChild,
            style,
          ]}
        >
          {icon && (
            <Icon
              name={icon}
              color={materialTheme.COLORS.ICON}
              family="MaterialIcons"
              size={19}
            />
          )}
          <Text style={{ textAlign: "center" }}>{label}</Text>
        </TouchableOpacity>
      ))}
    </React.Fragment>
  );
};

export default ButtonGroup;
