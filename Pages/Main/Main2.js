import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Image, ActivityIndicator, Button } from 'react-native';
import { useEffect, useState } from 'react'

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
            <Button title='Join' onPress={()=>(navigation.navigate("Join"))}></Button>
            <Button title='Login' onPress={()=>(navigation.navigate("Login"))}></Button>
            <Button title='Main' onPress={()=>(navigation.navigate("Main"))}></Button>
            <Button title='Map' onPress={()=>(navigation.navigate("Map"))}></Button>
            <Button title='QRScanner' onPress={()=>(navigation.navigate("QRScanner"))}></Button>
            <Button title='CustMain' onPress={()=>(navigation.navigate("CustMain"))}></Button>
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
});
