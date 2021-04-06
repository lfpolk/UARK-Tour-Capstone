import React, {useState, useEffect} from 'react';
import MapView, {Polyline, Marker, Image} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'; 
import locations from '../destinations.json';
//import Geolocation from '@react-native-community/geolocation';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { LocationGeofencingEventType } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';


const Tour = ({
    navigation,
}) => {

    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    useEffect(() => {
        _getLocation();
      });

    _getLocation = async () => {
  

        const { status } = await Permissions.askAsync(Permissions.LOCATION);

        if(status != 'granted'){
            console.log('PERMISSION NOT GRANTED');
        }

        const userLocation = await Location.getCurrentPositionAsync();

        setLatitude(userLocation.coords.latitude);
        setLongitude(userLocation.coords.longitude);
        console.log('updated');
    }

    const [region, setRegion] = useState({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.00322,
        longitudeDelta: 0.00121
      });

      

    return (
    <View style={styles.container}>
        <Text>Tour Page!</Text>
        <MapView 
        provider={MapView.PROVIDER_GOOGLE} 
        style={styles.mapStyle} 
        //followsUserLocation={true}
        showsUserLocation={true}
        //showsMyLocationButton={true}
        //showsCompass={true}
        //toolbarEnabled={true}
        //zoomEnabled={true}
        //rotateEnabled={true}
        >

        <Polyline
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

    <TouchableOpacity onPress={() => navigation.navigate('Destination', {destination: locations.markers[0].name})} style={styles.buttonContainer}> 
        <MaterialIcons name="delete" size={12} color="red" />
        <Text style={styles.nextButton}>{`Next \nStop`}</Text>
      </TouchableOpacity >

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
      height: Dimensions.get('window').height,
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