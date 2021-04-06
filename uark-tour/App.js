import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack';  
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import Home from './screens/Home';
import Tour from './screens/Tour';
import Destination from './screens/Destination';
import { Appearance, useColorScheme, AppearanceProvider } from 'react-native-appearance';
import { color } from 'react-native-reanimated';




//DarkTheme.colors.background = '#fff';
//theme={colorScheme == 'dark' ? DarkTheme : DefaultTheme}

const Main = createStackNavigator();
const Drawer = createDrawerNavigator();
DefaultTheme.colors.background = '#fff';

//DarkTheme.colors.border = '#fff';

const App = () => {

  const colorScheme = useColorScheme();
  return(
    <AppearanceProvider>
      <NavigationContainer theme={colorScheme == 'dark' ? DarkTheme : DefaultTheme}>
        <Main.Navigator>

          <Main.Screen 
            name="Home" 
            component={Home}
          />

          <Main.Screen 
            name="Tour" 
            component={Tour}
            options={({ route }) => ({ title: route.params.name, headerBackTitle: 'Exit Tour' })}
          />

          <Main.Screen 
            name="Destination" 
            component={Destination}
            options={({ route }) => ({ title: route.params.destination, headerLeft: ()=> null})}
          />

        </Main.Navigator>


      </NavigationContainer>
      </AppearanceProvider>
)};

export default App;