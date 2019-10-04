import React from "react";
import { Text, Platform } from "react-native";
import styled from "styled-components";
import Layout from "../../constants/Layout";
import Loader from "../../components/Loader";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { withNavigation } from "react-navigation";

const Container = styled.View``;

const TitleContainer = styled.View`
  align-items: center;
  padding-top: 15px;
`;

const Title = styled.Text`
  font-size: 15px;
  font-weight: 600;
`;

const CircleContainer = styled.View`
  padding-top: 12px;
  align-items: center;
  padding-bottom: 25px;
`;

const CircleText = styled.Text`
  color: #2dcf93;
  font-size: 25px;
  font-weight: bold;
`;

const NutContainer = styled.View`
  padding-top: 10px;
  padding-bottom: 40px;
  flex-direction: row;
  justify-content: space-around;
`;
const NutBox = styled.View`
  align-items: center;
  justify-content: center;
`;

const NutText = styled.Text`
  font-size: 15px;
  font-weight: 600;
`;

const CycleContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;
const CycleBox = styled.View`
  align-items: center;
  justify-content: center;
`;

const CycleBtn = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 50;
  background-color: #eeffcc;
  /* border-style:solid; */
  /* border-width:2px; */
  /* border-color:#2dcf93; */
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  width: 40px;
  height: 40px;
`;
const CycleText = styled.Text`
  padding-top: 10px;
  font-size: 15px;
  font-weight: 600;
`;

const FoodPresenter = ({
  navigation,
  nutrient,
  changeValue,
  BreakfastNut,
  LunchNut,
  DinnerNut,
  SnackNut,
  myNut = 2500,
}) => (
  <Container>
    <TitleContainer>
      <Title>권장칼로리 : {myNut} kcal</Title>
    </TitleContainer>
    <CircleContainer>
      <AnimatedCircularProgress
        size={200}
        width={15}
        fill={(nutrient.kcal / myNut) * 100}
        backgroundWidth={25}
        backgroundColor="#eeffcc"
        tintColor="#2dcf93"
        rotation={0}
      >
        {fill => <CircleText>{Math.floor(nutrient.kcal)} kcal</CircleText>}
      </AnimatedCircularProgress>
    </CircleContainer>
    <NutContainer>
      <NutBox>
        <NutText>탄수화물</NutText>
        <NutText>{nutrient.carbs} g</NutText>
      </NutBox>
      <NutBox>
        <NutText>단백질</NutText>
        <NutText>{nutrient.protein} g</NutText>
      </NutBox>
      <NutBox>
        <NutText>지방</NutText>
        <NutText>{nutrient.fat} g</NutText>
      </NutBox>
    </NutContainer>
    <CycleContainer>
      <CycleBox>
        <CycleBtn
          onPress={() =>
            navigation.navigate({
              routeName: "BreakfastScreen",
              params: {
                changeValue,
                BreakfastNut,
                myNut,
              },
            })
          }
        >
          <Image source={require("../../assets/breakfast.png")} />
        </CycleBtn>
        <CycleText>아침</CycleText>
      </CycleBox>
      <CycleBox>
        <CycleBtn
          onPress={() =>
            navigation.navigate({
              routeName: "LunchScreen",
              params: { changeValue, LunchNut, myNut },
            })
          }
        >
          <Image source={require("../../assets/lunch.png")} />
        </CycleBtn>
        <CycleText>점심</CycleText>
      </CycleBox>
      <CycleBox>
        <CycleBtn
          onPress={() =>
            navigation.navigate({
              routeName: "DinnerScreen",
              params: {
                changeValue,
                DinnerNut,
                myNut,
              },
            })
          }
        >
          <Image source={require("../../assets/dinner.png")} />
        </CycleBtn>
        <CycleText>저녁</CycleText>
      </CycleBox>
      <CycleBox>
        <CycleBtn
          onPress={() =>
            navigation.navigate({
              routeName: "SnackScreen",
              params: {
                changeValue,
                SnackNut,
                myNut,
              },
            })
          }
        >
          <Image source={require("../../assets/snack.png")} />
        </CycleBtn>
        <CycleText>간식</CycleText>
      </CycleBox>
    </CycleContainer>
  </Container>
);

export default withNavigation(FoodPresenter);
