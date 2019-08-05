import React from "react";
import ChatPresenter from "./ChatPresenter";
import { StyleSheet } from "react-native";
import { DanbeeApi, a } from "../../api";

export default class ChatContainer extends React.Component {
  state = {
    welcomeResult: null,
    error: null
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
  render() {
    const { loading, welcomeResult } = this.state;
    console.log(welcomeResult);
    return <ChatPresenter loading={loading} welcomeResult={welcomeResult} />;
  }
}
