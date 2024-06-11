import { FormikValues } from "formik";
import { getMe, updateUser } from "../../api/auth";
import { User } from "../../types/user";
import * as ImagePicker from "expo-image-picker";
import { upload } from "../dossiers/form/utils";
import { REACT_BASE_URL } from "../../utils/config";
import { SignInValues as BESignInValues } from "../../types/be/auth";
import { ParamList } from "../confirmation/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const handleUserUpdateSubmit = ({
  navigation,
  dispatch,
  signOut,
}: any) => {
  return async (
    user: Partial<User>,
    { setSubmitting, setTouched, setStatus }: FormikValues
  ): Promise<void> => {
    setSubmitting(true);

    const response = await updateUser(user);
    const json = await response.json();
    console.log("json profile submit", json);
    if ([200, 201].includes(response.status)) {
      const {
        user: { isEmailVerified, isPhoneVerified },
      } = json;
      console.log("isEmailVerified", isEmailVerified);
      console.log("isPhoneVerified", isPhoneVerified);

      const navProps: ParamList["Confirmation"] = {
        mode: null,
        data: json,
      };

      if (!isPhoneVerified && !isEmailVerified) {
        console.log("!isPhoneVerified && !isEmailVerified");
        navProps.mode = "phone";
        navProps.steps = 2;
      } else if (!isPhoneVerified) {
        console.log("!isPhoneVerified");
        navProps.mode = "phone";
        navProps.steps = 1;
      } else if (!isEmailVerified) {
        console.log("!isEmailVerified");
        navProps.mode = "email";
        navProps.steps = 1;
      } else {
        setTouched({});
        setSubmitting(false);
        dispatch({
          type: "UPDATE_USER",
          payload: {
            user: json.user,
          },
        });
        return navigation.navigate("Home");
      }
      await signOut();

      const {
        jwt: { token },
      } = json;

      try {
        await AsyncStorage.setItem("token", token);
      } catch (e) {
        console.log("Error when saving token to AsyncStorage");
      }

      navigation?.navigate("Confirmation", navProps);
    } else {
      const { message } = json;
      setStatus({
        success: false,
        errors: {
          email: message,
        },
      });
      setSubmitting(false);
      console.log("Error when updating profile: ", json);
    }
    setSubmitting(false);
  };
};

export const fetchCurrentUser = async ({ setUser, setIsLoading }: any) => {
  setIsLoading(true);
  const response = await getMe();
  const json = await response.json();
  if ([200, 201].includes(response.status)) {
    setUser(json);
  }
  setIsLoading(false);
};

export const avatarInitState = { isLoading: false, error: null };

export const pickAvatar =
  ({ setAvatar, setFieldValue }: any) =>
  async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: false,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setFieldValue("profileImg", null);
        setAvatar({ isLoading: true, error: null });
        const { uri } = result.assets[0];
        upload(`${REACT_BASE_URL}/file/upload-image`, uri)
          .then((result) => {
            setFieldValue("profileImg", result);
            setAvatar(avatarInitState);
          })
          .catch((err) => {
            setAvatar({ isLoading: false, error: err.message });
          });
      } else {
        setAvatar(avatarInitState);
      }
    } catch (err) {
      console.log(err);
      setAvatar({ isLoading: false, error: err });
    }
  };
