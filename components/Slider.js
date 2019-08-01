import React from "react";
import propType from "prop-types";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import Layout from "../constants/Layout";

const SWIPER_HEIGHT = Layout.height / 3;

const SliderContainer = styled.View`
  height: ${SWIPER_HEIGHT};
  margin: 15px;
  padding-top:20px;
  padding-left:10px;
  border-radius: 40;
  background-color:yellowgreen;
`;

const Text = styled.Text``;

const Slider = () => (
  <SliderContainer>
    <Swiper
      autoplay={true}
      autoplayTimeout={3}
    >
      <Text>First</Text>
      <Text>Second</Text>
      <Text>Third</Text>
    </Swiper>
  </SliderContainer>
);

Slider.propType = {};

export default Slider;
