import React from "react";
import {AsyncStorage} from "react-native";
import { Pedometer } from "expo-sensors";
import HealthPresenter from "./HealthPresenter";

export default class HealthContainer extends React.Component {
  constructor(){
    super();
    // AsyncStorage.clear();
    // this.loadData();
    this.state={
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount:0,
    }

  }


  loadData =async()=>{
    const Data =await AsyncStorage.getItem("Steps");
    const JsonData = JSON.parse(Data);
    console.log(JsonData)
    if(JsonData){
      this.setState({currentStepCount:JsonData});
    }
    else{
      this.setState({currentStepCount:0});
    }
  
};
  componentDidMount() {
    this._subscribe();
  }

  componentWillMount(){
    this.loadData();

  }

  componentWillUnmount() {
    // this._unsubscribe();
  }

  _subscribe = () => {
    console.log("실행스")
    this._subscription = Pedometer.watchStepCount(result => {
      let currentStepCount =this.state.currentStepCount+result.steps;
      AsyncStorage.setItem("Steps", String(currentStepCount));
      console.log("a")
      this.setState({
        currentStepCount,
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result),
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error,
        });
      },
    );

    const end = new Date();
    const start = new Date();
    // start.setDate(end.getDate() - 1);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);

    console.log(start+"/"+end)
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error,
        });
      },
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    const {
      isPedometerAvailable,
      pastStepCount,
      currentStepCount,
    } = this.state;
    return (
      <HealthPresenter
        isPedometerAvailable ={isPedometerAvailable}
        pastStepCount = {pastStepCount}
        currentStepCount ={currentStepCount}
      ></HealthPresenter>
    );
  }
}
