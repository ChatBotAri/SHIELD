import React from "react";
import ChatPresenter from "./ChatPresenter";
import { StyleSheet } from "react-native";
import uuidv1 from "uuid/v1";

export default class ChatContainer extends React.Component {
  state = {
    newMsg: "",
    Messages: {}
  };

  controllNewMsg = text => {
    this.setState({
      newMsg: text
    });
  };

  addMsg = () => {
    const { newMsg } = this.state;
    if (newMsg != "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newMsgObj = {
          [ID]: {
            id: ID,
            text: newMsg,
            createAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newMsg: "",
          Messages: {
            ...prevState.Messages,
            ...newMsgObj
          }
        };
        return { ...newState };
      });
    }
  };

  render() {
    const { newMsg, Messages } = this.state;
    console.log(Messages);
    return (
      <ChatPresenter
        newMsg={newMsg}
        controllNewMsg={this.controllNewMsg}
        addMsg={this.addMsg}
        Messages={Messages}
      />
    );
  }
}
