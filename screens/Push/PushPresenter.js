import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { BG_COLOR, TAB_COLOR } from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import Layout from "../../constants/Layout";
import { withNavigation } from "react-navigation";
import { Platform } from "@unimodules/core";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.ScrollView`
  flex: 1;
`;
const Btn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 500;
  padding-right: 15px;
`;
const Column = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 15px;
`;
const styles = StyleSheet.create({
  btn: {
    height: Layout.height / 10,
    width: Layout.width * 0.8,
    borderRadius: 10
  },
  shadow: {
    shadowColor: "#286153",
    shadowOpacity: 1.0,
    shadowOffset: { width: 10, height: 10 }
  }
});
const TitleContainer = styled.View`
  padding-top: 25px;
  padding-bottom: 15px;
  padding-left: 25px;
`;

const TitleText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${TAB_COLOR};
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

//navigation.navigate("MqttScreen")  언제쓸지모름
const PushPresenter = ({navigation, Subconsole, currentGas,currentTemp, currentDust, }) => (
  <Container>
    <Column style={styles.shadow}>
      <LinearGradient colors={["#49ab87", "#36c994"]} style={styles.btn}>
        <Btn onPress={() =>
            navigation.navigate({
              routeName: "HealthScreen"
            })
          } 
        >
          
          <BtnText>콘솔 찍기</BtnText>
          
        </Btn>
      </LinearGradient>
    </Column>
    <TitleContainer>
    </TitleContainer>
    <Column>
      <StateContainer>
        {/* <Ionicons
          name={Platform.OS == "ios" ? "ios-thermometer" : "md-thermometer"}
          size={30}
          color="red"
        /> */}
        <StateView>
          <StateTitle>키</StateTitle>
        <StateValue>{currentGas}</StateValue>
        </StateView>
      </StateContainer>
      <StateContainer>
        {/* <Ionicons
          name={Platform.OS == "ios" ? "ios-water" : "md-water"}
          size={30}
          color="blue"
        /> */}

        <StateView>
          <StateTitle>몸무게</StateTitle>
          <StateValue>{currentTemp}</StateValue>
        </StateView>
      </StateContainer>
      <StateContainer>
        {/* <Ionicons
          name={Platform.OS == "ios" ? "ios-cloud" : "md-cloud"}
          size={30}
          color="grey"
        /> */}

        <StateView>
          <StateTitle>체온</StateTitle>
          <StateValue>{currentDust}</StateValue>
        </StateView>
      </StateContainer>
    </Column>
  </Container>
  
);
export default withNavigation(PushPresenter);
