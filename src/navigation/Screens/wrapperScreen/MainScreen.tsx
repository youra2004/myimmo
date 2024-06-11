import { ParamListBase } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { ReactElement } from "react";
import AuthGuard from "../../../guards/AuthGuard";
import HomeScreen from "../../../screens/home";
import CreateDossierScreen from "../../../screens/dossiers/create";
import EditDossierScreen from "../../../screens/dossiers/edit";
import ProfileScreen from "../../../screens/profile";
import ShowScreen from "../../../screens/dossiers/show";
import { Header } from "../../../components";
import ScreenWrapper from "../../../hoc/ScreenWrapper";
import ThemeProvider from "../../../context/Theme";

const MainStack = createStackNavigator();

const HomeScreenWithGuard = (props: ParamListBase) => (
  <AuthGuard>
    <ThemeProvider>
      <ScreenWrapper>
        <HomeScreen {...props} />
      </ScreenWrapper>
    </ThemeProvider>
  </AuthGuard>
);

const CreateDossierScreenWithGuard = (props: ParamListBase) => (
  <AuthGuard>
    <CreateDossierScreen {...props} />
  </AuthGuard>
);

const ProfileScreenWithGuard = (props: ParamListBase) => (
  <AuthGuard>
    <ScreenWrapper backgroundColor="transparent">
      <ProfileScreen {...props} />
    </ScreenWrapper>
  </AuthGuard>
);

const ShowScreenWithGuard = (props: ParamListBase) => (
  <AuthGuard>
    <ScreenWrapper backgroundColor="transparent">
      <ShowScreen {...props} />
    </ScreenWrapper>
  </AuthGuard>
);

const EditDossierScreenWithGuard = (props: ParamListBase) => (
  <AuthGuard>
    <EditDossierScreen {...props} />
  </AuthGuard>
);

export const MainStackScreen = (): ReactElement => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={HomeScreenWithGuard}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="ShowDossier"
        component={ShowScreenWithGuard}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="CreateDossier"
        component={CreateDossierScreenWithGuard}
        options={{
          header: ({ navigation }) => (
            <Header
              search
              options
              back
              title="CreateDossier"
              navigation={navigation}
            />
          ),
        }}
      />
      <MainStack.Screen
        name="EditDossier"
        component={EditDossierScreenWithGuard}
        options={{
          header: ({ navigation }) => (
            <Header
              search
              options
              back
              title="EditDossier"
              navigation={navigation}
            />
          ),
        }}
      />
      <MainStack.Screen
        name="Profile"
        component={ProfileScreenWithGuard}
        options={{
          headerShown: false,
          gestureDirection: "horizontal-inverted",
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainStackScreen;
