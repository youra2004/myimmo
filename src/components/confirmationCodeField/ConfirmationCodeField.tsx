import {
  Animated,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";

import {
  CodeField,
  Cursor,
  RenderCellOptions,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from "./styles";
import { Block, Button, theme, Text } from "galio-framework";
import { materialTheme } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../../types/navigation";
import { Verification, VerificationMode } from "../../types/auth";
import { Colors } from "../bottomHeader/styles";
import { width } from "../../screens/dossiers/form/utils";
import { resendEmail } from "../../api/auth";
import { handleResendCode } from "./utils";

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 6;
const source = {
  uri: "https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png",
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }: any) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
    }),
  ]).start();
};

const ConfirmationCodeField = ({
  verification,
  setVerification,
  value,
  setValue,
  onPress,
  confirmButtonTitle = "VERIFY",
  title = "Verification",
  style = {},
}: {
  verification: Verification;
  setVerification: Dispatch<SetStateAction<Verification>>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onPress: () => void;
  confirmButtonTitle?: string;
  title?: string;
  style?: any;
}) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const navigation = useNavigation<Navigation>();

  const renderCell = ({ index, symbol, isFocused }: RenderCellOptions) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  const titleDict: Record<string, string> = {
    email: "Email",
    phone: "Phone",
  };

  const subtitleDict: Record<string, string> = {
    email: verification?.data?.user?.email || "your email address",
    phone: verification?.data?.user?.phone || "your phone",
  };

  return (
    <SafeAreaView style={[styles.root, { ...style }]}>
      <Text style={styles.title}>
        {`${titleDict[String(verification.mode)] || ""} Verification`}
      </Text>
      <Image style={styles.icon} source={source} />

      {!verification.error ? (
        <Text style={styles.subTitle}>
          {"Please enter the code \n"}
          we send to{" "}
          <Text style={{ textDecorationLine: "underline", color: "#777" }}>
            {subtitleDict[verification.mode || "you"]}
          </Text>
        </Text>
      ) : (
        <Text style={styles.subTitle}>{verification.error}</Text>
      )}

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <View style={{ width: width * 0.9, paddingTop: 15 }}>
        <Text
          size={(theme.SIZES?.FONT || 0) * 0.75}
          style={{
            alignSelf: "flex-end",
          }}
        >
          Did not received code?{" "}
          <Text
            onPress={handleResendCode({ verification, setVerification })}
            color={Colors.SECONDARY}
          >
            Resend
          </Text>
        </Text>
      </View>
      <Block flex center style={{ marginTop: 30 }}>
        <Button
          size="large"
          shadowless
          style={{ height: 48 }}
          color={materialTheme.COLORS.BUTTON_COLOR}
          onPress={onPress}
          loading={verification.isSubmitting}
        >
          {confirmButtonTitle}
        </Button>

        <Button
          size="large"
          color="transparent"
          shadowless
          onPress={() => navigation?.navigate("Sign In" as never)}
        >
          <Text center size={(theme.SIZES?.FONT || 0) * 0.75}>
            Already have an account?{" "}
            <Text color={Colors.SECONDARY}>Sign In</Text>
          </Text>
        </Button>
      </Block>
    </SafeAreaView>
  );
};

export default ConfirmationCodeField;
