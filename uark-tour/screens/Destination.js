import React, {useState, useEffect} from 'react';
import MapView, {Polyline, Marker, Image} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'; 
import locations from '../destinations.json';
//import Geolocation from '@react-native-community/geolocation';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { LocationGeofencingEventType } from 'expo-location';

const Destination = ({
    navigation,
}) => {

    const [region, setRegion] = useState({
        latitude: 36.068689,
        longitude: -94.175169,
        latitudeDelta: 0.00322,
        longitudeDelta: 0.00121
      });

    return (
    <View style={styles.container}>
        <Text>Tour Page!</Text>
        <MapView
        provider={MapView.PROVIDER_GOOGLE} 
        initialRegion={region}
        style={styles.mapStyle} 
        >
    <TouchableOpacity onPress={() => navigation.navigate('Tour')} style={styles.buttonContainer}> 
    <Text style={styles.nextButton}>{`Next \nStop`}</Text>
      </TouchableOpacity >
      <View style={styles.buildingPage}>
        <Text style={styles.buldingTitle}>Union</Text>
      </View>
        </MapView>
    </View>
    
    );
    };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionButtons: {
        color: '#000',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center'
      },

    buildingTitle: {
        color: '#000'
    },

    buildingPage: {
        
        backgroundColor: '#fff',
        marginTop: 200,
        borderRadius: 50,
        alignSelf: 'center',
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').height - 100
    },
    
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    nextButton: {
        color: '#BE2A2A',
        fontSize: 18,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        borderWidth: 2,
        overflow: 'hidden',
        top: 50,
        paddingTop: 8,
        textAlign: 'center',
        height: 62,
        borderColor: '#BE2A2A',
        width: 60,
        //textAlignVertical: 'center'
        //borderColor: '#000'
      },
      buttonContainer: {
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
      }
  });

export default Destination;