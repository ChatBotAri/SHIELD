import React from "react";
import styled from "styled-components";
import propType from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Layout from "../constants/Layout";
import SemiCircleProgress from "../constants/SemiCircleProgress/SemiCircleProgress";
import { Entypo } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  position: relative;
`;

const BgView = styled.View`
  width: 100%;
  height: ${Layout.height / 3.3};
  background-color: #0f73d1;
  position: absolute;
  border-radius: 40;
`;

const MiddleContainer = styled.View`
  padding-top: 10px;
  flex-direction: row;
`;
const LeftContainer = styled.View`
  width: 50%;
  align-items: center;
`;

const RightContainer = styled.View`
  width: 50%;
  align-items: center;
`;
const BottomContainer = styled.View`
  padding: 3px;
  padding-right: 20px;
  align-items: flex-end;
`;

const DustSlide = ({ Dust, CurrentPosition }) => (
  <Container>
    <BgView>
      <MiddleContainer>
        <LeftContainer>
          <Text style={styles.text}>미세먼지</Text>
          <Entypo
            name={DustOptions[Dust.list[0].pm10Grade1h].iconName}
            size={70}
            color="white"
            style={{ paddingBottom: 5 }}
          />
          <SemiCircleProgress
            circleRadius={50}
            progressWidth={10}
            progressShadowColor="#d4d4d4"
            interiorCircleColor="#0f73d1"
            percentage={Number(Dust.list[0].pm10Value) / 1.8}
            progressColor={DustOptions[Dust.list[0].pm10Grade1h].Color}
            interiorCircleStyle={{ paddingBottom: 3 }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
              {Dust.list[0].pm10Value}
            </Text>
          </SemiCircleProgress>
          <Text style={styles.text}>
            {DustOptions[Dust.list[0].pm10Grade1h].State}
          </Text>
        </LeftContainer>
        <RightContainer>
          <Text style={styles.text}>초미세먼지</Text>
          <Entypo
            name={DustOptions[Dust.list[0].pm25Grade1h].iconName}
            size={70}
            color="white"
            style={{ paddingBottom: 5 }}
          />
          <SemiCircleProgress
            circleRadius={50}
            progressWidth={10}
            progressShadowColor="#d4d4d4"
            interiorCircleColor="#0f73d1"
            percentage={Number(Dust.list[0].pm25Value)}
            progressColor={DustOptions[Dust.list[0].pm25Grade1h].Color}
            interiorCircleStyle={{ paddingBottom: 3 }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
              {Dust.list[0].pm25Value}
            </Text>
          </SemiCircleProgress>
          <Text style={styles.text}>
            {DustOptions[Dust.list[0].pm25Grade1h].State}
          </Text>
        </RightContainer>
      </MiddleContainer>
      <BottomContainer>
        <Text style={{ color: "white", fontSize: 10 }}>{CurrentPosition}</Text>
      </BottomContainer>
    </BgView>
  </Container>
);

DustSlide.propType = {
  Dust: propType.object.isRequired,
  CurrentPosition :propType.string.isRequired
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    paddingBottom: 5
  }
});
const DustOptions = {
  1: {
    Color: "green",
    State: "좋음",
    iconName:"emoji-flirt"
  },
  2: {
    Color: "blue",
    State: "보통",
    iconName:"emoji-happy"
  },
  3: {
    Color: "yellow",
    State: "나쁨",
    iconName:"emoji-sad"
  },
  4: {
    Color: "red",
    State: "매우나쁨",
    iconName:"emoji-sad"
  },
  "":{
    Color: "green",
    State: "좋음",
    iconName:"emoji-flirt"
  }

};

export default DustSlide;
