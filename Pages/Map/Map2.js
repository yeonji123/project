import React, { useEffect, useState, } from 'react';
import {
    Text, View, StyleSheet, Dimensions,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
// npm i react-native-maps
import * as Location from 'expo-location';


const Map2 = (props) => {
    const [mapRegion, setmapRegion] = useState({ //나의 위치 usestate
        latitude: 36.7987869, //위도
        longitude: 127.0757584, //경도
    });
    //에니메이션으로 이동
    const mapRef = React.useRef(null);
    const [region, setRegion] = React.useState();


    // 드래그 해서 위치의 위도경도 가져오기
    const mapRegionChangehandle = (region) => {
        setRegion(region)
    };


    useEffect(() => {
        (async () => {

            //위치 수집 허용하는지 물어보기
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({}); //현재 위치 가져오기

            setmapRegion({ //현재 위치 set
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        })();
    }, []);


    //이동하기
    const onDetail = (lat, lon) => { // 반납 가능 우산 개수, 대여 가능 우산 개수 계산
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
        }, 1000);
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerMap}>
                <MapView
                    style={styles.map}
                    // region={mapRegion}
                    // initialRegion={{mapRegion}}
                    initialRegion={{
                        latitude: 36.7987869,
                        longitude: 127.0757584,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                    ref={mapRef}
                    //사용자 위치에 맞게 마커가 표시된다.
                    showsUserLocation={true}
                    // userLocationUpdateInterval = 
                    onUserLocationChange={(e) => {
                        setmapRegion({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        });
                    }}
                    onRegionChange={mapRegionChangehandle}
                >

                    <Marker
                        coordinate={{ latitude: 36.7987869, longitude: 127.0757584 }}
                        onPress={() => {
                            onDetail(36.7987869, 127.0757584)
                        }}
                    >
                        <Callout>
                            <View >
                                <Text>text2</Text>
                            </View>
                        </Callout >
                    </Marker>
                </MapView>


            </View>
        </View>

    );
}

export default Map2;

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
});