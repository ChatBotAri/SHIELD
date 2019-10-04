import React, { Component } from "react";
import { AsyncStorage, StyleSheet, Text, View } from "react-native";
import init from "react_native_mqtt";
import PushPresenter from "./PushPresenter";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

var t_gas,
  t_temp,
  t_dust = 0;

export default class PushContainer extends Component {
  constructor(props) {
    super(props);

    const client = new Paho.MQTT.Client("192.168.1.21", 9001, "/mqtt", "uname");
    console.log(client);
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.onMessageArrived;
    client.connect({
      onSuccess: this.onConnect,
      useSSL: false,
      onFailure: this.onFailure,
    });

    this.state = {
      text: ["..."],
      client,
      connect: false,
      currentGas: 0,
      currentTemp: 0,
      currentDust: 0,
    };
  }

  Subconsole = entry => {
    const { text } = this.state;
    console.log(text);
  };

  onConnect = () => {
    const { client } = this.state;
    console.log("success");
    client.subscribe("sensor/#");
    //client.publish('aaa','bbb');
  };
  onFailure = error => {
    console.log(error);
    console.log("fail");
  };

  onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      console.log("connection lost");
    }
  };

  onMessageArrived = message => {
    if (message.destinationName === "sensor/gas") {
      this.updatePayload(`${parseInt(message.payloadString)}`, "gas");
      t_gas = message.payloadString;
    } else if (message.destinationName === "sensor/temp") {
      this.updatePayload(`${parseInt(message.payloadString)}`, "temp");
      t_temp = message.payloadString;
    } else if (message.destinationName === "sensor/dust") {
      this.updatePayload(`${parseInt(message.payloadString)}`, "dust");
      t_dust = message.payloadString;
    }
  };
  updatePayload = (Message, topic) => {
    const Current = {
      Data: ({ currentTemp, currentGas, currentDust } = this.state),
    };
    if (topic === "gas") {
      if (Current.Data.currentGas !== Message) {
        this.setState({
          currentGas: Message,
        });
      }
    }
    if (topic === "temp") {
      if (Current.Data.currentTemp !== Message) {
        this.setState({
          currentTemp: Message,
        });
      }
    }
    if (topic === "dust") {
      if (Current.Data.currentDust !== Message) {
        this.setState({
          currentDust: Message,
        });
      }
    }
  };
  render() {
    const { text, client, currentGas, currentDust, currentTemp } = this.state;
    console.log(text);

    return (
      <PushPresenter
        Subconsole={this.Subconsole}
        refresh={this.refresh}
        text={this.text}
        currentGas={currentGas}
        currentTemp={currentTemp}
        currentDust={currentDust}
      />
    );
  }
}
