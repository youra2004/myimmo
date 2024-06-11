import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import pick from "lodash/pick";
import React, { ReactElement, useContext, useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import ConfirmationCodeField from "../../components/confirmationCodeField/ConfirmationCodeField";
import { AuthContext } from "../../context/Auth";
import DismissKeyboardHOC from "../../hoc/DismissKeyboard";
import { Verification } from "../../types/auth";
import { Navigation } from "../../types/navigation";
import { ParamList } from "./types";
import {
  handleVerification,
  initCodeValue,
  initVerficationState,
} from "./utils";

const Confirmation = (): ReactElement => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<RouteProp<ParamList, "Confirmation">>();
  const {
    params: { data, mode = "phone", steps = 2 },
  } = route;

  const [verification, setVerification] = useState<Verification>({
    ...initVerficationState,
    mode,
    steps,
    data,
  });
  const [code, setCode] = useState(initCodeValue);
  const { signIn, dispatch } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      <DismissKeyboardHOC>
        <View
          style={{
            height: "100%",
            justifyContent: "center",
          }}
        >
          <ConfirmationCodeField
            verification={verification}
            setVerification={setVerification}
            value={code}
            setValue={setCode}
            onPress={handleVerification({
              verification,
              setVerification,
              code,
              setCode,
              navigation,
              dispatch,
              signIn,
            })}
          />
        </View>
      </DismissKeyboardHOC>
    </KeyboardAvoidingView>
  );
};

export default Confirmation;
