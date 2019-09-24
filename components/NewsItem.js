import React from "react";
import { Text } from "react-native";
import propType from "prop-types";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Linking } from "expo";
import { withNavigation,touch } from "react-navigation";

const Container = styled.View`
  margin-right: 20px;
  align-items: center;
  width: 120;
`;
const Image = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 2.5px;
`;

const newsItem = ({ title, poster, navigation, author, description, url }) => (
  <Container>
    <TouchableOpacity
      onPress={() =>
        navigation.navigate({
          routeName: "NewsScreen",
          params: { title, poster, author, url, description },
        })
      }
    >
      <Image source={{ uri: poster }} />
      <Text>{title.length > 32 ? `${title.substring(0, 31)}...` : title}</Text>
    </TouchableOpacity>
  </Container>
);

newsItem.propType = {
  title: propType.string.isRequired,
  poster: propType.string.isRequired,
};

export default withNavigation(newsItem);
