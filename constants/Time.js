const date = new Date();

const day = ["일", "월", "화", "수", "목", "금", "토"];

export const Day = date.getFullYear().toString()+"-"+(date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1)+"-"+date.getDate()+"("+day[date.getDay()]+")";

export const Time = date.getHours().toString()+" : "+date.getMinutes();