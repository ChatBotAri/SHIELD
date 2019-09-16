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
      gas: null,
      temp: null,
      dust: null,
    };
  }
  refresh = () => {
    this.componentDidMount();
  };

  Subconsole = entry => {
    const { text } = this.state;
    console.log(text);
  };
  pushText = entry => {
    const { text } = this.state;
    //this.setState({ text: [...text, entry] });
    this.setState({ text: [...text, entry] });
  };

  onConnect = () => {
    const { client } = this.state;
    console.log("success");
    client.subscribe("sensor/#");
    //client.publish('aaa','bbb');
    this.pushText("connected");
  };
  onFailure = error => {
    console.log(error);
    console.log("fail");
  };

  onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      this.pushText(`connection lost: ${responseObject.errorMessage}`);
    }
  };

  onMessageArrived = message => {
    if (message.destinationName === "sensor/gas") {
      this.pushText(`gas: ${message.payloadString}`);
      t_gas = message.payloadString;
    } else if (message.destinationName === "sensor/temp") {
      this.pushText(`temp: ${message.payloadString}`);
      t_temp = message.payloadString;
    } else if (message.destinationName === "sensor/dust") {
      this.pushText(`dust: ${message.payloadString}`);
      t_dust = message.payloadString;
    }

    if (t_dust !== 0) {
      console.log(t_gas, t_temp, t_dust);
    }
  };
  componentDidMount() {
    this.setState({ gas: t_gas, temp: t_temp, dust: t_dust });
  }

  render() {
    const { text, client, gas, temp, dust } = this.state;
    console.log(text);

    return (
      <PushPresenter
        Subconsole={this.Subconsole}
        refresh={this.refresh}
        text={this.text}
        gas={gas}
        temp={temp}
        dust={dust}
      />
    );
  }
}
