import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toDoValue: props.text };
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  };

  render() {
    const { toDoValue } = this.state;
    const { text, id } = this.props;
    return (
      <View>
        <Text>{text}</Text>
      </View>
    );
  }
}
