import React from "react";
import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { withNavigation } from "react-navigation";
import styled from "styled-components";
import Slider from "../../components/Slider";
import Layout from "../../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { TAB_COLOR } from "../../constants/Colors";
import propType from "prop-types";
import Section from "../../components/Section";
import NewsItem from "../../components/NewsItem";
import HospitalItem from "../../components/HospitalItem";

const Container = styled.ScrollView`
  margin-bottom:30px;
`;

const HomePresenter = ({
  navigation,
  Dust,
  Weather,
  CurrentPosition,
  refresh,
  News,
  Hospitals,
  Pharmacys,
}) => (
  <Container>
    <Slider
      refresh={refresh}
      Dust={Dust}
      Weather={Weather}
      CurrentPosition={CurrentPosition}
    />

    {News ? (
      <Section title="건강뉴스">
        {News.map(news => (
          <NewsItem
            key={news.title}
            title={news.title}
            poster={news.urlToImage}
            author={news.author}
            description={news.description}
            url={news.url}
          />
        ))}
      </Section>
    ) : null}

    {Hospitals ? (
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
    ) : null}
  </Container>
);

HomePresenter.propType = {
  Weather: propType.object.isRequired,
  CurrentPosition: propType.string.isRequired,
  refresh: propType.func.isRequired,
  Dust: propType.object.isRequired,
};

export default withNavigation(HomePresenter);
