import React, {useState, useContext } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, LogBox } from 'react-native'; 
import MapViewDirections from 'react-native-maps-directions';
import { useTheme } from '@react-navigation/native';
import { PauseContext, Context } from "../App";
LogBox.ignoreAllLogs()
console.log = console.warn = console.error = () => {};

// main page for all the tours

const Tour = ({
    navigation, route
}) => {

  // set the variable name = to what tour you are in 
  const { name } = route.params

  // set variables to pause tour
  const [pauseContext, setPauseContext] = useContext(PauseContext);
  const [context, setContext] = useContext(Context);

  //set locations array and the order array
  const locations = context[0];
  const order = context[1]

  //set the currentOrder = index for the tour 
  const [currentOrder, setCurrentOrder] = useState(order)
  
  //check if the app has updated 
  const [hasUpdated, setHasUpdated] = useState(false)

  const { colors } = useTheme();

  // initalize destination object
  const [destination, setDestination] = useState(
    
      {...destination,
        distance: 100,
        reached: false
      }
    )
  
  // set the newdestinatio = to the  location object with the correct index
  const newDestination = locations[order]

    //create variable for my position for location to show on map  
    const [myPosition, setMyPosition] = useState(null);

    // set region for map to show the correct area
    const [region, setRegion] = useState({
        latitude: 36.068689,
        longitude: -94.175169,
        latitudeDelta: 0.00322,
        longitudeDelta: 0.00121
      });

    // check if the location changes if so change myposition on map
    const onUserLocationChange = async (event) => {

      setMyPosition(event.nativeEvent.coordinate);    
    }
    
    // when directions are found check the distance from location to destination
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

    // get the coordinations for the current location
    const getDestination = () => {
        return {

          latitude : locations[order].inputCoord[0], 
          longitude: locations[order].inputCoord[1]
        }
    }
    
    // display map with tour information 
    return (
      
    <View style={styles.container}>
        <View>
          
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {
          setPauseContext(false)
          navigation.navigate('Home')}} style={styles.exitButton}> 

          <Text style={styles.buttons}>{`Exit Tour`}</Text>
        </TouchableOpacity >
          <TouchableOpacity onPress={() => {
            setPauseContext([true, name])
            navigation.navigate('Home')}} style={styles.pauseButton}> 

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
        >

          
          {destination && locations && (
                  <MapViewDirections
                  
                    origin={myPosition}
                    onReady={onDirectionFound}
                    destination={getDestination()}
                    mode="WALKING"
                    strokeWidth={5}
                    strokeColor="red"
                    apikey='AIzaSyBfRXJU9RpSG_lP74W9OZS9-bm7tG1pUfk'
                  />)
          
                  }
    
          </MapView> 
        
        {destination.reached && (order == currentOrder) &&
        <View>
          {navigation.navigate('Destination', {name: name, destination: newDestination})}
        </View>}

    </View>
    );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  
  mapStyle: {
    flex: 1,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: -10
  },

  blankContainer: {
    flex: 12
  },

  buttonContainer: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    flex: 2,
  },

  buildingPage: {
    backgroundColor: '#BE2A2A',
    alignItems: 'center',
    borderRadius: 50,
    width: Dimensions.get('window').width - 100,
    borderWidth: 2,
    borderColor: '#BE2A2A',
    padding: 20
},
}
);

export default Tour;