import React from "react";
import FoodPresenter from "./FoodPresenter";
import axios from "axios";
import Loader from "../../components/Loader";
import {AsyncStorage} from "react-native";

export default class FoodContainer extends React.Component {
  constructor() {
    super();
    this.loadData();
    this.state = {
      fill:60,
      nutrient:{kcal:0,carbs:0,protein:0,fat:0},
      BreakfastNut:{kcal:20,carbs:0,protein:0,fat:0},
      LunchNut:{kcal:25,carbs:0,protein:0,fat:0}

    };
  }
  changeValue = (nutrient) => {
    this.setState({
      nutrient,
      BreakfastNut:nutrient

    });
    AsyncStorage.setItem("Nut",JSON.stringify(nutrient));
  };
  loadData =async()=>{
    const Data =await AsyncStorage.getItem("Nut");
    const JsonData = JSON.parse(Data);
    this.setState({nutrient:JsonData}) 
  };

  render() {
    const { nutrient,fill,BreakfastNut,LunchNut } = this.state;
    return (
      <FoodPresenter
        changeValue={this.changeValue.bind(this)}
        fill={fill}
        nutrient={nutrient}
        BreakfastNut={BreakfastNut}
        LunchNut={LunchNut}
      />
    );
  }
}
