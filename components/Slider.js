import React from "react";
import propType from "prop-types";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import Layout from "../constants/Layout";
import WeatherSlide from "../components/WeatherSlide";
import { StyleSheet } from "react-native";

const SWIPER_HEIGHT = Layout.height / 3.3;

const SliderContainer = styled.View`
  margin-top: 20;
  margin-bottom: 15;
  padding-left: 10;
  padding-right: 10;
  height: ${SWIPER_HEIGHT};
`;

const Text = styled.Text``;

const Slider = ({ name, temperature, sunrise, sunset, area, fineDust }) => (
  <SliderContainer>
    <Swiper
      // height={40}
      style={styles.a}
      autoplay={true}
      autoplayTimeout={3}
    >
      <WeatherSlide
        name={name}
        temperature={temperature}
        sunrise={sunrise}
        sunset={sunset}
        area={area}
      />
      <Text>{fineDust}</Text>
      <Text>Third</Text>
    </Swiper>
  </SliderContainer>
);

const styles = StyleSheet.create({
  a: {
    height: SWIPER_HEIGHT,
    borderRadius: 50
  }
});

Slider.propType = {
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
  temperature: propType.number.isRequired,
  fineDust: propType.number.isRequired
};

export default Slider;
