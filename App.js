import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef, } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, Alert, Modal, Pressable, Image, TextInput, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import Main from './Pages/Main/Main';
import Main2 from './Pages/Main/Main2';
import Join from './Pages/SignUp/Join';
import Login from './Pages/SignUp/Login';
import Map from './Pages/Map/Map';
import QRScanner from "./Pages/Scanner/QRScanner";



import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();
// expo install react-native-safe-area-context
// npm install @react-navigation/native
// expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

export default function App() {

  const onPress = () => (console.log('hihi'))
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main2" component={Main2} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Join" component={Join} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="QRScanner" component={QRScanner} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});