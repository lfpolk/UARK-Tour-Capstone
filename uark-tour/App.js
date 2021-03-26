import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack';  
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Tour from './screens/Tour';

const Main = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Main.Navigator>
      <Main.Screen name="Home" component={Home}/>
      <Main.Screen name="Tour" component={Tour}/>
    </Main.Navigator>
  </NavigationContainer>
);

export default App;