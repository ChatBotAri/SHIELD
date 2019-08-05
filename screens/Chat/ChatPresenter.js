import React from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import styled from "styled-components";
import { BG_COLOR, GREY_COLOR } from "../../constants/Colors";
import propType from "prop-types";

const Container = styled.ScrollView`
  background-color: yellow;
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

const DanbeeChatView = styled.View``;
const DanbeeChat = styled.Text``;

const ChatPresenter = ({ welcomeResult }) => (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    enabled
    behavior="height"
    keyboardVerticalOffset={65}
  >
    <Container
      contentContainerStyle={{
        // justifyContent: "flex-end",
        flex: 1
      }}
    >
      <DanbeeChatView>
        <DanbeeChat>
          {welcomeResult
            ? welcomeResult.data.responseSet.result.result[1].message
            : null}
        </DanbeeChat>
      </DanbeeChatView>
      <View style={{ backgroundColor: "red" }}>
        <Text>abc</Text>
      </View>
    </Container>
    <InputContainer>
      <Input
        // onChangeText={handleSearchUpdate}
        // value={searchTerm}
        autoFocus={false}
        placeholder="Type a message"
        multiline={true}
        // onSubmitEditing={onSubmitEditing}
      />
      <Btn onPress={() => {}}>
        <BtnText>Send</BtnText>
      </Btn>
    </InputContainer>
  </KeyboardAvoidingView>
);

ChatPresenter.propType = {};

export default ChatPresenter;
