import React from "react";
import SearchDetailPresenter from "./SearchDetailPresenter";

export default class SearchDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: { changePartValue, result,partNut  },
        },
      },
    } = props;

    this.state = {
      changePartValue,
      
      result,
      partNut
    };
  }

  render() {
    const { result,changePartValue,partNut } = this.state;
    return (
      <SearchDetailPresenter
        result={result}
        changePartValue={changePartValue}
        partNut={partNut}
      />
    );
  }
}
