import React from "react";
import { StyleSheet, Text, ScrollView, Platform } from "react-native";
import { withNavigation } from "react-navigation";
import styled from "styled-components";
import Slider from "../../components/Slider";
import Layout from "../../constants/Layout";
import propType from "prop-types";
import Section from "../../components/Section";
import NewsItem from "../../components/NewsItem";
import TipItem from "../../components/TipItem";
import HospitalItem from "../../components/HospitalItem";
import { Ionicons } from "@expo/vector-icons";

const MainContainer = styled.View`
  flex: 1;
`;

const Container = styled.ScrollView`
  /* margin-bottom: 30px; */
`;
const BotContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 3px;
  padding-right: 10px;
`;

const Btn = styled.TouchableOpacity`
  width: 55;
  align-items: center;
  justify-content: center;
  height: 55;
  border-width: 2px;
  border-color: #005c87;
  border-radius: 50;
  background-color: #219ed9;
`;

const BotText = styled.Text`
  font-size: 16px;
  padding-right: 10px;
  font-weight: bold;
`;

const HomePresenter = ({
  navigation,
  Dust,
  Weather,
  CurrentPosition,
  refresh,
  News,
  // Hospitals,
  // Pharmacys,
  HealthTip,
  FoodTip,
}) => (
  <MainContainer>
    <Container>
      <Slider
        refresh={refresh}
        Dust={Dust}
        Weather={Weather}
        CurrentPosition={CurrentPosition}
      />

      {News ? (
        <Section title="건강뉴스">
          {News.filter(news => news.urlToImage !== null).map(news => (
            <NewsItem
              key={news.title}
              title={news.title}
              poster={
                news.urlToImage.substring(0, 2) === "//"
                  ? news.urlToImage.replace("//", "http://")
                  : news.urlToImage
              }
              author={news.author}
              description={news.description}
              url={news.url}
            />
          ))}
        </Section>
      ) : null}
      {/* {HealthTip ? (
        <Section title="건강 Tip">
          {HealthTip.map(tip => (
            <TipItem
              key={tip.title}
              title={tip.title.replace("<b>", "").replace("</b>", "")}
              poster={tip.thumbnail}
              description={tip.contents.replace("<b>", "").replace("</b>", "")}
              url={tip.url}
            />
          ))}
        </Section>
      ) : null} */}

      {HealthTip ? (
        <Section title="건강정보 Tip">
          {HealthTip.map(tip => (
            <NewsItem
              key={tip.title}
              title={tip.title.replace("<b>", "").replace("</b>", "")}
              poster={tip.thumbnail}
              description={tip.contents.replace("<b>", "").replace("</b>", "")}
              url={tip.url}
            />
          ))}
        </Section>
      ) : null}
      {FoodTip ? (
        <Section title="건강음식 Tip">
          {FoodTip.map(tip => (
            <NewsItem
              key={tip.title}
              title={tip.title.replace("<b>", "").replace("</b>", "")}
              poster={tip.thumbnail}
              description={tip.contents.replace("<b>", "").replace("</b>", "")}
              url={tip.url}
            />
          ))}
        </Section>
      ) : null}

      {/* {Hospitals ? (
      <Section title="가까운 병원">
        {Hospitals.map(Hospital => (
          <HospitalItem
            key={Hospital.yadmNm}
            name={Hospital.yadmNm}
            addr={Hospital.addr}
            distance={(Hospital.distance / 1000).toFixed(1)}
            url={Hospital.hospUrl}
            telno={Hospital.telno}
          />
        ))}
      </Section>
    ) : null}

    {Pharmacys ? (
      <Section title="가까운 약국">
        {Pharmacys.map(Pharmacy => (
          <HospitalItem
            key={Pharmacy.yadmNm}
            name={Pharmacy.yadmNm}
            addr={Pharmacy.addr}
            distance={(Pharmacy.distance / 1000).toFixed(1)}
            url={Pharmacy.hospUrl}
            telno={Pharmacy.telno}
          />
        ))}
      </Section>
    ) : null} */}
    </Container>
    <BotContainer>
      <BotText>약,병원정보가 필요하다면? </BotText>
      <Btn onPress={() => navigation.navigate("ChatScreen")}>
        <Ionicons
          name={Platform.OS === "ios" ? "ios-chatboxes" : "md-chatboxes"}
          size={40}
          color="white"
        />
      </Btn>
    </BotContainer>
  </MainContainer>
);

HomePresenter.propType = {
  Weather: propType.object.isRequired,
  CurrentPosition: propType.string.isRequired,
  refresh: propType.func.isRequired,
  Dust: propType.object.isRequired,
};

export default withNavigation(HomePresenter);
