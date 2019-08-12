import React from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import styled from "styled-components";
import { BG_COLOR, GREY_COLOR } from "../../constants/Colors";
import propType from "prop-types";
import Message from "../../components/Message";

const Container = styled.ScrollView`
  background-color: ${BG_COLOR};
  /* flex-direction: column-reverse; */
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 1);
`;
const Input = styled.TextInput`
  background-color: #f2f2f2;
  width: 82%;
  border-radius: 10px;
  padding: 10px;
  margin: 8px;
`;

const Btn = styled.TouchableOpacity`
  background-color: yellow;
  border: 2px solid black;
  border-radius: 10px;
  width: 45px;
  height: 30px;
  margin-right: 20px;
  align-items: center;
  justify-content: center;
`;

const BtnText = styled.Text`
  font-size: 13px;
  font-weight: 600;
`;

const DanbeeContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

const DanbeeMsg = styled.View`
  background-color: #2ff7ed;
  padding: 10px;
  border-radius: 10;
  margin: 10px;
  max-width: 220px;
`;

const DanbeeText = styled.Text``;

const TimeText = styled.Text`
  font-size: 10px;
  color: ${GREY_COLOR};
`;

const ChatPresenter = ({
  newMsg,
  controllNewMsg,
  addMsg,
  sendMsg,
  welcomeResult,
  Messages,
  date,
  sendResult
}) => (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    enabled
    behavior="padding"
    keyboardVerticalOffset={65}
  >
    <Container
      ref={ref => (this.Container = ref)}
      onContentSizeChange={() => {
        this.Container.scrollToEnd({ animated: false });
      }}
    >
      <DanbeeContainer>
        <DanbeeMsg>
          <Text>
            {welcomeResult
              ? welcomeResult.data.responseSet.result.result[1].message
              : null}
          </Text>
        </DanbeeMsg>
        <TimeText>
          {date.getHours() < 13
            ? `오전 ${
                date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
              }`
            : `오후 ${
                date.getHours() - 12 < 10
                  ? `0${date.getHours() - 12}`
                  : date.getHours() - 12
              }`}
          {date.getMinutes() < 10
            ? `:0${date.getMinutes()}`
            : `:${date.getMinutes()}`}
        </TimeText>
      </DanbeeContainer>
      {Object.values(Messages).map(message => (
        <Message key={message.id} {...message} />
      ))}
    </Container>
    <InputContainer>
      <Input
        onChangeText={controllNewMsg}
        value={newMsg}
        autoFocus={false}
        placeholder="Type a message ..."
        multiline={true}
      />
      <Btn
        onPress={() => {
          addMsg();
          sendMsg();
        }}
      >
        <BtnText>Send</BtnText>
      </Btn>
    </InputContainer>
  </KeyboardAvoidingView>
);

ChatPresenter.propType = {
  newMsg: propType.string.isRequired,
  controllNewMsg: propType.func.isRequired,
  addMsg: propType.func.isRequired,
  Messages: propType.object.isRequired,
  welcomeResult: propType.string.isRequired,
  date: propType.object.isRequired
};

const styles = StyleSheet.create({});

export default ChatPresenter;
