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


const Column = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 15px;
`;
const Btn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 500;
  padding-right: 15px;
`;

const TitleContainer = styled.View`
  padding-top: 25px;
  padding-bottom: 15px;
  padding-left: 25px;
`;

const TitleText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${TAB_COLOR};
`;

const StateContainer = styled.View`
  width: 30%;
  /* height: 60px; */
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const StateView = styled.View`
  padding-left: 10px;
  align-items: center;
`;
const StateTitle = styled.Text`
  padding-bottom: 10px;
  font-size: 10px;
`;

const StateValue = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const HomePresenter = ({
  navigation,
  Dust,
  Weather,
  CurrentPosition,
  refresh,
  News,
}) => (
  // <LinearGradient colors={["#ffffff", "#ffffff"]} style={{ flex: 1 }}>
  <>
    <ScrollView contentContainerStyle={styles.container}>
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
  
    </ScrollView>

  </>
  // </LinearGradient>
);

const styles = StyleSheet.create({
  btn: {
    height: Layout.height / 10,
    width: Layout.width * 0.8,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: "#286153",
    shadowOpacity: 1.0,
    shadowOffset: { width: 10, height: 10 },
  },
  container: {
    // backgroundColor: "#2dcf93",
  },
});

HomePresenter.propType = {
  Weather: propType.object.isRequired,
  CurrentPosition: propType.string.isRequired,
  refresh: propType.func.isRequired,
  Dust: propType.object.isRequired,
};

export default withNavigation(HomePresenter);
