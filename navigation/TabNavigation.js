import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import HomeContainer from "../screens/Home/HomeContainer";
import MapContainer from "../screens/Map/MapContainer";
import PushContainer from "../screens/Push/PushContainer";
import { TAB_COLOR, GREY_COLOR, TINT_COLOR } from "../constants/Colors";
import TabBarIcon from "../components/TabBarIcon";
import ChatContainer from "../screens/Chat/ChatContainer";

const TabNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: HomeContainer,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS == "ios" ? "ios-home" : "md-home"}
          />
        )
      }
    },
    Map: {
      screen: MapContainer,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS == "ios" ? "ios-map" : "md-map"}
          />
        )
      }
    },
    Push: {
      screen: PushContainer,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS == "ios" ? "ios-alarm" : "md-alarm"}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: TINT_COLOR,
      inactiveTintColor: GREY_COLOR,
      style: {
        backgroundColor: TAB_COLOR,
        paddingTop: 3,
        borderTopWidth: 0
      }
    }
  }
);

export default createAppContainer(TabNavigation);
