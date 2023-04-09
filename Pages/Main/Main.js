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


const Main = () => {
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
            console.log('main address-> ',addresscheck)
            var addresstotal = addresscheck[0].region + ' ' + addresscheck[0].city // 충청남도 아산시    
            setAddress(addresstotal)
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude.toFixed(5)}&lon=${location.coords.longitude.toFixed(5)}&appid=${API_KEY}&units=metric`);
            const res = await response.json()
            // console.log('temp -> ',res)
            setWeather(res)
        })();
    }, [])



    return (
        <View style={styles.container}>
            

           
            <View style={styles.explainView}>
                <TouchableOpacity
                    style={styles.explainUMS}
                    onPress={() => console.log("Dddd")}
                >
                    <View style={{ flexDirection: 'row', width:'100%' }}>
                        <View style={{ padding: 10, alignItems: 'center', width:'88%'}}>
                            <Text style={{fontSize:20,}}>          UMStation 설명</Text>
                        </View>
                        <View style={styles.arrowicon}>
                            <Image style={{ width: '50%', height:'50%' }} source={require('../../assets/arrow_icon.png')} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>


            <View style={styles.userinfoView}>
                <View style={styles.userinfo}>
                    <View style={styles.weather}>
                        {
                            weather != "" ?
                                <>
                                    <View style={styles.location}>
                                        <Text style={{ fontSize: 20, fontWeight:'bold'}}>{address}</Text>
                                    </View>
                                    <View style={styles.temperature}>
                                        <View style={{ padding: 3, width: '50%', height: '100%', }}>
                                            <Image style={{ width: '100%', height: '100%' }} source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }} />
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems:'center' }}>
                                            <Text style={{ fontSize: 30 }}>{weather.main.temp.toFixed(0)}</Text>
                                            <Text>  °C </Text>
                                        </View>
                                    </View>
                                </>
                                :
                                <ActivityIndicator />
                        }
                    </View>
                    <View style={styles.userstate}>
                        <View style={{ flexDirection: 'row', height:'100%' }}>
                            <View style={{width:'50%', alignItems:'flex-end', padding:15}}>
                                <Text style={{fontSize:20}}>DB님은  </Text>
                            </View>
                            <View style={{ width: '50%', padding: 10, justifyContent: 'center' }}>
                                {
                                    // DB.u_rent == true?
                                    // <Text style={{fontSize:35, fontWeight:'bold'}}>대여 가능</Text>:
                                    // <Text style={{fontSize:35, fontWeight:'bold'}}>대여중</Text>
                                }
                                <Text style={{fontSize:30, fontWeight:'bold'}}>대여 가능</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.donation}>
                        <Text style={{fontSize:16}}>폐우산 기부 횟수 :    DB</Text>
                    </View>
                </View>
            </View>




            <View style={styles.mainfunctionView}>
                <View style={styles.mapbutton}>

                </View>
                <View style={styles.scanner}>

                </View>
            </View>



            <View style={styles.serviceView}>
                <TouchableOpacity style={styles.service}>
                    <View style={{ width:'20%', height:'100%', padding:10, alignItems:'center'}}>
                        <Image style={{ width: '80%', height: '100%' }} source={require('../../assets/service_icon.png')}></Image>
                    </View>
                    <View style={{width:'80%', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:20, fontWeight:'bold'}}>고객센터        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
       
    );
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    explainView:{
        width : Dimensions.get('screen').width,
        height : Dimensions.get('screen').height*0.1,
        padding:15,
        justifyContent:'center',
        flexDirection:'row'
    },
    explainUMS:{
        width:'100%',
        height:'100%',
        backgroundColor:'#D9E5FF',
        justifyContent:'center',
        alignContent:'center',
        borderRadius: 15,
    },
    arrowicon:{
        width:'12%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    userinfoView:{ //사용자 정보 첫 레이아웃
        width : Dimensions.get('screen').width,
        height : Dimensions.get('screen').height*0.25,
        padding:15,
        justifyContent:'center',
        alignContent:'center',
    },
    userinfo:{ // 사용자의 정보 radius
        width:'100%',
        height:'100%',
        backgroundColor:'#F2F2F2', 
        borderRadius: 15,
        padding:15
    },
    weather:{
        width:'100%',
        height:'35%',
        flexDirection:'row',
        justifyContent:'center',
    },
    location:{
        width:'50%',
        height:'100%',
        justifyContent:'center',
        alignItems:'flex-end',
    },
    temperature :{
        flexDirection:'row',
        width:'50%',
        height:'100%',
        justifyContent:'flex-end',
        paddingRight:15,
    },
    userstate:{
        width:'100%',
        height:'45%',
    },
    donation:{
        width:'100%',
        height:'20%',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        paddingRight:15,
    },
    mainfunctionView:{
        width : Dimensions.get('screen').width,
        height : Dimensions.get('screen').height*0.35,
        padding:15,
        flexDirection:'row',
        justifyContent:'center',
    },
    mapbutton:{
        width:'48%',
        backgroundColor:'red',
        height:'100%',
        marginRight:7,
        borderRadius: 15,
        
    },
    scanner:{
        width:'48%',
        backgroundColor:'skyblue',
        height:'100%',
        marginLeft:7,
        borderRadius: 15,
    },
    serviceView:{
        width : Dimensions.get('screen').width,
        height : Dimensions.get('screen').height*0.1,
        padding:15,
        justifyContent:'center',
        flexDirection:'row',
    },
    service:{
        width:'100%',
        height:'100%',
        backgroundColor:'#F2F2F2',
        justifyContent:'center',
        alignContent:'center',
        borderRadius: 15,
        flexDirection:'row'
    },
});
