import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { withNavigation } from "react-navigation";
import styled from "styled-components";
import Layout from "../../constants/Layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

const MainContainer = styled.View`
  flex: 1;
`;

const Container = styled.ScrollView`
  
`;

const CircleContainer = styled.View`
  padding-top: 12px;
  align-items: center;
  padding-bottom: 25px;
`;

const CircleText = styled.Text`
  color: #2dcf93;
  font-size: 50px;
  font-weight: bold;
`;

const HealthPresenter = ({
  isPedometerAvailable,
  pastStepCount,
  currentStepCount,
}) => (
  <MainContainer>
    <Container>
    <CircleContainer>
      <AnimatedCircularProgress
        size={Layout.width*0.65}
        width={20}
        fill={(currentStepCount)}
        backgroundWidth={25}
        backgroundColor="#eeffcc"
        tintColor="#2dcf93"
        rotation={0}
      >
        {fill => (
          <>
            <CircleText>{Math.floor(currentStepCount)}</CircleText>
            <SubText>kcal</SubText>
          </>
        )}
      </AnimatedCircularProgress>
    </CircleContainer>
      <Text>
        Pedometer.isAvailableAsync(): {isPedometerAvailable}
      </Text>
      <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
    </Container>

    
  </MainContainer>
);
export default withNavigation(HealthPresenter);