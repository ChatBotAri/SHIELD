import React from "react";
import { Text } from "react-native";
import propType from "prop-types";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withNavigation, touch } from "react-navigation";
import Layout from "../constants/Layout";

const Container = styled.View`
  align-items: center;
`;

const FoodBtn = styled.TouchableOpacity`
  width: ${Layout.width / 1.2};
  height: 30px;
  border-radius: 10px;
  background-color: #ededed;
  align-items: center;
  margin-bottom: 3px;
  flex-direction: row;
  justify-content: space-between;
`;
const BtnText = styled.Text`
  padding-left: 10px;
`;
const CheckBtn = styled.TouchableOpacity``;

const CheckText = styled.Text`
  font-size: 20px;
  padding-right:10px;
`;

const FoodItem = ({
  result,
  navigation,
  changePartValue,
  changeValue,
  addFood,
  isMine,

  partNut,
}) => (
  <Container>
    <FoodBtn
      onPress={() =>
        navigation.navigate({
          routeName: "SearchDetailScreen",
          params: { result, changePartValue, partNut, changeValue, addFood },
        })
      }
    >
      <BtnText>{result.DESC_KOR[0]}</BtnText>
      <CheckBtn
        onPress={() => {
          navigation.goBack();
        }}
      >
         {/* <CheckText>☑</CheckText> */}
         <CheckText>{isMine?"✖":"☑"}</CheckText>
      </CheckBtn>
    </FoodBtn>
  </Container>
);

FoodItem.propType = {
  result: propType.object.isRequired,
};

export default withNavigation(FoodItem);
