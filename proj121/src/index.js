import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Main from './pages/main';

const MainNavigator = createStackNavigator({
  Home: {screen: Main},
});

const App = createAppContainer(MainNavigator);

export default App;
