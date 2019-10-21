import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { withNavigation, withNavigationFocus } from "react-navigation";
import styled from "styled-components";
import Layout from "../../constants/Layout";
import AwesomeButton from "react-native-really-awesome-button";
import Dialog from "react-native-dialog";

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
const SubText = styled.Text`
  color: #2dcf93;
  font-size: 20px;
  font-weight: 400;
`;
const TitleContainer = styled.View`
  align-items: center;
  padding-top: 15px;
`;
const Title = styled.Text`
  font-size: 15px;
  font-weight: 600;
`;
const BtnText = styled.Text`
  font-weight: bold;
`;


const HealthPresenter = ({
  isPedometerAvailable,
  pastStepCount,
  currentStepCount,
  goalWalk,
  setGoalWalk,
  dialogVisible,
  handleCancel,
  handleDelete
}) => (
  <MainContainer>
    {console.log(222222222222222)}
    <Container>
    <TitleContainer>
      <Title>걸음 수 목표 : {goalWalk} walk</Title>
        <AwesomeButton
          width={70}
          height={40}
          borderRadius={50}
          style={{ marginRight: 10 }}
          onPress={() => {
            setGoalWalk();
          }}
          >
          <BtnText>입력</BtnText>
        </AwesomeButton>
      <Dialog.Container visible={dialogVisible}>
        
          <Dialog.Button label="Cancel" onPress={() =>{handleCancel();} }/>
          <Dialog.Button label="Delete" onPress={() => {handleDelete();} }/>
      </Dialog.Container>
    </TitleContainer>
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
            <SubText>walks</SubText>
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