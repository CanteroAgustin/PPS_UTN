import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../components/screens/home";
import LoginScreen from "../components/screens/login";

const MainStack = createStackNavigator();

const MainNavigator: React.FC = () => {
  const {Navigator, Screen} = MainStack;

  return (
    <Navigator>
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Home" component={HomeScreen} />
    </Navigator>
  );
};

export default MainNavigator;
