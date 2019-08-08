import React from "react";
import ChatPresenter from "./ChatPresenter";
import { StyleSheet } from "react-native";
import { DanbeeApi } from "../../api";
import uuidv1 from "uuid/v1";

export default class ChatContainer extends React.Component {
  state = {
    newMsg: "",
    Messages: {},
    welcomeResult: null,
    error: null,
    date:new Date()
  };

  async componentWillMount() {
    let welcomeResult, error;
    try {
      welcomeResult = await DanbeeApi.getWelcome();
    } catch (error) {
      error = "Can't get Welcome.";
    } finally {
      this.setState({
        welcomeResult,
        error
      });
    }
  }


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
            createAt: new Date()
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
    const { newMsg, Messages, welcomeResult,date } = this.state;
    console.log(Messages);
    return (
      <ChatPresenter
        welcomeResult={welcomeResult}
        date={date}
        newMsg={newMsg}
        controllNewMsg={this.controllNewMsg}
        addMsg={this.addMsg}
        Messages={Messages}
      />
    );
  }
}
