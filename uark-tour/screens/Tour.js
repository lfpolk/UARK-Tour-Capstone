import React, {useState, useEffect} from 'react';
import MapView, {Polyline, Marker, Image} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'; 
import locations from '../destinations.json';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons'; 
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { useTheme } from '@react-navigation/native';
import Destination from './Destination';
import axios from 'axios';

const Tour = ({
    navigation, route
}) => {

  // Objects will be in route.params.object

  const { colors } = useTheme();
  const [destination, setDestination] = useState(
    {

    })

    
    

  const [newDestination, setNewDestination] = useState(
    {
      _id: '1',
      inputCoord: [36.06666610956379, -94.17378783417878],
      inputBuilding:'J.B. HUNT',
      inputImg: 'https://www.cdicon.com/assets/uploads/modules/90443-for-web-82055.jpg', 
      inputDescription: 'Departments in this building include Computer Science and Engineering, Walton College of Business, Center For Advanced Spatial Technologies, and High Performance Computing Center.',
      inputLink: 'https://directory.uark.edu/buildings/73/jbht/j-b-hunt-transport-services-inc-center-for-academic-excellence'
    }
  )

    const [myPosition, setMyPosition] = useState(null);

    const [region, setRegion] = useState({
        latitude: 36.068689,
        longitude: -94.175169,
        latitudeDelta: 0.00322,
        longitudeDelta: 0.00121
      });
    
    const onUserLocationChange = async (event) => {
      setMyPosition(event.nativeEvent.coordinate);
      const { latitude, longitude, heading } = event.nativeEvent.coordinate
      try {
        const input = {
          latitude,
          longitude,
          heading,
        }
      } catch (e) {
        console.error(e);
      }
    }
    const onDirectionFound = (event) => {

      if (destination){
        setDestination(
          {...destination,
            distance: event.distance,
            reached: event.distance < 0.02
          }
        )
      }
    }

    const getDestination = () => {
        return {
          //my house (Osmin)
          //latitude: 36.321410732129166, 
          //longitude: -94.15284966387985

          //union
          latitude : locations.markers[1].location[0], 
          longitude: locations.markers[1].location[1]
        }
    }
    

    return (
    <View style={styles.container}>
        <MapView 
        initialRegion={region}
        provider={MapView.PROVIDER_GOOGLE} 
        style={{width: '100%', height: Dimensions.get('window').height - 150}}
        followsUserLocation={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onUserLocationChange={onUserLocationChange}
        //showsCompass={true}
        //toolbarEnabled={true}
        //zoomEnabled={true}
        //rotateEnabled={true}
        >
          {destination && (
                  <MapViewDirections
                  
                    origin={myPosition}
                    //destination={{ 
                        //latitude: 36.620910945465315, 
                        //longitude: -94.65278047498794
                        //latitude : locations.markers[1].location[0], 
                        //longitude: locations.markers[1].location[1],
                   // }}
                    onReady={onDirectionFound}
                    destination={getDestination()}
                    mode="WALKING"
                    strokeWidth={5}
                    strokeColor="red"
                    apikey='AIzaSyAy_CEDrADJm9t4zdf2Dl8othOfzxMsKAc'
                  />
                  )}
    
        </MapView>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.buttonContainer}> 
          {/* <Ionicons name="exit-outline" size={20} color="red" style={styles.exitButton}/> */}
          <Text style={styles.exitButton}>{`Exit Tour`}</Text>
        </TouchableOpacity >

        <TouchableOpacity style={styles.buttonContainer}> 
          <Text style={styles.exitButton}>{destination.distance}</Text>
        </TouchableOpacity >

        </View>
        
         {destination.reached &&
        <Destination 
          newDestination ={newDestination}
          distance ={destination.distance}
        />}
    </View>
    );
    };

const styles = StyleSheet.create({
    bottomContainer: {
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    },
    exitButton: {
      color: '#BE2A2A',
      fontSize: 20,
      margin: -5,
      padding: 5,
      textAlign: 'center',
    },
    buttonContainer: {
        overflow: 'hidden',
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#BE2A2A',
        backgroundColor: 'black',
        padding: 10
      }
    /* container: {
      display: 'flex',
      backgroundColor: '#fff',
      flexDirection: 'row',
      //justifyContent: 'center',
    },
    mapStyle: {
      position: 'absolute',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height - 30,
      zIndex: -10
    },
    exitButton: {
      color: '#BE2A2A',
      fontSize: 20,
      margin: -5,
      padding: 5,
      textAlign: 'center',
    },
      buttonContainer: {
        overflow: 'hidden',
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#BE2A2A',
        backgroundColor: 'black',
        padding: 10
      } */}
);

export default Tour;