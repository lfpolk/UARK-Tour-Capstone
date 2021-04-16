import React, {useState, useEffect} from 'react';
import MapView, {Polyline, Marker, Image} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'; 
import locations from '../destinations.json';
//import Geolocation from '@react-native-community/geolocation';
import * as Permissions from 'expo-permissions';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

const Tour = ({
    navigation, route
}) => {

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
        console.log(route.params.testProp);
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
          latitude: 36.321410732129166, 
          longitude: -94.15284966387985
          //latitude : locations.markers[1].location[0], 
          //longitude: locations.markers[1].location[1]
        }
    }
    

    return (
    <View style={styles.container}>
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

        
    <TouchableOpacity onPress={() => navigation.navigate('Destination', {destination: locations.markers[0].name})} style={styles.buttonContainer}> 
        <MaterialIcons name="delete" size={12} color="red" />
        <Text style={styles.nextButton}>{`Next \nStop`}</Text>
      </TouchableOpacity >
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
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height - 30,
    },
    nextButton: {
        fontSize: 18,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: '#BE2A2A',
        borderRadius: 22,
        borderWidth: 2,
        overflow: 'hidden',
        marginTop: 40,

        paddingTop: 8,
        textAlign: 'center',
        height: 62,
        borderColor: '#fff',
        width: 60,
        

        //textAlignVertical: 'center'
        //borderColor: '#000'
      },
      buttonContainer: {
        justifyContent: 'flex-end',
        position: 'absolute'
      }}
    
);

export default Tour;

/*<Polyline
		coordinates={[
			{ latitude: latitude, longitude: longitude },
			{ latitude: locations.markers[0].location[0], longitude: locations.markers[0].location[1] }
		]}
		strokeColor="#000"
		strokeColors={[
			'#B24112',
			'#B24112', 
			'#B24112',
			'#E5845C',
			'#238C23',
			'#7F0000'
		]}
		strokeWidth={6}
	/>

    <Marker
        coordinate={{ 
            latitude : locations.markers[0].location[0], 
            longitude: locations.markers[0].location[1],
         }}> 

    </Marker>
*/