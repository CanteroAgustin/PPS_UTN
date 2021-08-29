import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import MainNavigator from "./navigation/main-navigator";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <MainNavigator />
    </NavigationContainer>
  );
}
