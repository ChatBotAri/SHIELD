import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import styled from "styled-components";
import Slider from "../../components/Slider";
import { BG_COLOR } from "../../constants/Colors";

const Container = styled.View`
  flex: 1;
  background-color: ${BG_COLOR};
`;

const Column = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;
const BtnContainer = styled.TouchableOpacity`
  padding: 5px;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.View`
  background-color: yellowgreen;
  border-radius: 50px;
  width: 100px;
  height: 100px;
`;

const BtnText = styled.Text`
  color: black;
  font-size: 15px;
`;
const HomePresenter = ({ navigation }) => (
  <Container>
    <Slider />
    <Column>
      <BtnContainer onPress={() => navigation.navigate("ChatScreen")}>
        <Btn />
        <BtnText>Chat</BtnText>
      </BtnContainer>
      <BtnContainer onPress={() => navigation.navigate("MedicineScreen")}>
        <Btn />
        <BtnText>Medicine</BtnText>
      </BtnContainer>
    </Column>
  </Container>
);

export default withNavigation(HomePresenter);
