import { createAppContainer, createStackNavigator } from "react-navigation";
import TabNavigation from "./TabNavigation";
import { headerStyles } from "../constants/HeaderStyle";
import ChatContainer from "../screens/Chat/ChatContainer";
import NewsScreen from "../screens/News/NewsContainer";

const MainNavigation = createStackNavigator(
  {
    TabNavigation: {
      screen: TabNavigation,
      navigationOptions: { title: "SHIELD", ...headerStyles }
    },
    ChatScreen: {
      screen: ChatContainer,
      navigationOptions: {
        ...headerStyles,
        title: "Chat Bot"
      }
    },
    NewsScreen:{
      screen: NewsScreen,
        navigationOptions:{
          ...headerStyles,
          title:"건강뉴스"
        }
      } 
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(MainNavigation);
