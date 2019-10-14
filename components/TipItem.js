import React from "react";
import { Text } from "react-native";
import propType from "prop-types";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withNavigation,touch } from "react-navigation";

const Container = styled.View`
  margin-right: 20px;
  align-items: center;
  width: 140;
  padding-left:20px;
`;
const Image = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 2.5px;
    
`;

const TipItem = ({ title, poster, navigation, author, description, url }) => (
  <Container>
    <TouchableOpacity
      onPress={() =>
        navigation.navigate({
          routeName: "NewsScreen",
          params: { title, poster, author, url, description },
        })
      }
    >
      <Image source={{ uri: poster }} resizeMode="stretch"  />
    </TouchableOpacity>
  </Container>
);

TipItem.propType = {
  title: propType.string.isRequired,
  poster: propType.string.isRequired,
};

export default withNavigation(TipItem);
