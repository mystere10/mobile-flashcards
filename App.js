import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './redux/reducers'
import middleWare from './redux/middleware'


const store = createStore(reducer, middleWare)

export default function App() {
  return (
    <Provider store={store}>
        <Text>Welcome</Text>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
