import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Modal, Image, Dimensions,TouchableOpacity, Pressable  } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, FlashMode } from 'expo-camera';


var isFirstGet = true;
//default는 App.js에서만 사용해야 하는 듯 
const QRCodeScanner = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  // 모달
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setModalVisible(true)

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }




  return (
    <View style={styles.container}>






      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.container]}
        barCodeTypes={BarCodeScanner.type}

      >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>




        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>Scan your QR code</Text>
        <Image
          style={styles.qr}
          source={require('../../assets/qr_scan.png')}
        />

        <View style={styles.qrassiView}>
          <View style={{ flexDirection: 'row', height: '50%', width: '90%', justifyContent: 'space-between' }}>
            <View style={styles.assi}>
              <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/keypad.png')} />
            </View>
            <View style={styles.assi}>
              <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/flashlight.png')} />
            </View>
          </View>


          <View style={{ height: '50%', width: '100%', alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity
              style={styles.assi}
              onPress={() => navigation.pop()}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>
          </View>


        </View>
      </BarCodeScanner>
    </View>
  );
}
export default QRCodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  qr:{
    marginTop:20,
    width:Dimensions.get('window').width*0.7,
    height:Dimensions.get('window').width*0.7,
  },
  qrassiView:{
    width:Dimensions.get('window').width*0.7,
    height:Dimensions.get('window').height*0.2,
    justifyContent:'center',
    alignItems:'center',
    padding:20, 
  },
  assi:{
    backgroundColor:'white',
    width:'30%',
    height:'100%',
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    padding:15,
  },

});

