import React from "react";
import LunchPresenter from "./LunchPresenter";

export default class LunchContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: { nutrient, changeValue, LunchNut },
        },
      },
    } = props;

    this.state = {
      nutrient,
      changeValue,
      LunchNut,
      // LunchNut: { kcal: 0, carbs: 0, protein: 0, fat: 0 },
    };
  }

  changePartValue = (LunchNut) => {
    this.setState({
      LunchNut
    });
    // this.state.changeValue(Sum);
  };

  render() {
    const { LunchNut, changeValue, nutrient } = this.state;
    return (
      <LunchPresenter
        nutrient={nutrient}
        LunchNut={LunchNut}
        changeValue={changeValue}
        changePartValue={this.changePartValue}
      />
    );
  }
}
