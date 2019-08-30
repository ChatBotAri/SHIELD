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
    fineDust:null,
    CurrentPosition:null,
    Weather:null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const Weather = await this.getWeather(
          position.coords.latitude,
          position.coords.longitude
        );
        console.log(Weather);

        const Dust = await this.getDust(
          position.coords.latitude,
          position.coords.longitude
        );
        console.log(Dust);
        fineDust = Dust.list[0].pm10Value;  
        
        const CurrentPosition = await this.getLocalname(
          position.coords.latitude,
          position.coords.longitude
          
        )
        console.log(CurrentPosition);

        this.setState({ Weather, fineDust , CurrentPosition,weatherLoaded: true,});
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
    console.log(Station.list[0].stationName);
    const { data: Dust } = await axios.get(
      `http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${encodeURI(Station.list[0].stationName)}&dataTerm=daily&pageNo=1&numOfRows=1&ServiceKey=${DATA_KEY}&ver=1.3&_returnType=json`
    );
    return Dust;
  };

  getLocalname=async(lat,long)=>{
    const {data:local} = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${long}&y=${lat}`,
    {
      headers: {
        Authorization: `KakaoAK ${KAKAO_KEY}`
      }
    });
    

    return local.documents[1].address_name;

  }
  getWeather = async(lat,long)=>{
    const {data:local} = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${long}&y=${lat}`,
    {
      headers: {
        Authorization: `KakaoAK ${KAKAO_KEY}`
      }
    });
    console.log(local);
    
    console.log(local.documents[1].code);
    const localCode = local.documents[1].code;
    const localName = local.documents[1].region_3depth_name;

    console.log(local.documents[1].address_name);

    console.log(localCode.substring(0,5));
    const {data: XY } = await axios.get(`http://www.kma.go.kr/DFSROOT/POINT/DATA/leaf.${localCode.substring(0,5)}.json.txt`);

    console.log(XY);

    var x=0,y=0;

    for(let i=0;i<XY.length;i++){
      if(localName==XY[i].value){
        x=XY[i].x;
        y=XY[i].y;
        break;
      }
    }
    console.log(x,y);
    const date = new Date();

    const CurrentTime = date.getFullYear().toString()+(date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1)+date.getDate();
    
    const baseTime=()=> {
      if(date.getHours()<4){
        return "0200";
      }
      else if(date.getHours()<11)
      return "0500";
      else if(date.getHours()<15)
      return "0800";
      else if(date.getHours()<17)
      return "1100";
      else if(date.getHours()<20)
      return "1400";
      else if(date.getHours()<23)
      return "1700";
      else
        return "2000";
    };
    
    


    const {data:Weather}= await axios.get(`http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?base_date=${CurrentTime}&base_time=${baseTime()}&nx=${x}&ny=${y}&_type=json&ServiceKey=${DATA_KEY}`);

    console.log(Weather);
    return Weather.response.body.items;
  }
  

  render() {
    const { weatherLoaded,Weather ,fineDust,CurrentPosition} = this.state;
    return weatherLoaded ? (
      <HomePresenter
        CurrentPosition={CurrentPosition}
        fineDust={fineDust}
        Weather={Weather}
      />
    ) : (
      <Loader />
    );
  }
}
