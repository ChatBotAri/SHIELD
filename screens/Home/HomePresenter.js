import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { withNavigation } from "react-navigation";
import styled from "styled-components";
import Slider from "../../components/Slider";
import Layout from "../../constants/Layout";
import { Platform } from "@unimodules/core";
import { Ionicons } from "@expo/vector-icons";
import { TAB_COLOR } from "../../constants/Colors";
import propType from "prop-types";

const Container = styled.View`
  /* flex: 1; */
`;

const Column = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 15px;
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

const HomePresenter = ({
  navigation,
  Dust,
  Weather,
  CurrentPosition,
  refresh
}) => (
  <LinearGradient colors={["#43C6AC", "#F8FFAE"]} style={{ flex: 1 }}>
    {/* <Container> */}
    <Slider
      refresh={refresh}
      Dust={Dust}
      Weather={Weather}
      CurrentPosition={CurrentPosition}
    />
    <Column style={styles.shadow}>
      <LinearGradient colors={["#49ab87", "#36c994"]} style={styles.btn}>
        <Btn onPress={() => navigation.navigate("ChatScreen")}>
          <BtnText>챗봇과 대화하기</BtnText>
          <Ionicons
            size={26}
            name={Platform.OS == "ios" ? "ios-chatboxes" : "md-chatboxes"}
            color="white"
          />
        </Btn>
      </LinearGradient>
    </Column>

    <TitleContainer>
      <TitleText>우리집 한눈에</TitleText>
    </TitleContainer>
    <Column>
      <StateContainer>
        <Ionicons
          name={Platform.OS == "ios" ? "ios-thermometer" : "md-thermometer"}
          size={30}
          color="red"
        />
        <StateView>
          <StateTitle>온도</StateTitle>
          <StateValue>36.5 C</StateValue>
        </StateView>
      </StateContainer>
      <StateContainer>
        <Ionicons
          name={Platform.OS == "ios" ? "ios-water" : "md-water"}
          size={30}
          color="blue"
        />

        <StateView>
          <StateTitle>습도</StateTitle>
          <StateValue>40%</StateValue>
        </StateView>
      </StateContainer>
      <StateContainer>
        <Ionicons
          name={Platform.OS == "ios" ? "ios-cloud" : "md-cloud"}
          size={30}
          color="grey"
        />

        <StateView>
          <StateTitle>미세먼지</StateTitle>
          <StateValue>50</StateValue>
        </StateView>
      </StateContainer>
    </Column>
    {/* </Container> */}
  </LinearGradient>
);

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

HomePresenter.propType = {
  Weather:propType.object.isRequired,
  CurrentPosition:propType.string.isRequired,
  refresh:propType.func.isRequired,
  Dust: propType.object.isRequired
};

export default withNavigation(HomePresenter);
