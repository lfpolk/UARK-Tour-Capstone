import React, {useState} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, LogBox} from 'react-native'; 
import { WebView } from 'react-native-webview';
import MapViewDirections from 'react-native-maps-directions';
LogBox.ignoreAllLogs()
console.log = console.warn = console.error = () => {};

//Free Roam page 

const FreeRoam = ({
    navigation, route
}) => {

  //setting locations = to the location passed in
    const { locations } = route.params

  // creating a position state for map to show location
  const [myPosition, setMyPosition] = useState(null);

  const [region, setRegion] = useState({
    latitude: 36.068690788807665,
    longitude: -94.1751556051231,
    latitudeDelta: 0.00422,
    longitudeDelta: 0.00161
  });

  //setting region for map to load over
  const [destination, setDestination] = useState(null)

  //creating temp destination variable to be able to clear the actual destination later, and pass it into the destination page
  var tempDest = destination;

    //set position when it dectes movement of user location 
    const onUserLocationChange = async (event) => {

      setMyPosition(event.nativeEvent.coordinate);

    }

    //when directions are found set the distance from location and destination, also check if the destination is reached 
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

    // get the destination coordinats for direction to show on map
    const getDestination = () => {
        return {

          latitude : destination.inputCoord[0], 
          longitude: destination.inputCoord[1]
        }
    }

    //if there is a destination load the direction to it on the map 
    if(destination)
    {
      return(
        <View>
        <MapView
        initialRegion={region}
        provider={MapView.PROVIDER_GOOGLE} 
        style={{width:'100%', height: '100%'}}
        followsUserLocation={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onUserLocationChange={onUserLocationChange}

        >

          
          {destination && (
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
          {destination.reached && (
          <View>
            {setDestination(null)}
            {navigation.navigate('Destination', {name: "freeroam", destination: tempDest})}

          </View>
          )}
          </View>
      )
    }

    //if there is no destination, show the map with markers
    return (
      <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE} 
          initialRegion={region}
          style={{width:'100%', height: '100%'}}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          >
            {locations.map((locations => 
              (
              <Marker
              coordinate = {{
                latitude: locations.inputCoord[0],
                longitude: locations.inputCoord[1]
              }}
              >
                <Callout tooltip onPress={() => {
                        setDestination(locations)}}>
                  <View>
                    <View style={styles.bubble}>
                      <Text>{locations.inputBuilding}</Text>
                      <WebView style={styles.image} 
                      source={{ uri: locations.inputImg}} />
                    </View>
                  </View>
                </Callout>
              </Marker>
              )))
            }
            
            
          </MapView>

      </View>
    )};
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
      },
      bubble:{
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150
      },
      mapStyle: {
        flex: 1,
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 80,
        zIndex: -10
      },
      image: {
        width:120,
        height: 80
      }
  


    });
  
  export default FreeRoam;