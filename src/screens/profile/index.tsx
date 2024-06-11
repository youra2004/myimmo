import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ActivityIndicator,
  Text,
  SafeAreaView,
} from "react-native";
import { Formik } from "formik";
import { Block, theme } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import { materialTheme } from "../../constants";
import useValidation from "../../hooks/useValidation";
import * as Yup from "yup";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { fetchCurrentUser, handleUserUpdateSubmit } from "./utils";
import Form from "./form";
import { styles } from "./styles";
import { User } from "../../types/user";
import useOnFocus from "../../hooks/useOnFocus";
import DismissKeyboardHOC from "../../hoc/DismissKeyboard";
import omit from "lodash/omit";
import { AuthContext } from "../../context/Auth";
import { Button } from "react-native-paper";
import { width } from "../dossiers/form/utils";
import { Colors } from "../../components/bottomHeader/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<any>({
    phone: "-",
    email: "-",
    password: "-",
    passwordConfirm: "-",
    firstName: "-",
    lastName: "-",
    active: {
      phone: false,
      email: false,
      password: false,
      passwordConfirm: false,
      firstName: false,
      lastName: false,
    },
  });
  const { top } = useSafeAreaInsets();

  const { firstName, lastName, passwordConfirm, phone, email } =
    useValidation();

  const toggleActive = (name: string) => {
    const { active } = state;

    active[name] = !active[name];

    setState({ active });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCurrentUser({ setUser, setIsLoading });
    }, [])
  );

  // useEffect(() => {
  //   signOut();
  // }, []);
  //console.log("user11", user);

  //useOnFocus(() => fetchCurrentUser({ setUser, setIsLoading }));

  const { dispatch, signOut } = useContext(AuthContext);
  console.log("user profile rendered");
  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color={Colors.BLACK} />
      </View>
    );
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.25, y: 1.1 }}
      locations={[0.2, 1]}
      colors={["transparent", "transparent"]}
      style={[styles.container]}
    >
      <View>
        <DismissKeyboardHOC>
          <>
            {user && (
              <Formik
                initialValues={omit(user, ["createdAt", "updatedAt", "role"])}
                onSubmit={handleUserUpdateSubmit({
                  navigation,
                  dispatch,
                  signOut,
                })}
                validationSchema={Yup.object().shape({
                  firstName,
                  lastName,
                  email,
                  phone,
                  passwordConfirm,
                })}
              >
                {(props) => (
                  <Form {...props} state={state} toggleActive={toggleActive} />
                )}
              </Formik>
            )}
          </>
        </DismissKeyboardHOC>
      </View>
    </LinearGradient>
  );
};

export default Profile;
