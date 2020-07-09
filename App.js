import React from 'react';
import { StyleSheet } from 'react-native';
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/reducers";
import middleware from "./redux/middleware";
import { getDecks, addDeck } from "./redux/actions";
import * as api from "./utils/api";
import mockData from './utils/mockData'

import { createAppContainer, } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import ListDecks from "./components/ListDecks";
import AddDeck from "./components/AddDeck";

import DeckView from "./components/DeckView";
import AddCard from './components/AddCard';
import StartQuiz from "./components/StartQuiz"

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { primaryText, primary, secondary, secondaryDark, white } from './utils/colors';
import { setLocalNotification } from "./utils/common";
const store = createStore(reducer, middleware)


const TabNavigator = createBottomTabNavigator({
  Home: ListDecks,
  AddDeck: AddDeck,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `animation${focused ? '' : '-outline'}`;
      } else if (routeName === 'AddDeck') {
        iconName = `plus-circle${focused ? '' : '-outline'}`;
      }
      return <MaterialCommunityIcons name={iconName} size={25} color={primary} />;
    },
    
  }),
  tabBarOptions: {
    activeTintColor: secondaryDark,
    inactiveTintColor: secondary,
  },
});

const StackNavigator = createStackNavigator({
  Home:TabNavigator,
  DeckView:DeckView,
  AddCard:AddCard,
  StartQuiz:StartQuiz
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: primary,
    },
    headerTintColor: primaryText,
    headerTitleStyle: {
      color: white,
      fontWeight: 'bold',
    },
  },
})

const AppContainer = createAppContainer(StackNavigator)

export default class App extends React.Component {
  
  componentDidMount() {
    api.getDecks().then(result => {
      if (result === null) {
        this.seedmockData()
      }
      store.dispatch(getDecks(result))
    })
    setLocalNotification()
  }

  seedmockData = () => {
    Object.values(mockData).map((d) => {
      let key = Date.now
      store.dispatch(addDeck(d, key))
      api.AddDeck(d, key)
    })
  }

  render() {

    return (
      <Provider store={store}>
        <AppContainer />     
      </Provider>

    );
  }
}

