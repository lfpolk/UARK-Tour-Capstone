import React, {useContext} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, LogBox } from 'react-native';
import axios from 'axios';
import { PauseContext, Context } from "../App";
LogBox.ignoreAllLogs()
console.log = console.warn = console.error = () => {};
// home page 

var locations = []
const Home = ({
    navigation
}) => {

  //create the pause variables for the tour
  const [context, setContext] = useContext(Context);
  const [pauseContext, setPauseContext] = useContext(PauseContext);

// show the main screen with options to all tours and free roam. In all tours pass in the data collected from the mongoDB api
return (
    <View style={styles.container}>

      {pauseContext[0] && (
              <TouchableOpacity onPress={() => navigation.navigate('Tour', {name: pauseContext[1]})} style={styles.returnButton}> 
              <Text style={styles.buttons}>{`Return to tour`}</Text>
            </TouchableOpacity >
      )}
    <TouchableOpacity onPress={() => {
                axios.get('https://uark-tour-db-server.herokuapp.com/all', {
                })
                .then(function (response) {
                  locations = response.data;
                  navigation.navigate('FreeRoam', {
                    locations: locations, 
                    })
                })
                .catch(function (error) {
                  console.log(error);
                })
                .then(function () {
                  
                }); 

        }} style={styles.returnButton}> 
              <Text style={styles.buttons}>{`Free Roam`}</Text>
            </TouchableOpacity >
      <Image source={require("../assets/uarkLogo.png")} style = {styles.uarkLogo}/>

      <Text style={styles.selectTour}>Select Tour</Text>

      <TouchableOpacity onPress={() => {
                axios.get('https://uark-tour-db-server.herokuapp.com/', {
                  params: {
                    inputTour: "main"
                  }
                })
                .then(function (response) {
                  locations = response.data;
                  setContext([locations, 0]);
                  navigation.navigate('Tour', {
                    name: 'Main Campus Tour', 
                    })
                })
                .catch(function (error) {
                  console.log(error);
                })
                .then(function () {
                  
                }); 

        }} style={styles.buttonContainer}>
    
        <Text style={styles.optionButtons}> Main Campus </Text>
      </TouchableOpacity >

      <TouchableOpacity onPress={() => {
        axios.get('https://uark-tour-db-server.herokuapp.com/', {
          params: {
            inputTour: "residence"
          }
        })
        .then(function (response) {
          locations = response.data;
          setContext([locations, 0]);
          navigation.navigate('Tour', {
            name: 'Residence Hall Tour', 
            })
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
  
          }); 
        }} style={styles.buttonContainer}>
    
        <Text style = {styles.optionButtons}> Residence </Text>
      </TouchableOpacity >

      <TouchableOpacity onPress={() => {

        axios.get('https://uark-tour-db-server.herokuapp.com/', {
          params: {
            inputTour: "fraternity"
          }
        })
        .then(function (response) {
          locations = response.data;
          setContext([locations, 0]);
          navigation.navigate('Tour', {
            name: 'Fraternity Tour', 
            })
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
  
        }); 
        }} style={styles.buttonContainer}>
    
        <Text style = {styles.optionButtons}> Fraternity </Text>
      </TouchableOpacity >


      <TouchableOpacity onPress={() => {

        axios.get('https://uark-tour-db-server.herokuapp.com/', {
          params: {
            inputTour: "sorority"
          }
        })
        .then(function (response) {
          locations = response.data;
          setContext([locations, 0]);
          navigation.navigate('Tour', {
            name: 'Sorority Tour', 
            })
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {

        }); 
        }} style={styles.buttonContainer}>

        <Text style = {styles.optionButtons}> Sorority </Text>
        </TouchableOpacity >

    </View>
)

      }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  logoText: {

  },

  returnContainer: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },



  buttons: {
    marginBottom: 10,
    color: '#BE2A2A',
    fontSize: 18,
    backgroundColor: '#fff',
    padding: 13,
    paddingHorizontal: 60,
    borderRadius: 10,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: '#BE2A2A'
  },

  uarkLogo: {
    marginBottom: 40,
    width: 200,
    height: 95,
    resizeMode: 'contain'
  },

  selectTour: {
    marginTop: -30,
    paddingVertical: 20,
    width: '55%',
    textAlign: 'center',
    backgroundColor:'#000',
    borderRadius: 4,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: '#BE2A2A',
    color: '#fff',
    fontSize: 18
  },

  optionButtons: {
    color: '#000',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonContainer: {
    alignItems: 'center',
    marginTop: 25,
    height: 44,
    width: '55%',
    backgroundColor:'#BE2A2A',
    borderRadius: 22,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: '#000',
    justifyContent: 'center',
  }
});

export default Home;
