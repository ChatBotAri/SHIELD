import React from "react";
import {Text} from "react-native";
import styled from "styled-components";
import { BG_COLOR } from "../../constants/Colors";

const Container =styled.ScrollView`
  flex:1;
  background-color:${BG_COLOR};
`; 


const MedicinePresenter=()=>
<Container>
<Text>Medicine</Text>
</Container>;


export default MedicinePresenter;