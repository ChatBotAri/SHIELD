import React from "react";
import {
  StyleSheet,
  Text,
  Slider,
  TouchableOpacity
} from "react-native";
import { withNavigation, withNavigationFocus } from "react-navigation";
import styled from "styled-components";
import Layout from "../../constants/Layout";
import MapView, { Polyline } from "react-native-maps";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import { Platform } from "@unimodules/core";


const ASPECT_RATIO = Layout.width / Layout.height;
const LATITUDE_DELTA = 0.002;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MainContainer = styled.View`
  flex: 1;
`;

const Container = styled.ScrollView``;

const MapContainer = styled.View`
  height: ${Layout.height * 0.4};
  width: ${Layout.width * 0.9};
  margin: 0 20px 0 20px;
  border-radius: 15px;
  border: 1px solid black;
`;
const TimerDistanceContatiner = styled.View`
  height: ${Layout.height * 0.2};
  width: ${Layout.width * 0.9};
  border-radius: 35px;
  border: 2px solid black;
  margin: 20px;
`;

const SliderView = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const ComponentTitleContainer = styled.View`
  margin: 20px 20px 10px 20px;
  width: ${Layout.width * 0.7};
`;

const ComponentTitleText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  padding-left: 10px;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 30px;
  align-items: center;
`;

const Component = styled.View`
  width: ${Layout.width * 0.9};
  height:50px;
  background-color: #eeffcc;
  border-radius: 25px;
  padding: 10px 30px;
  flex-direction: row;
  align-items: center;
  border:1px solid green;
`;

const ComponentText = styled.Text`
  font-weight: bold;
  color: green;
  font-size: 16px;
`;
const Body = styled.View`
  padding-top: 10px;
  width: 100%;
  padding-bottom: 30px;
  margin-left: 20px;
`;

const TextBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const TimeContainer = styled.View`
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;
const StartStopContainer = styled.View`
  height: 50%;
  padding: 10px;
  flex-direction: row;
  justify-content: space-around;
`;
const TitleBox = styled.View`
  padding-left: 20px;
  padding-top: 15px;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 20px;
`;

const TitleText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: black;
`;
const Header = styled.View`
  height: ${Layout.height * 0.3};
`;

const Btn = styled.TouchableOpacity`
  width:30%;
  background-color:#2dcf93;
  border-radius:20;
  justify-content:center;
  align-items:center;
`;

const options = {
  container: {
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    color: "black",
    fontWeight:"bold",
    marginLeft: 7,
  },
};

const HealthPresenter = ({
  pastStepCount,
  currentStepCount,
  coordinates,
  repeat,
  finish,
  isStopwatchStart,
  resetStopwatch,
  startStopStopWatch,
  funcresetStopwatch,
  getFormattedTime,
  initLatitude,
  initLongitude,
  setGoalDistance,
  goalDistance,
  currentDistance,
  isDisabled,
  fullTime,
  getFullTime,
  speed,
  movingDistance,
  kcal,
  stored,
  getKcal
}) => (
  <MainContainer>
    <Container>
      <TitleBox>
        <TitleText>Training</TitleText>
      </TitleBox>
      <TimerDistanceContatiner>
        <TimeContainer>
          <Stopwatch
            laps
            start={isStopwatchStart}
            reset={resetStopwatch}
            options={options}
            
            getTime={time => {
              getFormattedTime();
              fullTime = time;
            }}
          />
        </TimeContainer>

        <StartStopContainer>
          <Btn
            onPress={() => {
              Promise.all([startStopStopWatch()]).then(
                () => {
                  isStopwatchStart ? getKcal(fullTime) : null
                  repeat();
                },
              );
            }}
          >
            <Text style={{ fontSize: 20,  fontWeight:"600",color:"white" }}>
              {!isStopwatchStart ? "START" : "STOP"}
            </Text>
          </Btn>
          <Btn
            onPress={() => {
              Promise.all([funcresetStopwatch(), getFullTime(fullTime)]).then(
                () => {
                  finish();
                },
              );
            }}
          >
            <Text style={{ fontSize: 20,fontWeight:"600" ,color:"white" }}>RESET</Text>
          </Btn>
        </StartStopContainer>
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
          <Polyline
            coordinates={coordinates}
            strokeColor={"#000"} // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={6}
          ></Polyline>
        </MapView>
      </MapContainer>

      <ComponentTitleContainer>
        <ComponentTitleText>목표거리</ComponentTitleText>
      </ComponentTitleContainer>
      <SliderView>
        {currentDistance ? (
          <Text style={{fontSize:20,fontWeight:"bold"}}>{String(currentDistance / 1000) + " km"}</Text>
        ) : (
          <Text style={{fontSize:20,fontWeight:"bold"}}>{String(goalDistance / 1000) + " km"}</Text>
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
      <ComponentTitleContainer>
        <ComponentTitleText>운동 결과 </ComponentTitleText>
      </ComponentTitleContainer>

      {!stored ? (
        <Header style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "#cccccc", fontSize: 22 }}>
            "Health" 탭의 사용자 정보를
          </Text>
          <Text style={{ color: "#cccccc", fontSize: 22 }}>입력해주세요!</Text>
        </Header>
      ) : (
        <Body>
          <ComponentContainer>
            <Component >
              <TextBox>
                <ComponentText>평균 속력</ComponentText>
                <ComponentText>{speed} km/h</ComponentText>
              </TextBox>
            </Component>
          </ComponentContainer>
          <ComponentContainer>
            <Component >
              <TextBox>
                <ComponentText>소모 칼로리</ComponentText>
                <ComponentText>{kcal} kcal</ComponentText>
              </TextBox>
            </Component>
          </ComponentContainer>
          <ComponentContainer>
            <Component >
              <TextBox>
                <ComponentText>운동 거리</ComponentText>
                <ComponentText>{movingDistance} km</ComponentText>
              </TextBox>
            </Component>
          </ComponentContainer>
          <ComponentContainer>
            <Component >
              <TextBox>
                <ComponentText>오늘의 걸음 수</ComponentText>
                <ComponentText>
                  {Platform.OS == "ios" ? pastStepCount : currentStepCount} 걸음
                </ComponentText>
              </TextBox>
            </Component>
          </ComponentContainer>
        </Body>
      )}
    </Container>
  </MainContainer>
);
export default withNavigation(HealthPresenter);
