import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Dimensions, ScrollView, Button } from 'react-native';

import TitleName from '../../Component/TitleName';

//fire store
//npx expo install firebase
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';


const Rental = ({ navigation, route }) => {
    const [stationData, setStationData] = useState();
    const [umbrellaData, setUmbrellaData] = useState();



    useEffect(() => {
        // 데이터 요청
        (async () => {
            try {
                const data = await getDocs(collection(db, "Station"))
                data.docs.map(doc => {
                    if (doc.data().s_num == route.params.data) {
                        console.log(doc.data())
                        console.log(doc.data().s_count)
                        setStationData(doc.data())
                        setUmbrellaData(doc.data().s_count)
                    }
                })


            } catch (error) {
                console.log('eerror', error.message)
            }
        })();
    }, []);

    const check = () => {
        umbrellaData.map((row, idx) => {
            console.log(row)
        })
    }



    return (
        <View style={styles.container}>
            <TitleName title='대여하기' />
            <ScrollView style={{ width: '100%', height: '100%' }}>
                {
                    umbrellaData && umbrellaData.map((row, idx) => {
                        return (

                            <View style={{ padding: 5 }}>
                                <TouchableOpacity
                                    style={row.u_state ? styles.buttonstyle : [styles.buttonstyle, { opacity: 0.3 }]}
                                    onPress={() => console.log('pp')}
                                    key={idx}
                                    disabled={!row.u_state}
                                >
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{idx+1}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};

export default Rental;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        padding: 20,
        paddingTop: 50,
    },
    buttonView: {
        justifyContent: 'space-between',
        height: Dimensions.get('window').height * 0.1,
        marginBottom: 20,
    },
    buttonstyle: {
        width: '100%',
        height: Dimensions.get('window').height * 0.08,
        backgroundColor: '#C4C4C4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }

});