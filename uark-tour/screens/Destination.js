import React, {useState, useEffect, useContext} from 'react';
import MapView, {Polyline, Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Button, LogBox  } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useTheme } from '@react-navigation/native';
//import Geolocation from '@react-native-community/geolocation';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { LocationGeofencingEventType } from 'expo-location';
import { Context } from "../App";





const Destination = ({
    navigation, route
}) => {

  console.log("made it here")

  const { name,destination } = route.params
  const dest =  destination
  console.log("YOOOOOOOOOOOO" + destination.length)
  console.log(dest)
  console.log(order)

  const [context, setContext] = useContext(Context);
  const locations = context[0];
  const order = context[1]

  const { colors } = useTheme();

  /* var inputCoord = [36.06666610956379, -94.17378783417878];
  var inputBuilding = 'J.B. HUNT'; // TRANSPORT SERVICES INC. CENTER FOR ACADEMIC EXCELLENCE (JBHT)
  var inputImg = 'https://www.cdicon.com/assets/uploads/modules/90443-for-web-82055.jpg'
  var inputDescription = 'Departments in this building include Computer Science and Engineering, Walton College of Business, Center For Advanced Spatial Technologies, and High Performance Computing Center.'
  var inputLink = 'https://directory.uark.edu/buildings/73/jbht/j-b-hunt-transport-services-inc-center-for-academic-excellence' */

    const [region, setRegion] = useState({
        latitude: dest.inputCoord[0] - 0.001,
        longitude: dest.inputCoord[1],
        latitudeDelta: 0.00422,
        longitudeDelta: 0.00161
      });

      const _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync(dest.inputLink);
      };

    useEffect(() => {
      
    }, []);

  


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
        //display: 'flex',
        flex: 1,
        //backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
      },
      
      mapStyle: {
        //flex: 1,
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 30,
        zIndex: -10
      },
  
      buttonContainer: {
        flex: 5,
        alignSelf: 'flex-end',
        //backgroundColor: 'red'
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
        marginTop: 10,
      },
  
      buildingContainer: {
        //backgroundColor: 'blue',
        flex: 8,
        //flexDirection: 'column',
        //overflow: "hidden",
        alignItems: 'center',
        justifyContent: 'flex-end'
      },
  
      buildingPage: {
        //position: 'relative',
        //flex: 1,
        //justifyContent: 'flex-end',
        //justifyContent: 'center',
        //marginTop: 10,
        alignItems: 'center',
        //backgroundColor: 'white',
        //marginTop: 190,
        borderRadius: 50,
        //alignSelf: 'center',
        width: Dimensions.get('window').width - 30,
        //borderRadius: 10,
        borderWidth: 2,
        borderColor: '#BE2A2A',
        borderBottomWidth: 0,
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
        padding: 4
        //flexWrap: 'wrap'
    },
  
      buildingTitle: {
          //flex: 1,
          //position: 'absolute',
          marginTop: 25,
          //backgroundColor:'yellow',
          width: '80%'
      },
  
      buildingTitleText: {
          textAlign: 'justify',
          //color: '#000',
          textShadowColor: 'rgba(0, 0, 0, 0.25)',
          textShadowOffset: {width: -1, height: 1},
          textShadowRadius: 4,
          fontWeight: 'bold',
          fontSize:18
      },
  
      buildingImage: {
        //flex: 1,
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