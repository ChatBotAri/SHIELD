import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";
import AwesomeButton from "react-native-really-awesome-button";

export default class DialogTester extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  state = {
    dialogVisible: false,
  };

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };

  render() {
    const { btnName, name } = this.props;
    return (
      <View>
        <AwesomeButton
          onPress={this.showDialog}
          width={btnName === "측정" || btnName === "입력" ? 40 : 70}
          height={btnName === "측정" || btnName === "입력" ? 40 : 40}
          borderRadius={btnName === "측정" || btnName === "입력" ? 50 : 20}
          style={
            btnName === "측정" || btnName === "입력"
              ? null
              : { marginRight: 12 }
          }
        >
          <Text style={{ fontWeight: "bold" }}>{btnName}</Text>
        </AwesomeButton>
        {btnName === "직접입력" || btnName === "입력" ? (
          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>{name}</Dialog.Title>
            <Dialog.Description>
              빈칸에 {name}을 입력해주세요.
            </Dialog.Description>
            <Dialog.Input />
            <Dialog.Button label="취소" onPress={this.handleCancel} />
            <Dialog.Button label="입력" onPress={this.handleDelete} />
          </Dialog.Container>
        ) : (
          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>{name}</Dialog.Title>
            <Dialog.Description>
              {name}을 측정하고 있습니다.
            </Dialog.Description>
            <Dialog.Button label="확인" onPress={this.handleCancel} />
          </Dialog.Container>
        )}
      </View>
    );
  }
}
