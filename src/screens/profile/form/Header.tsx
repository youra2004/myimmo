import React, { ReactElement, useState } from "react";
import { FormikValues } from "formik";
import { Text } from "galio-framework";
import { ActivityIndicator, View } from "react-native";
import { Colors } from "../../../components/bottomHeader/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { avatarInitState, pickAvatar } from "../utils";
import CustomFastImage from "../../../components/CustomFastImage";
import { IMAGE_HEIGHT, styles } from "./styles";
import FastImage from "react-native-fast-image";
import { Images } from "../../../constants";
import { isRunningInExpoGo } from "../../../utils/common";

const ProfileFormHeader = ({
  values,
  setFieldValue,
  isSubmitting,
  handleSubmit,
  dirty,
}: FormikValues): ReactElement => {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState(avatarInitState);
  const uri = values?.profileImg?.mediumUrl;
  const source = uri ? { uri } : Images.Navigation.DefaultAvatar;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          {avatar.isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size={20} color={Colors.BLACK} />
            </View>
          ) : (
            <>
              {isRunningInExpoGo() ? (
                <Image style={styles.image} source={source} />
              ) : (
                <FastImage style={styles.image} source={source} />
              )}
            </>
          )}
        </View>

        <TouchableOpacity onPress={pickAvatar({ setAvatar, setFieldValue })}>
          <Text style={styles.uploadBtn}>Set new photo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.submitContainer}>
        {!isSubmitting ? (
          <TouchableOpacity
            disabled={!dirty}
            style={styles.submitBtn}
            onPress={handleSubmit}
          >
            <Text
              style={[
                styles.submitBtnText,
                {
                  color: dirty ? "#000" : Colors.DISABLED,
                },
              ]}
            >
              Done
            </Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator
            size={10}
            color={Colors.BLACK}
            style={styles.submitLoader}
          />
        )}
      </View>
    </View>
  );
};

export default ProfileFormHeader;
