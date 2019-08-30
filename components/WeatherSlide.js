import React from "react";
import styled from "styled-components";
import propType from "prop-types";
import Layout from "../constants/Layout";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Day, Time } from "../constants/Time";
const Container = styled.View`
  flex: 1;
  position: relative;
  flex-direction: row;
`;

const BgImage = styled.Image`
  width: 100%;
  height: ${Layout.height / 3.3};
  opacity: 0.5;
  position: absolute;
  border-radius: 40;
`;

/*
item[0] = POP =강수확률 %
item[1] = PTY = 강수형태 (없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4))
item[5] = SKY = 하늘상태 (맑음(1), 구름많음(3), 흐림(4) )
item[6] = T3H = 기온 
*/

const Cheak = (pty, sky) => {
  if (pty == 0) {
    if (sky == 1) return "맑음";
    else if (sky == 3) return "구름많음";
    else if (sky == 4) return "흐림";
    else return "x";
  } else if (pty == 1) return "비";
  else if (pty == 2) return "진눈개비";
  else if (pty == 3) return "눈";
  else if (pty == 4) return "소나기";
  else return "X";
};
const Btn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: yellow;
  /* width:10px; */
`;

const WeatherSlide = ({ Weather, CurrentPosition }) => (
  <Container>
    <BgImage source={require("../constants/Images/sunny.jpg")} />
    <View
      style={{
        width: "50%",
        alignItems: "center",
        justifyContent: "space-around",
        paddingBottom: 20
      }}
    >
      <MaterialCommunityIcons
        size={120}
        name={
          WeatherOptions[
            Cheak(Weather.item[1].fcstValue, Weather.item[5].fcstValue)
          ].iconName
        }
        color="white"
      />
      <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
        {Cheak(Weather.item[1].fcstValue, Weather.item[5].fcstValue)}
      </Text>
    </View>
    <View style={{ width: "50%", alignItems: "center", paddingVertical: 20 }}>
      <Text style={{ color: "white", paddingBottom: 10 }}>
        {CurrentPosition}
      </Text>
      <Text style={{color:"white"}}>{Day}</Text>
      <View style={{flexDirection:"row"}}>
        <Text style={{color:"white"}}>{Time}</Text>
        <Btn>
          <Text>UPDATE</Text>
        </Btn>
      </View>
      <Text
        style={{
          fontSize: 55,
          color: "white",
          paddingBottom: 20,
          fontWeight: "bold"
        }}
      >
        {Weather.item[6].fcstValue}
        <MaterialCommunityIcons
          size={45}
          name="temperature-celsius"
          color="white"
        />
      </Text>
      <Text style={{ fontSize: 15, color: "white" }}>
        강수확률 : {Weather.item[0].fcstValue}%
      </Text>
    </View>
  </Container>
);
const WeatherOptions = {
  맑음: {
    iconName: "weather-lighting"
  },
  Drizzle: {
    iconName: "weather-hail"
  },
  비: {
    iconName: "weather-pouring"
  },
  X: {
    iconName: "weather-snowy"
  },
  x: {
    iconName: "weather-snowy"
  },
  맑음: {
    iconName: "weather-sunny"
  },
  구름많음: {
    iconName: "weather-cloudy"
  },
  흐림: {
    iconName: "weather-fog"
  },
  Haze: {
    iconName: "weather-fog"
  },
  Mist: {
    iconName: "weather-fog"
  }
};

WeatherSlide.propType = {
  name: propType.oneOf([
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Clear",
    "Clouds",
    "Dust",
    "Haze",
    "Mist"
  ]).isRequired,
  temperature: propType.number.isRequired
};

export default WeatherSlide;
