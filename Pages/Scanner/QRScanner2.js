import React, {Component, useEffect, useState, useRef, Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native';

import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;




import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';


const QRScanner2 = (props) => {
  
    const [scan, setScan] = useState(false);
    const [scanResult, setScanResult] = useState(false);
    const [result, setResult] = useState(null);
  
    const onResult = (data) => {
  
      setResult(data);
  
      setScan(false);
  
      setScanResult(true);
  
    };
  
  
    // QR촬영띄우기
  
    const activeQR = () => {
  
      setScan(true);
  
    };
  
   
  
    const scanAgain = () => {
  
      setScan(true);
  
      setScanResult(false);
  
    };
  
   
  return (
    
  <View style={styles.container}>
  
        <View>
  
          {!scan && !scanResult && (
  
            <TouchableOpacity onPress={activeQR} style={styles.buttonTouchable}>
  
              <Text style={styles.buttonTextStyle}>QR 스캔</Text>
  
            </TouchableOpacity>
  
          )}
  
   
  
          {scanResult && (
  
            <>
  
              <View
  
                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  
                <Text>Result : {result}</Text>
  
                <TouchableOpacity
  
                  onPress={scanAgain}
  
                  style={styles.buttonTouchable}>
  
                  <Text style={styles.buttonTextStyle}>다시스캔</Text>
  
                </TouchableOpacity>
  
              </View>
  
            </>
  
          )}
  
  
          {scan && (
  
                    <View style={{ flex: 1 }}>

                        <QRCodeScanner

                            reactivate={true}

                            showMarker={true}

                            ref={(node) => {

                                scanner.current = node;

                            }}

                            onRead={(e) => result(e.data)}

                        />

                    </View>

                )}

            </View>

        </View>

    );
};

export default QRScanner2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },



  scrollViewStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#99003d'
  },

  textTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'white'
  },
  textTitle1: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'black'
  },
  cardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white'
  },
  scanCardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white'
  },
  buttonScan: {
    width: 42,

  },
  descText: {
    padding: 16,
    textAlign: 'justify',
    fontSize: 16
  },


  highlight: {
    fontWeight: '700',
  },

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonTouchable: {
    fontSize: 21,
    backgroundColor: '#ff0066',
    marginTop: 32,

    width: deviceWidth - 62,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
  }

});