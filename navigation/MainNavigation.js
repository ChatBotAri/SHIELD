import { createAppContainer, createStackNavigator } from "react-navigation";
import TabNavigation from "./TabNavigation";
import MedicineContainer from "../screens/Medicine/MedicineContainer";
import { headerStyles } from "../constants/HeaderStyle";
import ChatContainer from "../screens/Chat/ChatContainer";

const MainNavigation = createStackNavigator(
  {
    TabNavigation: {
      screen: TabNavigation,
      navigationOptions: { title: "App Name", ...headerStyles }
    },
    ChatScreen: {
      screen: ChatContainer,
      navigationOptions: {
        ...headerStyles,
        title: "Chat Bot"
      }
    },
    MedicineScreen: {
      screen: MedicineContainer,
      navigationOptions: {
        title: "Medicine",
        ...headerStyles
      }
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(MainNavigation);
