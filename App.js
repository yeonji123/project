import React, { useEffect, useState, useRef, } from 'react';
import { Text, View, StyleSheet, Dimensions, Button, Alert, Modal, Pressable, Image, TextInput, Keyboard, KeyboardAvoidingView, } from 'react-native';


import { QRScanner } from './Pages/Scanner/QRScanner'


import { NavigationContainer } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
// expo install react-native-safe-area-context
// npm install @react-navigation/native
// expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view


export default function App() {


  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='QR' component={QRScanner}/>

      </Stack.Navigator>
    </NavigationContainer>
    

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