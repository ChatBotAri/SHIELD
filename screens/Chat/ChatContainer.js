import React from "react";
import ChatPresenter from "./ChatPresenter";
import {StyleSheet} from "react-native";

export default class ChatContainer extends React.Component {
  state={
    Focused:false
  }
  
  render() {
    const {Focused} = this.state;
    return <ChatPresenter />;
  }
}
