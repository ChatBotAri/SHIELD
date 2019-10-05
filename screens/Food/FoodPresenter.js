import React from "react";
import styled from "styled-components";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { withNavigation } from "react-navigation";

const Container = styled.View`
  flex:1;
`;

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
  font-size: 50px;
  font-weight: bold;
`;
const SubText = styled.Text`
  color: #2dcf93;
  font-size: 20px;
  font-weight: 400;
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

const NutName = styled.Text`
  font-size: 20px;
  font-weight: 600;
  text-decoration-line:underline;
  text-decoration-color:green;
  padding-bottom:10px;
`;
const NutValue = styled.Text`
  font-size:17px;
  font-weight:400;
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
  /* border-width:1px; */
  /* border-color:#2dcf93; */
  /* border-color:yellow; */
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
        size={230}
        width={20}
        fill={(nutrient.kcal / myNut) * 100}
        backgroundWidth={25}
        backgroundColor="#eeffcc"
        tintColor="#2dcf93"
        rotation={0}
      >
        {fill => (
          <>
            <CircleText>{Math.floor(nutrient.kcal)}</CircleText>
            <SubText>kcal</SubText>
          </>
        )}
      </AnimatedCircularProgress>
    </CircleContainer>
    <NutContainer>
      <NutBox>
        <NutName>탄수화물</NutName>
        <NutValue>{nutrient.carbs} g</NutValue>
      </NutBox>
      <NutBox>
        <NutName>단백질</NutName>
        <NutValue>{nutrient.protein} g</NutValue>
      </NutBox>
      <NutBox>
        <NutName>지방</NutName>
        <NutValue>{nutrient.fat} g</NutValue>
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
