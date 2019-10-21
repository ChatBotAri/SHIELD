import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import Layout from "../../constants/Layout";
import AwesomeButton from "react-native-really-awesome-button";

const Container = styled.ScrollView`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
`;

const TitleBox = styled.View`
  padding-left: 20px;
  padding-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 20px;
`;

const TitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: green;
`;

const Header = styled.View`
  background-color: #eeffcc;
  border-radius: 25px;
  padding: 10px;
`;

const KcalContainer = styled.View`
  padding: 10px;
  flex-direction: row;
`;

const DataContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 80%;
  align-items: center;
`;

const KcalBarContainer = styled.View`
  width: 100%;
  align-items: center;
  padding-bottom: 20px;
`;

const MainKcalBox = styled.View`
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

const KcalBox = styled.View`
  align-items: center;
`;

const KcalName = styled.Text`
  font-weight: bold;
  font-size: 15px;
  padding-bottom: 15px;
  color: #2dcf93;
`;

const KcalValue = styled.Text`
  font-size: 17px;
  font-weight: 500;
`;

const MainImage = styled.Image`
  width: 80px;
  height: 80px;
`;

const Image = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const Body = styled.View`
  padding-top: 30px;
  width: 100%;
  padding-bottom: 30px;
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

const TextBox = styled.View`
  width: 80%;
  flex-direction: row;
  justify-content: space-between;
`;

const ComponentText = styled.Text`
  font-weight: bold;
  color: green;
  font-size: 15px;
`;

const BtnText = styled.Text`
  font-weight: bold;
`;

const PushPresenter = ({
  navigation,
  connect,
  currentGas,
  currentTemp,
  currentDust,
}) => (
  <Container>
    <TitleBox>
      <TitleText>My condition</TitleText>
      {/* <AwesomeButton width={100} height={30} borderRadius={20}>
        <Text>+ 측정하기</Text>
      </AwesomeButton> */}
    </TitleBox>
    <Header>
      <KcalContainer>
        <MainImage source={require("../../assets/kcal.png")} />
        <DataContainer>
          <KcalBox>
            <KcalName>기초대사량</KcalName>
            <KcalValue>2511</KcalValue>
          </KcalBox>
          <KcalBox>
            <KcalName>소비칼로리</KcalName>
            <KcalValue>3011</KcalValue>
          </KcalBox>
          <KcalBox>
            <KcalName>섭취칼로리</KcalName>
            <KcalValue>2111</KcalValue>
          </KcalBox>
        </DataContainer>
      </KcalContainer>
      <KcalBarContainer>
        <MainKcalBox>
          <MyKcal>2111</MyKcal>
          <Kcal> / 5000 kcal</Kcal>
        </MainKcalBox>
        <ProgressBarAnimated
          width={Layout.width * 0.85}
          value={50}
          maxValue={1000}
          height={20}
          backgroundColor="#2dcf93"
          borderColor="#2dcf93"
        />
      </KcalBarContainer>
    </Header>
    <Body>
      <ComponentContainer>
        <Component>
          <Image source={require("../../assets/age.png")} />
          <TextBox>
            <ComponentText>나이</ComponentText>
            <ComponentText>25세</ComponentText>
          </TextBox>
        </Component>
        <AwesomeButton
          width={70}
          height={40}
          borderRadius={50}
          style={{ marginRight: 10 }}
        >
          <BtnText>입력</BtnText>
        </AwesomeButton>
      </ComponentContainer>
      <ComponentContainer>
        <Component>
          <Image source={require("../../assets/gender.png")} />
          <TextBox>
            <ComponentText>성별</ComponentText>
            <ComponentText>남</ComponentText>
          </TextBox>
        </Component>
        <AwesomeButton
          width={70}
          height={40}
          borderRadius={50}
          style={{ marginRight: 10 }}
        >
          <BtnText>입력</BtnText>
        </AwesomeButton>
      </ComponentContainer>
      <ComponentContainer>
        <Component>
          <Image source={require("../../assets/height.png")} />
          <TextBox>
            <ComponentText>키</ComponentText>
            <ComponentText>180cm</ComponentText>
          </TextBox>
        </Component>
        <AwesomeButton width={40} height={40} borderRadius={50}>
          <BtnText>측정</BtnText>
        </AwesomeButton>
        <AwesomeButton width={40} height={40} borderRadius={50}>
          <BtnText>입력</BtnText>
        </AwesomeButton>
      </ComponentContainer>
      <ComponentContainer>
        <Component>
          <Image source={require("../../assets/weight.png")} />
          <TextBox>
            <ComponentText>몸무게</ComponentText>
            <ComponentText>75kg</ComponentText>
          </TextBox>
        </Component>
        <AwesomeButton width={40} height={40} borderRadius={50}>
          <BtnText>측정</BtnText>
        </AwesomeButton>
        <AwesomeButton width={40} height={40} borderRadius={50}>
          <BtnText>입력</BtnText>
        </AwesomeButton>
      </ComponentContainer>
      <ComponentContainer>
        <Component>
          <Image source={require("../../assets/BMI.png")} />
          <TextBox>
            <ComponentText>BMI</ComponentText>
            <ComponentText>15%</ComponentText>
          </TextBox>
        </Component>
        <AwesomeButton
          width={70}
          height={40}
          borderRadius={50}
          style={{ marginRight: 10 }}
        >
          <BtnText>계산</BtnText>
        </AwesomeButton>
      </ComponentContainer>
      <ComponentContainer>
        <Component>
          <Image source={require("../../assets/temperture.png")} />
          <TextBox>
            <ComponentText>체온</ComponentText>
            <ComponentText>{"36.5도"}</ComponentText>
          </TextBox>
        </Component>
        <AwesomeButton width={40} height={40} borderRadius={50}>
          <BtnText>측정</BtnText>
        </AwesomeButton>
        <AwesomeButton width={40} height={40} borderRadius={50}>
          <BtnText>입력</BtnText>
        </AwesomeButton>
      </ComponentContainer>
      <ComponentContainer>
        <Component>
          <Image source={require("../../assets/heart-rate.png")} />
          <TextBox>
            <ComponentText>심박수</ComponentText>
            <ComponentText>55회/분</ComponentText>
          </TextBox>
        </Component>
        <AwesomeButton width={40} height={40} borderRadius={50}>
          <BtnText>측정</BtnText>
        </AwesomeButton>
        <AwesomeButton width={40} height={40} borderRadius={50}>
          <BtnText>입력</BtnText>
        </AwesomeButton>
      </ComponentContainer>
    </Body>
  </Container>
);
export default withNavigation(PushPresenter);
