import React, { ReactElement } from "react";
import { Dimensions, Text, View, Image } from "react-native";
import { StyleSheet } from "react-native";
import { Images, materialTheme } from "../../constants";
import { Button, theme } from "galio-framework";
import { Colors } from "../../components/bottomHeader/styles";
import FastImage from "react-native-fast-image";
import { isRunningInExpoGo } from "../../utils/common";

const { width } = Dimensions.get("screen");

const Welcome = ({ navigation }: any): ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {isRunningInExpoGo() ? (
          <Image style={styles.image} source={Images.Welcome.Main} />
        ) : (
          <FastImage style={styles.image} source={Images.Welcome.Main} />
        )}
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text allowFontScaling={false} style={styles.title}>
            Discover your property{"\n"} from smartphone
          </Text>
          <Text allowFontScaling={false} style={styles.subtitle}>
            The No. 1 App for real estate{"\n"} searching and appraisaling
          </Text>
        </View>

        <Button
          color="#000"
          style={styles.register}
          shadowless
          onPress={() => {
            navigation.navigate("Sign Up");
          }}
        >
          Register
        </Button>
        <Button
          color="transparent"
          shadowless
          size="large"
          onPress={() => {
            navigation.navigate("Sign In");
          }}
        >
          <Text style={styles.logInTitle}>
            Already have an account? <Text style={styles.logIn}>Log in</Text>
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 2,
    padding: width * 0.025,
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  textContainer: {
    flex: 1.4,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 35,
    paddingBottom: 15,
    paddingTop: 25,
  },
  subtitle: {
    color: materialTheme.COLORS.PLACEHOLDER,
    fontSize: 17,
    textAlign: "center",
  },
  register: {
    width: "65%",
    borderRadius: 30,
  },
  logInTitle: {
    paddingBottom: 10,
    fontSize: (theme.SIZES?.FONT || 0) * 0.75,
  },
  logIn: {
    color: Colors.SECONDARY,
  },
});

export default Welcome;
