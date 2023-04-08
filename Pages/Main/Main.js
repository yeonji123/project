import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Image, ActivityIndicator, Button, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react'


// Location API
import * as Location from 'expo-location';

// import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';





//날씨 api키
const API_KEY = "204756a8614d5d5f3d4e6544f1cd8c7d"

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


const Main = ({navigation}) => {
    //날씨
    const [weather, setWeather] = useState("");
    const [address, setAddress] = useState("");


    useEffect(() => {
        (async () => {

            //위치 수집 허용하는지 물어보기
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            let addresscheck = await Location.reverseGeocodeAsync(location.coords);
            console.log(addresscheck)
            setAddress(addresscheck)
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude.toFixed(5)}&lon=${location.coords.longitude.toFixed(5)}&appid=${API_KEY}&units=metric`);
            const res = await response.json()
            console.log(res)
            setWeather(res)
            await info()
        })();
    }, [])



    return (
        <View style={styles.container}>

            {/* 어플리케이션 설명 Touchable */}
            <View style={styles.explainView}>
                <TouchableOpacity
                    style={styles.explainUMS}
                    onPress={() => consle.log("Dddd")}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ padding: 10, alignItems: 'center', backgroundColor:'blue' }}>
                            <Text style={styles.explainText}>UMStation 설명</Text>
                        </View>
                        <View style={styles.arrowicon}>
                            <Image style={{ width: '20%', height: '100%' }} source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }} />

                        </View>
                    </View>
                </TouchableOpacity>
            </View>


            <Text>hihihihihihihih</Text>

              {
                weather != "" ?
                  <>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                      <Text style={{ color: 'gray' }}>     {address[0].district} </Text>
                      <Text style={{ fontSize: 20, fontStyle: 'bold', }}> {weather.main.temp.toFixed(0)}°C       </Text>
                    </View>
                    {/* <Image style={{ width: '20%', height: '100%' }} source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }} /> */}
                    <Text>{weather.weather[0].main}</Text>
                  </>
                  :
                  <ActivityIndicator />
              }
        </View>
       
    );
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    explainView:{
        width : Dimensions.get('window').width,
        height : Dimensions.get('window').height*0.1,
        padding:10,
        justifyContent:'center',
        flexDirection:'row'
    },
    explainUMS:{
        width:'100%',
        height:'100%',
        backgroundColor:'#6699FF',
        opacity:0.5,
        justifyContent:'center',
        alignContent:'center',
        borderRadius: 15,
    },
    explainText:{
        fontSize:20,
    },
    arrowicon:{
        width:'20%',
        height:'100%',
    }
});
