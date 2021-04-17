import React, {useState, useEffect} from 'react';
import MapView, {Polyline, Marker, Image} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'; 
import locations from '../destinations.json';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons'; 
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { useTheme } from '@react-navigation/native';

const Tour = ({
    navigation, route
}) => {

  // Objects will be in route.params.object

  const { colors } = useTheme();

    const [coordinates, setCoordinates] = useState({latitude: 36.068689, longitude: -94.175169});

    useEffect(() => {
        _getLocation();
      }, []);

    _getLocation = async () => {
  
        const { status } = await Permissions.askAsync(Permissions.LOCATION);

        if(status != 'granted'){
            console.log('PERMISSION NOT GRANTED');
        }

        const userLocation = await Location.getCurrentPositionAsync();

        setCoordinates(userLocation.coords);
        console.log("updated location");
    }

    const [region, setRegion] = useState({
        latitude: 36.068689,
        longitude: -94.175169,
        latitudeDelta: 0.00322,
        longitudeDelta: 0.00121
      });
    
    const onUserLocationChange = async (event) => {
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
      console.log("Distance: ", event.distance);
      var LocationReached = false
      if (event.distance < 0.04) {
        LocationReached = true;
      }
      console.log("Location reached ", LocationReached);
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
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.buttonContainer}> 
        <Ionicons name="exit-outline" size={20} color="red" style={styles.exitButton}/>
        <Text style={styles.exitButton}>{`Exit`}</Text>
      </TouchableOpacity >

      <TouchableOpacity onPress={() => navigation.navigate('Destination', {destination: locations.markers[0].name})} style={[styles.buttonContainer, {alignSelf: 'flex-end'}]}> 
        <Text style={styles.exitButton}>{`Temp Dest`}</Text>
      </TouchableOpacity >

        <MapView 
        initialRegion={region}
        provider={MapView.PROVIDER_GOOGLE} 
        style={styles.mapStyle} 
        followsUserLocation={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onUserLocationChange={onUserLocationChange}
        //showsCompass={true}
        //toolbarEnabled={true}
        //zoomEnabled={true}
        //rotateEnabled={true}
        >
        
                  <MapViewDirections
                  
                    origin={coordinates}
                    //destination={{ 
                        //latitude: 36.620910945465315, 
                        //longitude: -94.65278047498794
                        //latitude : locations.markers[1].location[0], 
                        //longitude: locations.markers[1].location[1],
                   // }}
                    onReady={onDirectionFound}
                    destination={getDestination()}
                    mode="WALKING"
                    onStart={(params) => {
                    console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                    }}
                    strokeWidth={5}
                    strokeColor="red"
                    apikey='AIzaSyCdyYaBJkKJAxJr8xaxTqFHtBntn8iCrP8'
                  />
    
        </MapView>
    </View>
    );
    };

const styles = StyleSheet.create({
    container: {
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
      }}
);

export default Tour;