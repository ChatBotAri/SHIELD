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
    sendResult: null,
    error: null,
    date: new Date()
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
            createAt: new Date(),
            isDanbee: false
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

  sendMsg = async (sendResult, error) => {
    const { newMsg } = this.state;
    console.log("1");
    if (newMsg !== "") {
      try {
        sendResult = await DanbeeApi.getAnswer(newMsg);
      } catch (error) {
        error = "Can't get Answer";
      } finally {
        this.setState({ sendResult, error });
        console.log(sendResult);
      }
      this.setState(prevState => {
        const ID = uuidv1();
        const newMsgObj = {
          [ID]: {
            id: ID,
            text: sendResult.data.responseSet.result.result[1].message,
            createAt: new Date(),
            isDanbee: true
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
    const { newMsg, Messages, welcomeResult, sendResult, date } = this.state;
    return (
      <ChatPresenter
        welcomeResult={welcomeResult}
        sendResult={sendResult}
        date={date}
        newMsg={newMsg}
        controllNewMsg={this.controllNewMsg}
        addMsg={this.addMsg}
        sendMsg={this.sendMsg}
        Messages={Messages}
      />
    );
  }
}
