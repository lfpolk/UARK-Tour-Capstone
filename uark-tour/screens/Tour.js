import React, {useState, useEffect, useContext } from 'react';
import MapView, {Polyline, Marker, Image} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'; 
//import locations from '../destinations.json';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons'; 
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { useTheme } from '@react-navigation/native';
import Destination from './Destination';
import { PauseContext, Context } from "../App";


const Tour = ({
    navigation, route
}) => {

  //const locations =
  const { name } = route.params

  const [pauseContext, setPauseContext] = useContext(PauseContext);
  const [context, setContext] = useContext(Context);

  const locations = context[0];
  const order = context[1]

  console.log(locations[order].inputCoord[0])
  //console.log(type)

  const [currentOrder, setCurrentOrder] = useState(order)
  
  console.log('currentOrder: ' + currentOrder)
  const [hasUpdated, setHasUpdated] = useState(false)

  const { colors } = useTheme();
  const [destination, setDestination] = useState(
    
      {...destination,
        distance: 100,
        reached: false
      }
    )

  const newDestination = locations[order]

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
      setCurrentOrder(order)
      setHasUpdated(true)
    }

    const getDestination = () => {
      console.log("getDest")
      console.log(locations[0])
        return {
          //my house (Osmin)
          //latitude: 36.321410732129166, 
          //longitude: -94.15284966387985
          //union
          latitude : locations[order].inputCoord[0], 
          longitude: locations[order].inputCoord[1]
        }
    }
    

    useEffect(() => {

    }, []);

    var temp = 0;

    return (
      
    <View style={styles.container}>
        <View>
          
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {
          setPauseContext(false)
          navigation.navigate('Home')}} style={styles.exitButton}> 
          {/* <Ionicons name="exit-outline" size={20} color="red" style={styles.exitButton}/> */}
          <Text style={styles.buttons}>{`Exit Tour`}</Text>
        </TouchableOpacity >
          <TouchableOpacity onPress={() => {
            setPauseContext([true, name])
            navigation.navigate('Home')}} style={styles.pauseButton}> 
          {/* <Ionicons name="exit-outline" size={20} color="red" style={styles.exitButton}/> */}
          <Text style={styles.buttons}>{`Pause Tour`}</Text>
        </TouchableOpacity >
        </View>
        <View style={styles.buildingContainer}>
          <View style={styles.buildingPage}>
            <View style={styles.buildingTitle}>
              <Text style={styles.buildingTitleText}>{"Destination: " + locations[order].inputBuilding}</Text>
            </View>

        
        </View>
        </View>

        <View style={styles.blankContainer}></View>
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

          
          {destination && locations && (
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
                  />)
          
                  }
    
          </MapView> 
        
         {destination.reached && (order == currentOrder) &&
         <View>
           {navigation.navigate('Destination', {name: name, destination: newDestination})}
        {/*
        <Destination
          order = {order}
          name = {name}
          newDestination ={newDestination}
          //distance ={destination.distance}
        /> */}
        </View>}

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
    flex: 1,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 80,
    zIndex: -10
  },

  blankContainer: {
    flex: 12
  },

  buttonContainer: {
    alignSelf: 'stretch',
    flex: 1,
    //backgroundColor: "blue",
    //alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: 'red',
    marginTop: 10
  },

  exitButton: {
    marginLeft: 10,
  },

  pauseButton: {
    marginRight: 10,
  },

  buttons: {
    color: '#BE2A2A',
    fontSize: 18,
    backgroundColor: '#fff',
    padding: 13,
    borderRadius: 10,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: '#BE2A2A'
  },
  
  buildingContainer: {
    marginTop: 20,
    //backgroundColor: 'blue',
    flex: 2,
    //flexDirection: 'column',
    //overflow: "hidden",
    //alignItems: 'center'
  },

  buildingPage: {
    backgroundColor: '#BE2A2A',
    alignItems: 'center',
    //backgroundColor: 'white',
    //marginTop: 190,
    borderRadius: 50,
    //alignSelf: 'center',
    width: Dimensions.get('window').width - 100,
    //borderRadius: 10,
    borderWidth: 2,
    borderColor: '#BE2A2A',
    padding: 20
    //flexWrap: 'wrap'
},

  buildingTitle: {
      //flex: 1,
      //position: 'absolute',
      //marginTop: 25,
      //backgroundColor:'yellow',

  }
}
);

export default Tour;