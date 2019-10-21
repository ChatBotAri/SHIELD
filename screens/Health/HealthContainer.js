import React from "react";
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {AsyncStorage} from "react-native";
import { Pedometer } from "expo-sensors";
import HealthPresenter from "./HealthPresenter";
import Layout from "../../constants/Layout";

const ASPECT_RATIO = Layout.width / Layout.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = "AIzaSyD4Ug5uJJIuzhTb2TZpbpXSe1GvZsKPNPE";
export default class HealthContainer extends React.Component {
  constructor(){
    super();
    // AsyncStorage.clear();
    // this.loadData();
    this.state={
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount:0,
      coordinates: [
        {
          latitude: 0,
          longitude: 0,
        },
        {
          latitude: 0,
          longitude: 0,
        },
      ],
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }
    this.mapView = null;
  }
  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
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
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) =>
      this.setState({ latitude, longitude }),
    error => console.log(error)
    );
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
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    } = this.state;
    return (
      <HealthPresenter
        isPedometerAvailable ={isPedometerAvailable}
        pastStepCount = {pastStepCount}
        currentStepCount ={currentStepCount}
        latitude = {latitude}
        longitude = {longitude}
        latitudeDelta = {latitudeDelta}
        longitudeDelta = {longitudeDelta}
        onMapPress ={this.onMapPress}
      ></HealthPresenter>
    );
  }
}
