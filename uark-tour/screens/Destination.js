import React, {useState, useEffect} from 'react';
import MapView, {Polyline, Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useTheme } from '@react-navigation/native';
import locations from '../destinations.json';
//import Geolocation from '@react-native-community/geolocation';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { LocationGeofencingEventType } from 'expo-location';



const Destination = ({
    navigation, newDestination, distance
}) => {

  const { colors } = useTheme();

  /* var inputCoord = [36.06666610956379, -94.17378783417878];
  var inputBuilding = 'J.B. HUNT'; // TRANSPORT SERVICES INC. CENTER FOR ACADEMIC EXCELLENCE (JBHT)
  var inputImg = 'https://www.cdicon.com/assets/uploads/modules/90443-for-web-82055.jpg'
  var inputDescription = 'Departments in this building include Computer Science and Engineering, Walton College of Business, Center For Advanced Spatial Technologies, and High Performance Computing Center.'
  var inputLink = 'https://directory.uark.edu/buildings/73/jbht/j-b-hunt-transport-services-inc-center-for-academic-excellence' */

    const [region, setRegion] = useState({
        latitude: newDestination.inputCoord[0] - 0.001,
        longitude: newDestination.inputCoord[1],
        latitudeDelta: 0.00422,
        longitudeDelta: 0.00161
      });

      const _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync(inputLink);
      };

    useEffect(() => {
      
    }, []);

  


    return (
    <View style={styles.container}>
      <View style={styles.buildingContainer}>
          
        <View style={styles.buildingTitle}>
          <Text style={[styles.buildingTitleText, {color: colors.text}]}>{newDestination.inputBuilding}</Text>
        </View>
        <Image
        style={styles.buildingImage}
        source={{
          uri: newDestination.inputImg,
        }}
        />
        <Text style={[styles.buildingDescription, {color: colors.text}]}>{newDestination.inputDescription}</Text>
        <View style={styles.buildingLink}><Button title="Learn More" onPress={_handlePressButtonAsync}/></View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Tour')}> 
          <Text multiline={true} style={[styles.nextButton, {backgroundColor: colors.background}]}>{distance}</Text>
          </TouchableOpacity >
        </View>

      </View>
    </View>
    
    );
    };

const styles = StyleSheet.create({
    container: {
      //display: 'flex',
      position: 'absolute',
      bottom: 100,
      width: '100%',
      padding: 20,
      height: 500, 

      //backgroundColor: '#fff',
      //justifyContent: 'center',

    },
    buildingContainer: {
      backgroundColor: 'white',
      width: '100%',
      flex: 1,
      borderRadius:10,
      alignItems: 'center'
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
      marginBottom: 15,
      textAlign: 'center',
      width: '85%',

      fontSize: 16
    },


/*     buttonContainer: {
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
    } */
  });

export default Destination;