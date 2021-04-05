import React, {useState, useEffect} from 'react';
import MapView, {Polyline} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native'; 
import locations from '../destinations.json';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


const Tour = ({
    params,
}) => {
    const [location, setLocation] = useState(null);
    const getLocation = async () => {
        try {
          const { granted } = await Location.requestPermissionsAsync();
          if (!granted) return;
          const last = await Location.getLastKnownPositionAsync();
          if (last) setLocation(last);
          else {
            const current = await Location.getCurrentPositionAsync();
            setLocation(current);
            console.log(current.latitude);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getLocation();
      });

    const [region, setRegion] = useState({
        latitude: locations.markers[0].position[0],
        longitude: locations.markers[0].position[1],
        latitudeDelta: 0.00522,
        longitudeDelta: 0.00221
      });

      

    return (
    <View style={styles.container}>
        <Text>Tour Page!</Text>
        <MapView initialRegion={region} 
        style={styles.mapStyle} 
        followsUserLocation={false}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        toolbarEnabled={true}
        zoomEnabled={true}
        rotateEnabled={true}>

        <Polyline
		coordinates={[
			{ latitude: location.latitude, longitude: location.longitude },
			{ latitude: locations.markers[0].position[0], longtitude: locations.markers[0].position[1] }
		]}
		strokeColor="#000"
		strokeColors={[
			'#7F0000',
			'#00000000', 
			'#B24112',
			'#E5845C',
			'#238C23',
			'#7F0000'
		]}
		strokeWidth={6}
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
      height: Dimensions.get('window').height,
    },
  });

export default Tour;
