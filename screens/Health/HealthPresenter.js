import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Slider,
} from "react-native";
import { Pedometer } from "expo-sensors";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { withNavigation, withNavigationFocus } from "react-navigation";
import styled from "styled-components";
import Layout from "../../constants/Layout";
import AwesomeButton from "react-native-really-awesome-button";
import Dialog from "react-native-dialog";
import MapView, { Polyline } from "react-native-maps";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";

const ASPECT_RATIO = Layout.width / Layout.height;
const LATITUDE_DELTA = 0.0009;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MainContainer = styled.View`
  flex: 1;
`;

const Container = styled.ScrollView``;

const MapContainer = styled.View`
  height: ${Layout.height * 0.4};
  margin: 10px;
  border-radius: 15px;
  border: 1px solid black;
`;
const TimerDistanceContatiner = styled.View`
  height: ${Layout.height * 0.2};
  border-radius: 15px;
  border: 1px solid black;
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

const SliderView = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;
const SliderText = styled.Text`
  align-text: center;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 30px;
  align-items: center;
`;

const Component = styled.View`
  width: 70%;
  background-color: #eeffcc;
  border-radius: 25px;
  padding: 10px 30px;
  flex-direction: row;
  align-items: center;
`;

const ComponentText = styled.Text`
  font-weight: bold;
  color: green;
  font-size: 15px;
`;
const Body = styled.View`
  padding-top: 30px;
  width: 100%;
  padding-bottom: 30px;
`;

const TextBox = styled.View`
  width: 80%;
  flex-direction: row;
  justify-content: space-between;
`;

const handleTimerComplete = () => alert("Custom Completion Function");
const options = {
  container: {
    // backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    color: "black",
    marginLeft: 7,
  },
};

const HealthPresenter = ({
  isPedometerAvailable,
  pastStepCount,
  currentStepCount,
  dialogVisible,
  handleCancel,
  handleDelete,
  showDialog,
  coordinates,
  repeat,
  finish,
  isTimerStart,
  isStopwatchStart,
  timerDuration,
  resetTimer,
  resetStopwatch,
  startStopTimer,
  funcResetTimer,
  startStopStopWatch,
  funcresetStopwatch,
  getFormattedTime,
  initLatitude,
  initLongitude,
  setGoalDistance,
  goalDistance,
  isPolyline,
  currentDistance,
  isDisabled,
  fullTime,
  getFullTime,
  speed
}) => (
  <MainContainer>
    <Container>
      {/* <TitleContainer>
        <Title>걸음 수 목표 :
        <AwesomeButton
          width={70}
          height={40}
          borderRadius={50}
          style={{ marginRight: 10 }}
          onPress={() => {
            showDialog();
          }}
        >
          <BtnText>입력</BtnText>
        </AwesomeButton>
        <Dialog.Container visible={dialogVisible}>
          <Dialog.Input
            label="걸음 수 목표 설정"
            onChangeText
          
            }}
          ></Dialog.Input>
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              handleCancel();
            }}
          />
          <Dialog.Button
            label="Change"
            onPress={() => {
              setGoalWal
            }}
          />
        </Dialog.Container>
      </TitleContainer> */}
      {/* <CircleContainer>
        <AnimatedCircularProgress
          size={Layout.width * 0.65}
          width={20}
          fill={currentStepCount}
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
        </CircleContainer> */}
      <TimerDistanceContatiner>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              flex: 1,
              marginTop: 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stopwatch
              laps
              msecs
              start={isStopwatchStart}
              //To start
              reset={resetStopwatch}
              //To reset
              options={options}
              //options for the styling
              getTime={time => {
                getFormattedTime();
                fullTime = time;
              }}
            />
            <SliderView>
              {currentDistance ? (
                <Text>{String(currentDistance / 1000) + "km"}</Text>
              ) : (
                <Text>{String(goalDistance / 1000) + "km"}</Text>
              )}
              <Slider
                width={Layout.width * 0.7}
                step={100}
                maximumValue={10000}
                onValueChange={value => {
                  value == 10000 || value == 0
                    ? setGoalDistance(value)
                    : setGoalDistance(value + 100);
                }}
                disabled={isDisabled}
                value={goalDistance}
              ></Slider>
            </SliderView>
          </View>
          {/* <View
            style={{
              flex: 1,
              marginTop: 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Timer 
            totalDuration={this.state.timerDuration} msecs 
            //Time Duration
            start={this.state.isTimerStart}
            //To start
            reset={this.state.resetTimer}
            //To reset
            options={options}
            //options for the styling
            handleFinish={handleTimerComplete}
            //can call a function On finish of the time 
            getTime={this.getFormattedTime} />
          <TouchableHighlight onPress={this.startStopTimer}>
            <Text style={{fontSize: 20, marginTop:10}}>
               {!this.state.isTimerStart ? "START" : "STOP"}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.resetTimer}>
            <Text style={{fontSize: 20, marginTop:10}}>RESET</Text>
          </TouchableHighlight>
          </View> */}
        </View>
      </TimerDistanceContatiner>
      <MapContainer>
        <MapView
          style={StyleSheet.absoluteFill}
          showsUserLocation={true}
          region={{
            latitude: initLatitude,
            longitude: initLongitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {/* <PolylineDirection
            origin={origin}
            destination={destination}
            apiKey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="#12bc00"
          /> */}
          <Polyline
            coordinates={coordinates}
            strokeColor={"#000"} // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={6}
          ></Polyline>
        </MapView>
      </MapContainer>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginTop: 32,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TouchableHighlight
          onPress={() => {
            startStopStopWatch();
            repeat();
          }}
        >
          <Text style={{ fontSize: 20, marginTop: 10 }}>
            {!isStopwatchStart ? "START" : "STOP"}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            Promise.all([funcresetStopwatch(), getFullTime(fullTime)]).then(
              () => {
                finish();
              },
            );
          }}
        >
          <Text style={{ fontSize: 20, marginTop: 10 }}>RESET</Text>
        </TouchableHighlight>
      </View>
      <Body>
        <ComponentContainer>
          <Component style={{ borderWidth: 2, borderColor: "green" }}>
            <TextBox>
              <ComponentText>평균 속력 *</ComponentText>
              <ComponentText>{speed} km/h</ComponentText>
            </TextBox>
          </Component>
        </ComponentContainer>
        <ComponentContainer>
          <Component style={{ borderWidth: 2, borderColor: "green" }}>
            <TextBox>
              <ComponentText>나이 *</ComponentText>
              <ComponentText>25세</ComponentText>
            </TextBox>
          </Component>
        </ComponentContainer>
        <ComponentContainer>
          <Component style={{ borderWidth: 2, borderColor: "green" }}>
            <TextBox>
              <ComponentText>나이 *</ComponentText>
              <ComponentText>25세</ComponentText>
            </TextBox>
          </Component>
        </ComponentContainer>
        <ComponentContainer>
          <Component style={{ borderWidth: 2, borderColor: "green" }}>
            <TextBox>
              <ComponentText>나이 *</ComponentText>
              <ComponentText>25세</ComponentText>
            </TextBox>
          </Component>
        </ComponentContainer>

      </Body>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
    </Container>
  </MainContainer>
);
export default withNavigation(HealthPresenter);
