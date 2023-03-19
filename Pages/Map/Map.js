import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React , {useEffect} from "react";
import MapView, { Marker, Circle, Callout, AnimatedRegion, Polyline, MarkerAnimated,} from 'react-native-maps';

export default function Map() {
    //아이디
    const [id, setId] = React.useState("");
    const [mapRegion, setmapRegion] = React.useState("");
    //에니메이션으로 이동
    const mapRef = React.useRef(null);

    //이동경로 표시하기
    const [gps, setGps] = React.useState([]);
    const [lat, setLatit] = React.useState();
    const [long, setLongit] = React.useState();

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
    useEffect(() => {
        (async () => {

            //위치 수집 허용하는지 물어보기
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            // const value = await AsyncStorage.getItem("id");
            // setId(value);

            let location = await Location.getCurrentPositionAsync({});

            setmapRegion({ // 현재 위치
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005, // 확대되는 범위
                longitudeDelta: 0.005, // 확대되는 범위
            })
        })();
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.containerMap}>
                <MapView
                    style={styles.map}
                    region={mapRegion}
                    // initialRegion={mapRegion}
                    ref={mapRef}
                    //사용자 위치에 맞게 마커가 표시된다.
                    showsUserLocation={true}
                    // userLocationUpdateInterval =
                    onUserLocationChange={(e) => {
                        //사용자가 이동하면 위치를 저장함
                        //console.log("onUserLocationChange", e.nativeEvent.coordinate);
                        //위치 위도경도를 저장함
                        const newCoordinate = {
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        }
                        setLatit(e.nativeEvent.coordinate.latitude)
                        setLongit(e.nativeEvent.coordinate.longitude)
                        setGps(gps.concat(newCoordinate));
                        //console.log("gps", gps);

                        setmapRegion(newCoordinate)
                        // setmapRegion(gps.concat(newCoordinate));
                    }}
                >
                    <Marker
                        coordinate={mapRegion}
                        onPress={() => {
                            onDetail(e.latitude, e.longitude)
                            console.log("내위치임?")
                        }}
                    >

                    </Marker>

                    <Polyline
                        coordinates={gps}
                        strokeColor="#4e90f7"
                        strokeWidth={6}
                    />
                </MapView>
            </View>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',

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
});
