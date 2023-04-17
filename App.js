import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef, } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, Alert, Modal, Pressable, Image, TextInput, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import Main from './Pages/Main/Main';
import Main2 from './Pages/Main/Main2';
import Join from './Pages/SignUp/Join';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/SignUp/Login';
import Map from './Pages/Map/Map';
import QRCodeScanner from "./Pages/Scanner/QRCodeScanner";
import UserInfo from "./Pages/Info/UserInfo";
import CameraCheck from './Pages/Scanner/CameraCheck';
import CustMain from "./Pages/Service/CustMain";
import BreakReport from "./Pages/Service/BreakReport";
import MyDonation from "./Pages/Service/MyDonation";
import RentalReturnReport from "./Pages/Service/RentalReturnReport";
import FunctionList from "./Pages/MainFunction/FunctionList";
import Rental from "./Pages/MainFunction/Rental";
import RentalPage from "./Pages/MainFunction/RentalPage";
import ExplainPage from "./Pages/MainFunction/ExplainPage";
import StationWorking from "./Pages/MainFunction/StationWorking";
import Return from "./Pages/MainFunction/Return";

import 'expo-dev-client';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();
// expo install react-native-safe-area-context
// npm install @react-navigation/native
// expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view


export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main2" component={Main2} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Join" component={Join} />
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} />
          <Stack.Screen name="CustMain" component={CustMain} />
          <Stack.Screen name="UserInfo" component={UserInfo} />
          <Stack.Screen name="CameraCheck" component={CameraCheck} />
          <Stack.Screen name="BreakReport" component={BreakReport} />
          <Stack.Screen name="MyDonation" component={MyDonation} />
          <Stack.Screen name="RentalReturnReport" component={RentalReturnReport} />
          <Stack.Screen name="FunctionList" component={FunctionList} />
          <Stack.Screen name="Rental" component={Rental} />
          <Stack.Screen name="RentalPage" component={RentalPage} />
          <Stack.Screen name="ExplainPage" component={ExplainPage} />
          <Stack.Screen name="StationWorking" component={StationWorking} />
          <Stack.Screen name="Return" component={Return} />
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