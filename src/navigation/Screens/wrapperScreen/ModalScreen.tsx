import { ParamListBase } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ReactElement } from "react";
import { Header } from "../../../components";
import AuthGuard from "../../../guards/AuthGuard";
import ScreenWrapper from "../../../hoc/ScreenWrapper";
import EditDossierScreen from "../../../screens/dossiers/edit";
import ShowScreenModal from "../../../screens/dossiers/showModal";

const MainStack = createStackNavigator();

const ShowScreenWithGuard = (props: ParamListBase) => (
  <AuthGuard>
    <ShowScreenModal {...props} />
  </AuthGuard>
);

export const ModalStackScreen = (): ReactElement => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="ShowDossierModal"
        component={ShowScreenWithGuard}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};

export default ModalStackScreen;
