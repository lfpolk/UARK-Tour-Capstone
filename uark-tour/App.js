import React, {useState, useContext} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack';  
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import Home from './screens/Home';
import FreeRoam from './screens/FreeRoam';
import Tour from './screens/Tour';
import Destination from './screens/Destination';
import { Appearance, useColorScheme, AppearanceProvider } from 'react-native-appearance';

export const Context = React.createContext([{}, 0]);
export const PauseContext = React.createContext([false, ""]);



//DarkTheme.colors.background = '#fff';
//theme={colorScheme == 'dark' ? DarkTheme : DefaultTheme}

const Main = createStackNavigator();
DefaultTheme.colors.background = '#fff';
DarkTheme.colors.background = '#000';


//DarkTheme.colors.border = '#fff';

const App = () => {
  const [context, setContext] = useState([{}]);
  const [pauseContext, setPauseContext] = useState([false, ""]);
  const colorScheme = useColorScheme();
  return(
    <AppearanceProvider>
      <Context.Provider value={[context, setContext]}>
      <PauseContext.Provider value={[pauseContext, setPauseContext]}>
      <NavigationContainer theme={colorScheme == 'dark' ? DarkTheme : DefaultTheme}>
        <Main.Navigator>

          <Main.Screen 
            name="Home" 
            component={Home}
            options={({ route }) => ({ headerLeft: ()=> null })}
          />

          <Main.Screen 
            name="Tour" 
            component={Tour}
            options={({ route }) => ({ title: route.params.name, headerLeft: ()=> null })}
          />

          <Main.Screen 
            name="Destination"
            component={Destination}
            options={({ route }) => ({ title: route.params.destination.inputBuilding, headerLeft: ()=> null})}
          />

            <Main.Screen 
            name="FreeRoam"
            component={FreeRoam}
            options={({ route }) => ({ title: 'Free Roam'})}
          />

        </Main.Navigator>


      </NavigationContainer>
      </PauseContext.Provider>
      </Context.Provider>
      </AppearanceProvider>
)};

export default App;