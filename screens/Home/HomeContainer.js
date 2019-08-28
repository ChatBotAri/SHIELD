import React from "react";
import HomePresenter from "./HomePresenter";
import Loader from "../../components/Loader";
import axios from "axios";

const WEATHER_KEY = "a882dc0d905b05327a1f0db9a2b167df";
const KAKAO_KEY = "d8d67d3d69ab7f44bc09d1ecf85da1f8";
const DATA_KEY =
  "ok5U7zvwJ2BXvndun5rYy%2BaKAKoWXLE0XXQAU5hAM7AWUimTgWQsEbsPf%2FOzPeegE3jn6iae6On07VQuTW8ZZA%3D%3D";

export default class HomeContainer extends React.Component {
  state = {
    weatherLoaded: false,
    temperature: null,
    name: null,
    icon: null,
    fineDust:null,
    sunrise:null,
    sunset:null,
    area :null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const Weather = await this.getWeather(
          position.coords.latitude,
          position.coords.longitude
        );
        console.log(Weather);
        temperature = Weather.main.temp;
        name = Weather.weather[0].main;
        sunrise =Weather.sys.sunrise;
        sunset = Weather.sys.sunset;
        area = Weather.name;

        const Dust = await this.getDust(
          position.coords.latitude,
          position.coords.longitude
        );
        console.log(Dust);
        fineDust = Dust.list[0].pm10Value;  


        this.setState({ temperature, name, fineDust ,sunrise,sunset,area,weatherLoaded: true });
      },
      error => console.log(error)
    );
  }

  getDust = async (lat, long) => {
    const { data: TM } = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${long}&y=${lat}&input_coord=WGS84&output_coord=TM`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_KEY}`
        }
      }
    );
    console.log(TM.documents[0].x, TM.documents[0].y);
    const { data: Station } = await axios.get(
      `http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=${
        TM.documents[0].x
      }&tmY=${TM.documents[0].y}&ServiceKey=${DATA_KEY}&_returnType=json`
    );
    console.log(encodeURI(Station.list[0].stationName))
    console.log(Station.list[0].stationName);
    const { data: Dust } = await axios.get(
      `http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${encodeURI(Station.list[0].stationName)}&dataTerm=daily&pageNo=1&numOfRows=1&ServiceKey=${DATA_KEY}&ver=1.3&_returnType=json`
    );
    return Dust;
  };

  getWeather = async (lat, long) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WEATHER_KEY}&units=metric`
    );
    return data;
  };

  render() {
    const { weatherLoaded, name, temperature ,sunrise,sunset,area,fineDust} = this.state;
    return weatherLoaded ? (
      <HomePresenter
        name={name}
        temperature={Math.floor(temperature)}
        fineDust={fineDust}
        sunrise ={sunrise}
        sunset= {sunset}
        area = {area}
      />
    ) : (
      <Loader />
    );
  }
}
