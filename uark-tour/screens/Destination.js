import React, {useState, useContext} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Button, LogBox  } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useTheme } from '@react-navigation/native';
import { Context } from "../App";
LogBox.ignoreAllLogs()
console.log = console.warn = console.error = () => {};



//destination page that will show when location is reached. 

const Destination = ({
    navigation, route
}) => {

//setting destination = to the location passed in 
  const { name,destination } = route.params
  const dest =  destination

  const [context, setContext] = useContext(Context);
  const locations = context[0];
  const order = context[1]

  const { colors } = useTheme();

  //setting region for map to load over
    const [region, setRegion] = useState({
        latitude: dest.inputCoord[0] - 0.001,
        longitude: dest.inputCoord[1],
        latitudeDelta: 0.00422,
        longitudeDelta: 0.00161
      });

      //creating button for learn more link
      const _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync(dest.inputLink);
      };

    //returning content of page
    return (
      <View style={styles.container}>
  <MapView
          provider={MapView.PROVIDER_GOOGLE} 
          initialRegion={region}
          style={styles.mapStyle} 
          scrollEnabled={false}
          ></MapView>
          {(locations.length - 1 > order ) && 
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => {
        setContext([locations, context[1]+1])
        navigation.navigate('Tour', {
          name: name, 
          })
        }}>
      <Text multiline={true} style={[styles.nextButton, {backgroundColor: colors.background}]}>{`Next \nStop`}</Text>
      </TouchableOpacity >
      </View>
          }

      {(name== "freeroam" ) && (!order) &&
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => {
        setContext([locations, context[1]+1])
        navigation.navigate('FreeRoam', {
  
          })
        }}>
      <Text multiline={true} style={[styles.nextButton, {backgroundColor: colors.background}]}>{`Free Roam`}</Text>
      </TouchableOpacity >
      </View>
      }

  {(locations.length - 1 == order ) && 
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => {
        setContext([locations, context[1]+1])
        navigation.navigate('Home', {
  
          })
        }}>
      <Text multiline={true} style={[styles.nextButton, {backgroundColor: colors.background}]}>{`End Tour`}</Text>
      </TouchableOpacity >
      </View>
          }

        <View style={styles.buildingContainer}>
          <View style={[styles.buildingPage, {backgroundColor: colors.background}]}>
            <View style={styles.buildingTitle}>
              <Text style={[styles.buildingTitleText, {color: colors.text}]}>{dest.inputBuilding}</Text>
            </View>
          <Image
          style={styles.buildingImage}
          source={{
            uri: dest.inputImg,
          }}
        />
        <Text style={[styles.buildingDescription, {color: colors.text}]}>{dest.inputDescription}</Text>
        <View style={styles.buildingLink}><Button title="Learn More" onPress={_handlePressButtonAsync}/></View>
        
        </View>
        </View>
  
      </View>
      
      );
      };
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
      },
      
      mapStyle: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: -10
      },
  
      buttonContainer: {
        flex: 5,
        alignSelf: 'flex-end',
      },
  
      nextButton: {
        color: '#BE2A2A',
        fontSize: 18,
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 10,
        borderWidth: 2,
        overflow: 'hidden',
        textAlign: 'center',
        borderColor: '#BE2A2A',
        marginRight: 10,
        marginTop: 20,
      },
  
      buildingContainer: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'flex-end'
      },
  
      buildingPage: {
        alignItems: 'center',
        borderRadius: 50,
        width: Dimensions.get('window').width - 30,
        borderWidth: 2,
        borderColor: '#BE2A2A',
        borderBottomWidth: 0,
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
        padding: 4
    },
  
      buildingTitle: {
          marginTop: 25,
          width: '80%'
      },
  
      buildingTitleText: {
          textAlign: 'justify',
          textShadowColor: 'rgba(0, 0, 0, 0.25)',
          textShadowOffset: {width: -1, height: 1},
          textShadowRadius: 4,
          fontWeight: 'bold',
          fontSize:18
      },
  
      buildingImage: {
        marginTop: 15,
        width: '85%',
        height: '30%'
      },
  
      buildingDescription: {
        marginTop: 15,
        textAlign: 'justify',
        width: '85%',
        fontSize: 16
      },
  
      buildingLink: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: 15,
        color: '#BE2A2A',
      }
    });
  
  export default Destination;