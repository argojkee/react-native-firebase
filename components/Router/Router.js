import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import LoginScreen from "../../screens/LoginScreen";
import RegistrationScreen from "../../screens/RegistrationScreen";
import { HomeScreen } from "../../screens/HomeScreen";
import authOperations from "../../redux/auth/authOperations";

const AuthStack = createNativeStackNavigator();

export const Router = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authOperations.authCheckCurrentUser());
  }, []);

  if (!user.isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Registration"
          options={{ headerShown: false }}
          component={RegistrationScreen}
        />

        <AuthStack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  } else {
    return (
      <AuthStack.Navigator options={{ headerShown: false }}>
        <AuthStack.Screen
          component={HomeScreen}
          name="Home"
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
};
