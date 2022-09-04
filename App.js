import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Button, View } from "react-native";
import AppForm from "./app/components/AppForm";
import Home from "./app/components/Home";
import ImageUpload from "./app/components/ImageUpload";
import UserProfile from "./app/components/UserProfile";
import inventory from "./app/components/inventory";
import ForgotPassword from "./app/components/ForgotPassword";

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AppForm" component={AppForm} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ImageUpload" component={ImageUpload} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="inventory" component={inventory} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
