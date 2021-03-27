import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack';  
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Tour from './screens/Tour';

const Main = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => (
  <NavigationContainer>
    <Main.Navigator>

      <Main.Screen 
        name="Home" 
        component={Home}
      />

      <Main.Screen 
        name="Tour" 
        component={Tour}
        options={({ route }) => ({ title: route.params.name })}
      />

    </Main.Navigator>


  </NavigationContainer>
);

export default App;