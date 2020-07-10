import React, {Component} from 'react'
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./redux/reducers"
import { createAppContainer, } from "react-navigation"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createStackNavigator } from "react-navigation-stack"
import middleware from "./redux/middleware"
import { getDecks, addDeck } from "./redux/actions"
import * as api from "./utils/api"
import mockData from './utils/mockData'
import { FontAwesome5, Entypo } from "@expo/vector-icons"
import { white, purple, red } from './utils/colors'
import { setLocalNotification } from "./utils/helper"
import ListDecks from "./components/ListDecks"
import DisplayDeck from "./components/DisplayDeck"
import CreateCard from './components/CreateCard'
import AddDeck from './components/AddDeck'
import Quiz from "./components/Quiz"

const store = createStore(reducer, middleware)

const Tabs = createBottomTabNavigator({
  Home: {
    screen: ListDecks,
    navigationOptions: {
      tabBarIcon: () => <FontAwesome5 name="list" size={30} color={purple}/>
    }
  },
  AddDeck:{
     screen: AddDeck,
     navigationOptions: {
      tabBarIcon: () => <Entypo name="add-to-list" size={30} color={purple}/>
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: purple,
    style: {
      height: 56,
      shadowColor: 'rgb (0, 0, 0, 0.24)'
    }
  }
})

const stack = createStackNavigator({
  Home: {
    screen: Tabs
  },
  DisplayDeck: {
    screen: DisplayDeck
  },
  CreateCard: {
    screen: CreateCard,
    tabBarOptions: {
      title: 'Add Card'
    }
  },
  Quiz: {
    screen: Quiz,
    tabBarOptions: {
      title: 'Take quiz'
    }
  }
})

const AppContainer = createAppContainer(stack)

export default class App extends Component {
  
  componentDidMount() {
    api.__getDecks().then(result => {
      if (result === null) {
        const key = Date.now
        Object.values(mockData).map((deck) => {
          store.dispatch(addDeck(deck, key))
          api.__AddDeck(deck, key)
        })
      }
      store.dispatch(getDecks(result))
    })
    setLocalNotification()
  }

  render() {

    return (
      <Provider store={store}>
        <AppContainer />     
      </Provider>
    );
  }
}

