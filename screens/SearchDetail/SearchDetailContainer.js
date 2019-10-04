import React from "react";
import SearchDetailPresenter from "./SearchDetailPresenter";

export default class SearchDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: { changePartValue, result,partNut ,changeValue,addFood  },
        },
      },
    } = props;

    this.state = {
      changePartValue,
      changeValue,
      addFood,
      
      result,
      partNut
    };
  }

  render() {
    const { result,changePartValue,partNut,changeValue,addFood } = this.state;
    return (
      <SearchDetailPresenter
        result={result}
        changePartValue={changePartValue}
        changeValue={changeValue}
        partNut={partNut}
        addFood={addFood}
      />
    );
  }
}
