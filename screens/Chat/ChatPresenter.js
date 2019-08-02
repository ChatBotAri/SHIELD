import React from "react";
import { Text, KeyboardAvoidingView } from "react-native";
import styled from "styled-components";
import { BG_COLOR, GREY_COLOR } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import propType from "prop-types";

const ChatContainer = styled.ScrollView`
  background-color: yellow;
`;

const InputContainer = styled.View`
  align-items: center;
  background-color: rgba(255, 255, 255, 1);
`;
const Input = styled.TextInput`
  background-color: rgba(200, 200, 200, 2);
  width: ${Layout.width / 1.6};
  border-radius: 20px;
  padding: 10px;
`;

const ChatPresenter = () => (
  <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior="padding">
    <ChatContainer
      contentContainerStyle={{
        justifyContent: "flex-end",
        flex: 1,
        paddingVertical: 50
      }}
    >
      <Text>abc</Text>

      <InputContainer>
        <Input
          // onChangeText={handleSearchUpdate}
          // value={searchTerm}
          autoFocus={true}
          placeholder="Search Movies and tv"
          placeholderTextColor="black"
          multiline={true}
          // onSubmitEditing={onSubmitEditing}
        />
      </InputContainer>
    </ChatContainer>
  </KeyboardAvoidingView>
);

ChatPresenter.propType = {};

export default ChatPresenter;
