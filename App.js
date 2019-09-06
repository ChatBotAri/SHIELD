import React from "react";
import { StatusBar } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import MainNavigation from "./navigation/MainNavigation";
import client from "./mqtt";

export default class App extends React.Component {
  state = {
    loaded: false,
  };

  handleError = error => console.log(error);

  handleLoaded = () => this.setState({ loaded: true });

  loadAssets = async () => {
    await Font.loadAsync({
      ...Ionicons.font,
    });
  };

  componentDidMount = async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    console.log(status);

    if (status != "granted") {
      const res = await Permissions.askAsync(Permissions.LOCATION);
    }
    client.on("connect", function() {
      client.subscribe("presence", function(err) {
        if (!err) {
          client.publish("presence", "Hello mqtt");
        }
      });
    });

    client.on("message", function(topic, message) {
      // message is Buffer
      console.log(message.toString());
      client.end();
    });
  };

  render() {
    const { loaded } = this.state;
    if (loaded) {
      return (
        <>
          <StatusBar barStyle="light-content" />
          <MainNavigation />
        </>
      );
    } else {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onFinish={this.handleLoaded}
          onError={this.handleError}
        />
      );
    }
  }
}
