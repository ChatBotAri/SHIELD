import React from "react";
import propType from "prop-types";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import Layout from "../constants/Layout";
import WeatherSlide from "../components/WeatherSlide";
import { StyleSheet } from "react-native";
import DustSlide from "./DustSlide";

const SWIPER_HEIGHT = Layout.height / 3.3;

const SliderContainer = styled.View`
  margin-top: 20;
  margin-bottom: 15;
  padding-left: 10;
  padding-right: 10;
  height: ${SWIPER_HEIGHT};
`;

const Text = styled.Text``;

const Slider = ({ Dust,Weather,CurrentPosition,refresh }) => (
  <SliderContainer>
    <Swiper
      // height={40}
      style={styles.a}
      autoplay={true}
      autoplayTimeout={3}
    >
      <WeatherSlide
        refresh={refresh}
        Weather={Weather}
        CurrentPosition={CurrentPosition}
      />
      <DustSlide Dust={Dust}
       CurrentPosition={CurrentPosition}/>
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
  Dust:propType.object.isRequired,
  Weather:propType.object.isRequired,
  CurrentPosition:propType.string.isRequired,
  refresh:propType.func.isRequired
};

export default Slider;
