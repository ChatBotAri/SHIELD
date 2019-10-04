import React from "react";
import { Text, Platform } from "react-native";
import styled from "styled-components";
import propType from "prop-types";
import { withNavigation } from "react-navigation";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import Layout from "../../../constants/Layout";
import AwesomeButton from "react-native-really-awesome-button";
import FoodItem from "../../../components/FoodItem";

const MainContainer = styled.View`
  flex: 1;
`;

const Container = styled.View`
  height: 40%;
`;
const ResultContainer = styled.ScrollView`
  height: 60%;
`;

const Header = styled.View`
  padding-top: 20px;
  align-items: center;
  padding-bottom: 20px;
`;

const KcalBax = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

const MyKcal = styled.Text`
  font-size: 40px;
  font-weight: bold;
`;

const Kcal = styled.Text`
  padding-bottom: 15px;
  font-size: 15px;
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
  padding-bottom: 7px;
`;

const Body = styled.View`
  flex-direction: row;
  padding-left: 30px;
  padding-right: 25px;
  justify-content: space-between;
`;

const TitleBox = styled.View``;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;

const BtnText = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

const SnackPresenter = ({
  navigation,
  SnackNut,
  changePartValue,
  changeValue,
  FoodList,
  addSnack,
  myNut
}) => (
  <MainContainer>
    <Container>
      <Header>
        <KcalBax>
          <MyKcal>{SnackNut.kcal}</MyKcal>
          <Kcal> / {myNut*0.05} kcal(권장)</Kcal>
        </KcalBax>
        <ProgressBarAnimated
          width={Layout.width / 1.2}
          value={SnackNut.kcal>myNut*0.05?100:SnackNut.kcal/(myNut*0.05/100)}
          maxValue={500}
          height={20}
          backgroundColor="#2dcf93"
          borderColor="#2dcf93"
        />
      </Header>
      <NutContainer>
        <NutBox>
          <NutText>탄수화물</NutText>
          <NutText>{SnackNut.carbs} g</NutText>
        </NutBox>
        <NutBox>
          <NutText>단백질</NutText>
          <NutText>{SnackNut.protein} g</NutText>
        </NutBox>
        <NutBox>
          <NutText>지방</NutText>
          <NutText>{SnackNut.fat} g</NutText>
        </NutBox>
      </NutContainer>
      <Body>
        <TitleBox>
          <Title>음식리스트</Title>
        </TitleBox>
        <AwesomeButton
          width={80}
          height={30}
          onPress={() =>
            navigation.navigate({
              routeName: "SearchScreen",
              params: {
                changeValue,
                changePartValue,
                partNut: SnackNut,
                addFood: addSnack,
              },
            })
          }
        >
          <Text>+ 음식추가</Text>
        </AwesomeButton>
      </Body>
    </Container>
    <ResultContainer>
      {Object.values(FoodList).map(food => (
        <FoodItem key={food.id} result={food.obj} isMine={true} />
      ))}
    </ResultContainer>
  </MainContainer>
);

SnackPresenter.propType = {};

export default withNavigation(SnackPresenter);
