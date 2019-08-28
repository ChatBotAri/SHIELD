import React from "react";
import styled from "styled-components";
import propType from "prop-types";
import Layout from "../constants/Layout";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

const date = new Date();

const day = ["일", "월", "화", "수", "목", "금", "토"];

const WeatherSlide = ({ name, temperature, sunset, sunrise, area }) => (
  <Container>
    <BgImage source={require("../constants/Images/sunny.jpg")} />
    <View style={styles.leftContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: "50%",
          justifyContent: "space-around"
        }}
      >
        <Text style={styles.temperature}>
          {temperature}
          <MaterialCommunityIcons
            size={45}
            name="temperature-celsius"
            color="white"
          />
        </Text>
        <MaterialCommunityIcons
          size={70}
          name={WeatherOptions[name].iconName}
          color="white"
        />
      </View>
      <View style={{ height: "50%", flexDirection: "row" }}>
        <View style={styles.sunrise}>
          <Text style={styles.nameText}>일출</Text>
          <MaterialCommunityIcons
            size={50}
            name="weather-sunset-up"
            color="white"
          />
          <Text style={styles.nameText}>
            0{new Date(sunrise * 1000).getHours()} :{" "}
            {new Date(sunrise * 1000).getMinutes()}
          </Text>
        </View>
        <View style={styles.sunset}>
          <Text style={styles.nameText}>일몰</Text>

          <MaterialCommunityIcons
            size={50}
            name="weather-sunset-down"
            color="white"
          />
          <Text style={styles.nameText}>
            {new Date(sunset * 1000).getHours()} :{" "}
            {new Date(sunset * 1000).getMinutes()}
          </Text>
        </View>
      </View>
    </View>
    <View style={styles.rightContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>
          {date.getMonth() + 1} / {date.getDate()}{" "}
        </Text>
        <Text style={styles.date}>{day[date.getDay()]}요일</Text>
      </View>
      <View style={styles.areaContainer}>
        <Text style={styles.date}>{area}</Text>
      </View>
    </View>
  </Container>
);

const styles = StyleSheet.create({
  temperature: {
    color: "white",
    fontSize: 70
  },
  date: {
    fontSize: 20,
    color: "white",
    fontWeight:"bold"
  },
  leftContainer: {
    width: "70%"
  },
  rightContainer: {
    width: "30%",
    justifyContent:"space-around"
  },
  sunrise: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%"
  },
  sunset: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%"
  },
  nameText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold"
  },
  dateContainer:{
    alignItems:"center",
    justifyContent:"center"
  },
  areaContainer:{
    alignItems:"center",
    justifyContent:"center"
  }

});

const WeatherOptions = {
  Thunderstorm: {
    iconName: "weather-lighting"
  },
  Drizzle: {
    iconName: "weather-hail"
  },
  Rain: {
    iconName: "weather-pouring"
  },
  Snow: {
    iconName: "weather-snowy"
  },
  Clear: {
    iconName: "weather-sunny"
  },
  Clouds: {
    iconName: "weather-cloudy"
  },
  Dust: {
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
