import React, {useState, useEffect, useContext} from 'react';
import MapView, {Polyline, Marker, Callout} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Pressable, LogBox} from 'react-native'; 
import { WebView } from 'react-native-webview';
import MapViewDirections from 'react-native-maps-directions';
import { call } from 'react-native-reanimated';


const FreeRoam = ({
    navigation, route
}) => {

    const { locations } = route.params

    //console.log(locations)

  console.log("made it here")
  const [myPosition, setMyPosition] = useState(null);

  const [region, setRegion] = useState({
    latitude: 36.068690788807665,
    longitude: -94.1751556051231,
    latitudeDelta: 0.00422,
    longitudeDelta: 0.00161
  });

  const [destination, setDestination] = useState(null)
  var tempDest = destination;

    const onUserLocationChange = async (event) => {

      setMyPosition(event.nativeEvent.coordinate);
      console.log(myPosition)
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
      console.log("getDest")
      console.log(destination)
      //console.log(locations[0])
        return {
          //my house (Osmin)
          //latitude: 36.321410732129166, 
          //longitude: -94.15284966387985
          //union
          latitude : destination.inputCoord[0], 
          longitude: destination.inputCoord[1]
        }
    }

    if(destination)
    {
      return(
        <View>
        <MapView
        initialRegion={region}
        provider={MapView.PROVIDER_GOOGLE} 
        style={{width:'100%', height: '90%'}}
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
                    apikey='AIzaSyCn2J57im0jcfVvIxlWsYNaV5jl1wBHvxQ'
                  />)
          
                  }
                  
    
          </MapView>
          {destination.reached && (
          <View>
            {setDestination(null)}
            {navigation.navigate('Destination', {name: "freeroam", destination: tempDest})}
          {/*
          <Destination
            order = {order}
            name = {name}
            newDestination ={newDestination}
            //distance ={destination.distance}
          /> */}
          </View>
          )}
          </View>
      )
    }

    return (
      <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE} 
          initialRegion={region}
          style={{width:'100%', height: '90%'}}
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
        //display: 'flex',
        flex: 1,
        //backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
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
        //flex: 1,
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