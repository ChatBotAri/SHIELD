import React from "react";
import HomePresenter from "./HomePresenter";
import Loader from "../../components/Loader";
import axios from "axios";
import { BaseDate, Hours } from "../../constants/Time";

const KAKAO_KEY = "d8d67d3d69ab7f44bc09d1ecf85da1f8";
const DATA_KEY =
  "ok5U7zvwJ2BXvndun5rYy%2BaKAKoWXLE0XXQAU5hAM7AWUimTgWQsEbsPf%2FOzPeegE3jn6iae6On07VQuTW8ZZA%3D%3D";

export default class HomeContainer extends React.Component {
  state = {
    weatherLoaded: false,
    Dust: null,
    CurrentPosition: null,
    Weather: null
  };

  refresh = () => {
    this.componentDidMount();
  };

  componentDidMount() {
    console.log(1);
    navigator.geolocation.getCurrentPosition(
      async position => {
        const local = await this.getLocalname(
          position.coords.latitude,
          position.coords.longitude
        )
        CurrentPosition=local.documents[1].address_name;
        console.log(CurrentPosition);

        const Weather = await this.getWeather(
          local.documents[1].code,
          local.documents[1].region_3depth_name

        );
        console.log(Weather);

        const Dust = await this.getDust(
          position.coords.latitude,
          position.coords.longitude
        );
        console.log(Dust);

        this.setState({ Weather, Dust , CurrentPosition,weatherLoaded: true});
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
      `http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=${TM.documents[0].x}&tmY=${TM.documents[0].y}&ServiceKey=${DATA_KEY}&_returnType=json`
    );
    console.log(Station.list[1].stationName);
    console.log(Station);
    const { data: Dust } = await axios.get(
      `http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${encodeURI(
        Station.list[1].stationName
      )}&dataTerm=daily&pageNo=1&numOfRows=1&ServiceKey=${DATA_KEY}&ver=1.3&_returnType=json`
    );
    return Dust;
  };

  getLocalname = async (lat, long) => {
    const { data: local } = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${long}&y=${lat}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_KEY}`
        }
      }
    );
    return local;
  };
  getWeather = async (localCode, localName) => {
    console.log(localCode.substring(0, 5));
    const { data: XY } = await axios.get(
      `http://www.kma.go.kr/DFSROOT/POINT/DATA/leaf.${localCode.substring(
        0,
        5
      )}.json.txt`
    );

    console.log(XY);

    var x = 0,
      y = 0;

    for (let i = 0; i < XY.length; i++) {
      if (localName == XY[i].value) {
        x = XY[i].x;
        y = XY[i].y;
        break;
      }
    }
    console.log(x, y);

    const baseTime = Hours => {
      if (5 <= Hours && Hours <= 7) return "0200";
      else if (8 <= Hours && Hours <= 10) return "0500";
      else if (11 <= Hours && Hours <= 13) return "0800";
      else if (14 <= Hours && Hours <= 16) return "1100";
      else if (17 <= Hours && Hours <= 19) return "1400";
      else if (20 <= Hours && Hours <= 22) return "1700";
      else if (23 == Hours || Hours <= 1) return "2000";
      else if (Hours <= 4) return "2300";
      else return null;
    };

    const { data: Weather } = await axios.get(
      `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?base_date=${BaseDate}&base_time=${baseTime(
        Hours
      )}&nx=${x}&ny=${y}&_type=json&ServiceKey=${DATA_KEY}&numOfRows=10`
    );
    // console.log(BaseDate);
    console.log(Weather);
    return Weather.response.body.items;
  };

  render() {
    const { weatherLoaded, Weather, Dust, CurrentPosition } = this.state;
    return weatherLoaded ? (
      <HomePresenter
        CurrentPosition={CurrentPosition}
        Dust={Dust}
        Weather={Weather}
        refresh={this.refresh}
      />
    ) : (
      <Loader />
    );
  }
}
