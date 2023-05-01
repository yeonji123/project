import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions, ScrollView, Pressable, } from 'react-native';

import TitleName from '../../Component/TitleName';

//fire store
//npx expo install firebase
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';


const Rental = ({ navigation, route }) => {
    const [stationData, setStationData] = useState();
    const [umbrellaData, setUmbrellaData] = useState();

    // 모달
    const [checkModal, setCheckModal] = useState(false);


    useEffect(() => {
        // 데이터 요청
        // props로 받은 station 번호로 데이터 요청
        (async () => {
            try {
                const data = await getDocs(collection(db, "Station"))
                data.docs.map(doc => {
                    if (doc.data().s_num == route.params.data) {
                        console.log('Rental page params', doc.data().s_count)
                        setStationData(doc.data())
                        setUmbrellaData(doc.data().s_count)
                    }
                })


            } catch (error) {
                console.log('eerror', error.message)
            }
        })();
    }, []);



    const handleModal = (idx) => {
        //몇 번째 값인지 확인
        console.log('handleModal', idx)




    }




    return (
        <View style={styles.container}>
            <TitleName title='대여하기' />

            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={checkModal}
                    onRequestClose={() => {
                        setCheckModal(!checkModal);
                    }}>

                    <View style={styles.modalView}>
                        <View style={styles.modalTop}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>Station 번호 입력하기</Text>
                        </View>
                        <View style={styles.modalMid}>
                            <Text style={{ fontSize: 25, }}>5 번 우산을 </Text>
                            <Text style={{ fontSize: 25, }}>대여하시겠습니까? </Text>
                        </View>
                        <View style={styles.modalbot}>
                            <Pressable
                                style={{ width: '50%' }}
                                onPress={() => {
                                    // station 유무 확인 함수
                                    console.log('station 작동')
                                }}>
                                <Text style={styles.textStyle}>확인</Text>
                            </Pressable>
                            <Pressable
                                style={{ width: '50%' }}
                                onPress={() => setCheckModal(!checkModal)}>
                                <Text style={styles.textStyle}>취소</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

            </View>



            <ScrollView style={{ width: '100%', height: '100%', padding: 10 }}>
                {
                    umbrellaData && umbrellaData.map((row, idx) => {
                        return (
                            <View style={{ padding: 5 }}>
                                <TouchableOpacity
                                    key={idx}
                                    style={row.u_state ? styles.buttonstyle : [styles.buttonstyle, { opacity: 0.3 }]}
                                    onPress={() => {
                                        console.log('TouchableOpacity')
                                        handleModal(idx)
                                        setCheckModal(!checkModal)
                                    }}
                                    disabled={!row.u_state}
                                >
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{idx + 1}</Text>
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
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTop: {
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    modalMid: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    modalbot: {
        width: '100%',
        backgroundColor: '#B2CCFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderColor: 'gray',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    modalbutton: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        borderRadius: 10,
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
    },
});