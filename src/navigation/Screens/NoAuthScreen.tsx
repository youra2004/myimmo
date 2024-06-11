import React, { ReactElement } from "react";
import AuthGuard from "../../guards/AuthGuard";
import { ParamListBase } from "@react-navigation/native";
import SignInScreen from "../../screens/signIn";
import SignUpScreen from "../../screens/signUp";
import ForgotPasswordScreen from "../../screens/forgotPassword";
import ResetPasswordScreen from "../../screens/resetPassword";
import WelcomeScreen from "../../screens/welcome";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenWrapper from "../../hoc/ScreenWrapper";
import ConfirmationScreen from "../../screens/confirmation";

const MainStack = createStackNavigator();

const SignInScreenWithGuard = (props: ParamListBase) => (
  <AuthGuard>
    <ScreenWrapper backgroundColor="transparent">
      <SignInScreen {...props} />
    </ScreenWrapper>
  </AuthGuard>
);

const SignUpScreenWithWrapper = (props: ParamListBase) => (
  <ScreenWrapper backgroundColor="transparent">
    <SignUpScreen {...props} />
  </ScreenWrapper>
);

const ForgotPasswordScreenWithWrapper = (props: ParamListBase) => (
  <ScreenWrapper backgroundColor="transparent">
    <ForgotPasswordScreen {...props} />
  </ScreenWrapper>
);

const ResetPasswordScreenWithWrapper = (props: ParamListBase) => (
  <ScreenWrapper backgroundColor="transparent">
    <ResetPasswordScreen {...props} />
  </ScreenWrapper>
);

const WelcomeScreenWithWrapper = (props: ParamListBase) => (
  <ScreenWrapper>
    <WelcomeScreen {...props} />
  </ScreenWrapper>
);

const ConfirmationScreenWithWrapper = (props: ParamListBase) => (
  <ScreenWrapper>
    <ConfirmationScreen {...props} />
  </ScreenWrapper>
);

export const NoAuthStackScreen = (): ReactElement => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Welcome"
        component={WelcomeScreenWithWrapper}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Sign In"
        component={SignInScreenWithGuard}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Sign Up"
        component={SignUpScreenWithWrapper}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Forgot Password"
        component={ForgotPasswordScreenWithWrapper}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Reset Password"
        component={ResetPasswordScreenWithWrapper}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Confirmation"
        component={ConfirmationScreenWithWrapper}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};

export default NoAuthStackScreen;
