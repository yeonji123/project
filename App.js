import React, { useEffect, useState,  useRef,} from 'react';
import { Text, View, StyleSheet, Dimensions, Button, Alert, Modal, Pressable, Image, TextInput, Keyboard, KeyboardAvoidingView, } from 'react-native';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
// npm i react-native-maps
import * as Location from 'expo-location';
//npm i expo-camera
import { Camera, Constants } from 'expo-camera';
//npm i react-native-gesture-handler
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import 'expo-dev-client';

//npm i -S react-native-qrcode-svg
import QRCode from 'react-native-qrcode-svg';

//npm install react-native-camera-kit --save
import { CameraScreen } from 'react-native-camera-kit';

//fire store
//npx expo install firebase
import { db } from './firebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { async } from '@firebase/util';

//날씨 api키
const API_KEY = "204756a8614d5d5f3d4e6544f1cd8c7d"

export default function App() {

  const [weather, setWeather] = React.useState("");
  const [address, setAddress] = React.useState("");

  // 사진찍기
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  //모달
  const [photoModal, setPhotoModal] = React.useState(false); //사진찍는 모달
  const [weatherModal, setWeatherModal] = React.useState(false); // 산책 완료 모달


  const [mapRegion, setmapRegion] = useState({ //나의 위치 usestate
    latitude: 36.7987869, //위도
    longitude: 127.0757584, //경도
  });

  //QR코드 스캐너
  const [scaned, setScaned] = useState(true);
  const ref = React.useRef(null);


  //firestor 연동
  const [users, setUsers] = useState();
  const readfromDB = async () => {
    try {
      const data = await getDocs(collection(db, "Station")) 
      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      users?.map((row, idx) => {
        console.log('row'+idx,row)
      })
      console.log('data', data.docs.map)
    } catch (error) {
      console.log('eerror', error.message)
    }
  }


  const mapRef = useRef(null);

  useEffect(() => {
    // 종료후 재시작을 했을때 초기화
    setScaned(true);
  }, []);

  const onBarCodeRead = (event) => {
    if (!scaned) return;
    setScaned(false);
    Vibration.vibrate();
    Alert.alert("QR Code", event.nativeEvent.codeStringValue, [
      { text: "OK", onPress: () => setScaned(true) },
    ]);
  };


  useEffect(() => {
    (async () => {

      //위치 수집 허용하는지 물어보기
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude.toFixed(5)}&lon=${location.coords.longitude.toFixed(5)}&appid=${API_KEY}&units=metric`);
      const res = await response.json()
      console.log('address -> ', address)
      console.log(address[0].district)
      console.log(res)
      setWeather(res)

      setmapRegion({ //현재 위치
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
      
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      console.log('tackPicture')
      const data = await camera.takePictureAsync(null)
      setImage(data.uri);
      console.log('data', data.uri);
      setPhotoModal(false)
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  

  const pressButton = () => {
    setWeatherModal(true)

    readfromDB()
    console.log('button 누름')
  }

  const pressQR = () => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
    setPhotoModal(true)

    console.log('QR 누름')
  }
  
  //이동하기
  const onDetail = (lat, lon) => { //병원 리스트 중 하나 클릭하면 해당 위도, 경도 가져옴....
    setmapRegion({ //현재 위치
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    })
    mapRef.current.animateToRegion({ //해당 위치로 지도 이동
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    }, 3 * 1000);
  }

  return (
    <View style={styles.container}>
      <View style={{ alignContent: 'center', justifyContent: 'center' }}>
        {/* 사진 찍은 후 확인 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={weatherModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setWeatherModal(!weatherModal);
          }}>

          <View style={styles.centeredView}>
            <View style={styles.weathertab}>
              {
                weather != "" ?
                  <>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                      {/* <Text style={{ color: 'gray' }}>     {address[0].district} </Text> */}
                      <Text style={{ fontSize: 20, }}> {weather.main.temp.toFixed(0)}°C       </Text>
                    </View>
                    <Image style={{ width: '20%', height: '100%' }} source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }} />
                    <Text>{weather.weather[0].main}</Text>
                  </>
                  :
                  null
              }
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalView}>

              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ padding: 10 }}>
                  <View style={{ backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center', height: 320, width: 280 }}>
                    <Image source={{ uri: image }} style={{ resizeMode: "cover", height: '100%', width: '100%', borderWidth: 2, borderColor: '#EBE3D7' }} />
                  </View>
                  <Text>Ddddd</Text>
                  {
                    users?.map((row, idx) => {
                      return (
                        <>
                          <Text>user - {idx}</Text>
                          <Text>{row.id}</Text>
                          <Text>{row.age}</Text>
                          <Text>{row.createA}</Text>
                        </>
                      )
                    })
                  }
                </View>

              </TouchableWithoutFeedback>



              <View style={{ flexDirection: 'row', padding: 10 }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {

                    setWeatherModal(!weatherModal)

                  }}>
                  <Text style={styles.textStyle}>확인</Text>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>





        {/* 사진 찍기 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={photoModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setPhotoModal(!photoModal);
          }}>

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Camera
                ref={ref => setCamera(ref)}
                style={{
                  height: 400,
                  width: 300,
                }}
                // style={styles.fixedRatio}
                type={type}


                //QR 코드 스캐너
                zoomMode
                focusMode
                // Barcode Scanner Props
                scanBarcode
                showFrame={true}
                laserColor="rgba(0, 0, 0, 0)"
                frameColor="rgba(0, 0, 0, 0)"
                surfaceColor="rgba(0, 0, 0, 0)"
                onReadCode={onBarCodeRead}

              />
              <Text>  </Text>
              <View style={{ width: 300, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                  <View style={{ width: 50, }}></View>
                  <Pressable
                    onPress={() => {
                      console.log("찰칵")
                      takePicture()
                    }} >
                    <View style={styles.takeButton} ></View>
                  </Pressable>
                  <Pressable
                    style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', }}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      )
                    }} >
                    <View style={{
                      borderColor: "black",
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                    }} >

                    </View>
                  </Pressable>
                </View>
              </View>
            </View>

          </View>
        </Modal>






      </View>
      <View style={styles.containerMap}>
        <MapView
          style={styles.map}
          // region={mapRegion}
          // initialRegion={{mapRegion}}
          initialRegion={{
            latitude: 36.7987869,
            longitude: 127.0757584,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
          }}

          //사용자 위치에 맞게 마커가 표시된다.
          showsUserLocation={true}
          // userLocationUpdateInterval = 
          onUserLocationChange={(e) => {

            setmapRegion({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            });
          }}
        >
          {/* <Marker
            coordinate={mapRegion}
            draggable={true} //마커 드래그 가능
            onDragStart={(e) => { console.log("Drag start", e.nativeEvent.coordinate); }} //드래그 한 위도, 경도 나타냄
            onDragEnd={(e) => {
              setmapRegion({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
              });
            }} //드래그 한 곳으로 마커 이동
          >
            <Callout>
              <Text>This is Callout</Text>
            </Callout>
          </Marker> */}

          {
            users?.map((e, idx) => {
              if (e.id == "Station") {
                return (
                  <>
                    <Marker
                      key={idx}
                      coordinate={{
                        latitude: parseFloat(e.s_position_x),
                        longitude: parseFloat(e.s_position_y),
                      }}
                      onPress={() => {
                        //onDetail(e.s_position_x, e.s_position_y)
                        
                      }}
                    >
                      <Callout>
                        <Text>station 위치</Text>
                        <Text>{e.s_count}</Text>
                        <Text>{e.s_num}</Text>
                        <Text>{e.s_state}</Text>
                      </Callout>
                    </Marker>
                  </>
                )
              }
            })
          }




          <Circle center={mapRegion} radius={100} />
        </MapView>


        <View></View>

        <View style={styles.buttons}>
          {/* 버튼 */}
          {/* 화면비율 맞추기 */}
          <>
            <Pressable style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              elevation: 3,
              backgroundColor: '#F7931D',
              width: '30%'
            }} onPress={pressButton} >
              <Text>지도 닫기</Text>

            </Pressable>
            <Text>              </Text>
            <Pressable style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              elevation: 3,
              backgroundColor: '#F7931D',
              width: '30%'
            }} onPress={pressQR}>
              <Text>QR코드</Text>
            </Pressable></>
        </View>

      </View>
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