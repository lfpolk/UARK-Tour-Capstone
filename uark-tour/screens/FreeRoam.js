import React, {useState, useEffect, useContext} from 'react';
import MapView, {Polyline, Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'; 



const FreeRoam = ({
    navigation
}) => {

  console.log("made it here")

  const [region, setRegion] = useState({
    latitude: 36.068690788807665,
    longitude: -94.1751556051231,
    latitudeDelta: 0.00422,
    longitudeDelta: 0.00161
  });


    return (
      <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE} 
          initialRegion={region}
          style={styles.mapStyle} 
          scrollEnabled={false}
          ></MapView>

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
      }
  


    });
  
  export default FreeRoam;