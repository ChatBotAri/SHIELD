import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import {
  BG_COLOR,
  TAB_COLOR,
  BG_COLOR2,
  TINT_COLOR,
  BD_COLOR,
} from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import Layout from "../../constants/Layout";
import { withNavigation } from "react-navigation";
import { Platform } from "@unimodules/core";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.ScrollView`
  background-color: ${BG_COLOR2};
`;

const ContainerView = styled.View`
  align-items: center;
`;

const styles = StyleSheet.create({
  btn: {
    height: Layout.height / 10,
    width: Layout.width * 0.8,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: "#286153",
    shadowOpacity: 1.0,
    shadowOffset: { width: 10, height: 10 },
  },
});
const ComponentContainer = styled.View`
  margin-vertical: 20px;
  flex-direction : row;
  justify-content: space-between;
  height: ${Layout.height / 6};
  background-color: ${TINT_COLOR};
  border: 1px solid ${BD_COLOR};
  border-radius: 15px;
  width: 80%;
`;

const MQTTValueView = styled.View`
  s
`;


const ComponentText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${TAB_COLOR};
`;

const MQTTImageView = styled.View`
  width: ${Layout.width * 0.2};
  border : 1px solid black;
  height: ${Layout.height / 6};
  flex-direction : row;
  justify-content: center;
  align-items: center;
`;

const MQTTImage = styled.Image`
`;

const StateContainer = styled.View`
  width: 30%;
  /* height: 60px; */
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const StateView = styled.View`
  padding-left: 10px;
  align-items: center;
`;
const StateTitle = styled.Text`
  padding-bottom: 10px;
  font-size: 10px;
`;

const StateValue = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const Mqttstate = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

//navigation.navigate("MqttScreen")  언제쓸지모름
const PushPresenter = ({
  navigation,
  connect,
  currentGas,
  currentTemp,
  currentDust,
}) => (
  <Container>
    <ContainerView>
      <ComponentContainer>
        <MQTTImageView>
          <MQTTImage source = {require("../../assets/health.png")}></MQTTImage>
        </MQTTImageView>
          <ComponentText>내 건강 지키미</ComponentText>
      </ComponentContainer>
    </ContainerView>
  </Container>
);
export default withNavigation(PushPresenter);
