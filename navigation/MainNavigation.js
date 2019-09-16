import { createAppContainer, createStackNavigator } from "react-navigation";
import TabNavigation from "./TabNavigation";
import { headerStyles } from "../constants/HeaderStyle";
import ChatContainer from "../screens/Chat/ChatContainer";

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
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(MainNavigation);
