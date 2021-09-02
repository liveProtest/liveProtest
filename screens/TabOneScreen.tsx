import React, { useState, useEffect } from 'react';
import { Button, Alert, SafeAreaView, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import * as Location from 'expo-location';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [errorMsg, setErrorMsg] = useState('');
  const [location, setLocation] = useState(null);
  const [tracking, setTracking] = useState(false);
  
  useEffect(() => {
    // setCurrentLocation();
  }, []); 

  const setCurrentLocation = async () => {
    console.log('setCurrentLocation called');
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      console.log('setCurrentLocation failed');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setTracking(true);
    console.log('setCurrentLocation success');
  };


  return (
    <View  style={styles.container}>
      <Text style={styles.title}>Welcome to live Protest.</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Below will be printed your location.</Text>
      {location ? <Text style={{ fontSize: 20, color: 'red' }}>{location.coords.latitude}, {location.coords.longitude}</Text> : <Text>{errorMsg}</Text>}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="https://github.com/liveProtest/liveProtest" />
      <View style={styles.buttonRecording}>
        <Button title="Start tracking" color="green" disabled={tracking} onPress={() => setCurrentLocation()}/>
        <SeparatorButton/>
        <Button title="Stop tracking" color="red"  disabled={!tracking} onPress={() => Alert.alert('Tracking stopped. (not implemented)')}/>
      </View>
    </View >
  );
}

const SeparatorButton = () => (
  <View style={styles.separatorButton} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  separatorButton: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonRecording: {
    position: 'absolute',
    bottom: '5%',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '90%',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  }
});