import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import AppForm from "./app/components/AppForm";
import Home from "./app/components/Home";
import ImageUpload from "./app/components/ImageUpload";
import UserProfile from "./app/components/UserProfile";
import inventory from "./app/components/inventory";
import ForgotPassword from "./app/components/ForgotPassword";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen component={AppForm} name="Нэвтрэх" />
          <Stack.Screen component={Home} name="Home" />
          <Stack.Screen component={ImageUpload} name="ImageUpload" />
          <Stack.Screen component={UserProfile} name="UserProfile" />
          <Stack.Screen component={inventory} name="inventory" />
          <Stack.Screen component={ForgotPassword} name="ForgotPassword"/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
