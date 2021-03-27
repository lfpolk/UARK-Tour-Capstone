import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
 

//export default function App() {
const Home = ({
    navigation,
}) => (
    <View style={styles.container}>
      <Image source={require("../assets/uarkLogo.png")} style = {styles.uarkLogo}/>
      <Text style={styles.selectTour}>Select Tour</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Tour', {name: 'Main Campus Tour'})} style={styles.buttonContainer}> 
        <Text style={styles.optionButtons}> Main Campus </Text>
      </TouchableOpacity >

      <TouchableOpacity onPress={() => navigation.navigate('Tour', {name: 'Residence Hall Tour'})} style={styles.buttonContainer}> 
        <Text style = {styles.optionButtons}> Residence </Text>
      </TouchableOpacity >

      <TouchableOpacity onPress={() => navigation.navigate('Tour', {name: 'Fraternity Tour'})} style={styles.buttonContainer}> 
        <Text style = {styles.optionButtons}> Fraternity </Text>
      </TouchableOpacity >
      <TouchableOpacity onPress={() => navigation.navigate('Tour', {name: 'Sorority Tour'})} style={styles.buttonContainer}> 
        <Text style = {styles.optionButtons}> Sorority </Text>
      </TouchableOpacity >

    </View>
)

const onPressMain = () => console.log("Main Campus")
const onPressResidence = () => console.log("Residence")
const onPressFraternity = () => console.log("Fraternity")
const onPressSorority = () => console.log("Sorority")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  uarkLogo: {
    marginBottom: 40,
  },

  selectTour: {
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
