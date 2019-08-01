import React from "react";
import {Text} from "react-native";
import styled from "styled-components";
import { BG_COLOR } from "../../constants/Colors";

const Container =styled.ScrollView`
  flex:1;
  background-color:${BG_COLOR};
`; 

const ChatPresenter=()=>
<Container><Text>Chat</Text></Container>;


export default ChatPresenter;