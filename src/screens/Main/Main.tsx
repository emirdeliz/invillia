import React from "react";
import { Button, StatusBar, View, Text } from "react-native"
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "../Home/Home";

StatusBar.setBarStyle("light-content", true);

const defaultStyle = {
   headerStyle: {
      backgroundColor: "hsl(220, 46%, 48%)",
      color: "hsl(0, 0%, 100%)",
    },
    headerTintColor: "hsl(0, 0%, 100%)",
};

const Main = createStackNavigator({
	Home: {
      screen: HomeScreen,
      navigationOptions: ({ screenProps }) => {
         const user = screenProps as any;
         return {
            title: "Restaurantes",
            ...defaultStyle,
         }
      }
   }
});

export default createAppContainer(Main);