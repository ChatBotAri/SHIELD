import React, { Component } from "react";
import PushPresenter from "./PushPresenter";
import client from "../../mqtt";


export default class PushContainer extends Component {
  constructor(props) {
    super(props);
    console.log(client);
    client.subscribe("sensor/#")
    client.onMessageArrived = this.onMessageArrived;

      
    this.state = {
      client,
      text: ["..."],
      connect: false,
      currentHeight: 0,
      currentWeight: 0,
      currentTemp: 0,
      currentHeart: 0,
    };

    // client.subscribe("sensor/#");
  }
  onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
       console.log("connection lost");
       }
  };
  onConnect = () => {
    const { client } = this.state;
    console.log("success");
  };   
  
  onFailure = error => {
    console.log(error);
    console.log("fail");
  };



  onMessageArrived = message => {
    if (message.destinationName === "sensor/height") {
      this.updatePayload(`${parseInt(message.payloadString)}`, "height");
      // t_height = message.payloadString;
       console.log(message.payloadString);
    } else if (message.destinationName === "sensor/weight") {
      this.updatePayload(`${parseInt(message.payloadString)}`, "weight");
      // t_temp = message.payloadString;
    } else if (message.destinationName === "sensor/temp") {
      this.updatePayload(`${parseInt(message.payloadString)}`, "temp");
      // t_dust = message.payloadString;
    } else if (message.destinationName === "sensor/heart") {
      this.updatePayload(`${parseInt(message.payloadString)}`, "heart");
      // t_dust = message.payloadString;
    }
  };
  updatePayload = (Message, topic) => {
    const Current = {
      Data: ({ currentHeight, currentWeight, currentTemp, currentHeart } = this.state),
    };
    if (topic === "height") {
      if (Current.Data.currentHeight !== Message) {
        this.setState({
          currentHeight: Message,
        });
      }
    }
    if (topic === "weight") {
      if (Current.Data.currentWeight !== Message) {
        this.setState({
          currentWeight: Message,
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
    if (topic === "heart") {
      if (Current.Data.currentHeart !== Message) {
        this.setState({
          currentHeart: Message,
        });
      }
    }
  };
  render() {
    const { text, client, connect, currentHeight, currentWeight, currentTemp, currentHeart } = this.state;
    console.log(text);

    return (
      <PushPresenter
        Subconsole={this.Subconsole}
        refresh={this.refresh}
        text={this.text}
        currentHeight={currentHeight}
        currentWeight={currentWeight}
        currentTemp={currentTemp}
        currentHeart={currentHeart}
      />
    );
  }
}
