import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import HomeContainer from "../screens/Home/HomeContainer";
import MapContainer from "../screens/Map/MapContainer";
import PushContainer from "../screens/Push/PushContainer";
import { TAB_COLOR, GREY_COLOR, TINT_COLOR } from "../constants/Colors";
import TabBarIcon from "../components/TabBarIcon";
import MyTabBar from "../constants/TabBar";
import ChatContainer from "../screens/Chat/ChatContainer";
import {TabBar} from "react-native-animated-nav-tab-bar"
import FoodContainer from "../screens/Food/FoodContainer";

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
        ),
      },
    },
    Push: {
      screen: PushContainer,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS == "ios" ? "ios-alarm" : "md-alarm"}
          />
        ),
      },
    },
    Food: {
      screen: FoodContainer,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS == "ios" ? "ios-beer" : "md-beer"}
          />
        ),
      },
    },
    Chat: {
      // screen: () => null,
      screen: ChatContainer,
      backBehavior: "order",
      navigationOptions: {
        // tabBarVisible:false,

        // tabBarOnPress: ({ navigation }) => {
        // navigation.navigate("ChatScreen");
        // },
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS == "ios" ? "ios-map" : "md-map"}
          />
        ),
      },
    },
    
  },
  {
    tabBarComponent: props =>
      Platform.OS === "ios" ? (
        <MyTabBar {...props} />
      ) : (
        <TabBar
          activeColors={["#e6b580", "#8e87d6", "#c095c9"]}
          activeTabBackgrounds={["#ede7e6", "#eae3f6", "#eae4f6"]}
          {...props}
        />
      ),
    tabBarOptions: {
      activeTintColor: TINT_COLOR,
      activeBackgroundColor: "#0f8553",

      inactiveTintColor: GREY_COLOR,
      style: {
        // backgroundColor: TAB_COLOR,

        paddingTop: 3,
        borderTopWidth: 0,
      },
    },
  },
);

export default createAppContainer(TabNavigation);
