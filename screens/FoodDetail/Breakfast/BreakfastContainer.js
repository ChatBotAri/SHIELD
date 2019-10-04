import React from "react";
import BreakfastPresenter from "./BreakfastPresenter";

export default class BreakfastContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: { nutrient, changeValue, BreakfastNut },
        },
      },
    } = props;

    this.state = {
      nutrient,
      changeValue,
      BreakfastNut,
      // BreakfastNut: { kcal: 0, carbs: 0, protein: 0, fat: 0 },
    };
  }

  changePartValue = (BreakfastNut) => {
    this.setState({
      BreakfastNut
    });
    this.state.changeValue(BreakfastNut);
  };

  render() {
    const { BreakfastNut, changeValue, nutrient } = this.state;
    return (
      <BreakfastPresenter
        nutrient={nutrient}
        BreakfastNut={BreakfastNut}
        changeValue={changeValue}
        changePartValue={this.changePartValue}
      />
    );
  }
}
