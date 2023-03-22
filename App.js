import React, { useEffect, useState,  useRef,} from 'react';
import { Text, View, StyleSheet, Dimensions, Button, Alert, Modal, Pressable, Image, TextInput, Keyboard, KeyboardAvoidingView, } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";



const Stack = createStackNavigator();
const LoginStack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false,tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="Join"
        component={Join}
        options={{headerShown: false,tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="ReissuancePw"
        component={ReissuancePw}
        options={{headerShown: false,tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name="Kakao"
        component={Kakao}
        options={{headerShown: false,tabBarStyle: {display: 'none'}}}
      />
    </Stack.Navigator>
  );
};

export default function App() {


  return (
    <View style={styles.container}>
      <Button title='map'></Button>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerMap: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttons: {
    padding: 5,
    height: "8%",
    flexDirection: 'row',
    widh: "100%",
    justifyContent: 'center',
    marginBottom: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#F7931D',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '80%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  weathertab: {
    width: '100%',
    height: Dimensions.get('window').height * 0.08,
    backgroundColor: 'white',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  takeButton: {
    borderColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: "#ff6600",
    borderRadius: 100
  },
});