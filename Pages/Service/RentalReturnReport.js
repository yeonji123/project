import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';

import GraySmallButton from '../../Component/GraySmallButton';

// firebase 데이터 추가
import { db } from '../../firebaseConfig';
import { getDocs, collection, setDoc, doc } from 'firebase/firestore';

const RentalReturnReposrt = ({ navigation, route }) => {
    const [rentalReturnList, setRentalReturnList] = useState([false, false]); // 고장 내용 입력 list
    const [checked, setChecked] = useState('first'); // 고장 내용 입력 list

    const [sentence, setSentence] = useState(''); // 구체적인 고장 사유 입력
    const [notifiData, setNotifiData] = useState(); // 고장 내용 입력 list


    const [station, setStation] = useState(route.params != undefined ? route.params.stationData : null); // scan한 station data


    useEffect(() => {
        (async () => {
            try {
                if (route.params != undefined) {
                    console.log('---------route.params.stationData', route.params.stationData)
                    setStation(route.params.stationData)
                }
                console.log('retalreturnReport')
                const data = await getDocs(collection(db, "StationNotification")) // Station이라는 테이블 명
                setNotifiData(data.docs.map(doc => ({ ...doc.data(), id: doc.id }))) // map을 돌려서 데이터를 복사하여 붙여놓고, id를 추가해줌

            } catch (error) {
                console.log('eerror', error.message)
            }
        })();
    }, [route.params]);


    const rentalReport = (index) => {
        const temp = rentalReturnList
        temp[index] = !temp[index]
        setRentalReturnList(temp)
    }


    const submit = () => {
        (async () => {
            console.log('notifi', notifiData)
            var notifyN = 0;
            notifiData.map((item) => {
                if (item.id.split('_')[0] == 'RR' && item.id.split('_')[1] == 'station1') { // scan한 station id와 동일하고
                    if (item.id.split('_')[2] >= notifyN) { // station관련 신고의 번호와 달라야하니까 
                        notifyN = parseInt(item.id.split('_')[2])
                    }
                }
            })
            let todayData = new Date();
            let today = todayData.toLocaleDateString()

            let dbid = "RR_" + 'station1' + "_" + (notifyN + 1)
            console.log(dbid) // data id

            const docRef = await setDoc(doc(db, "StationNotification", dbid), {
                no_additional : sentence,
                no_date : today,
                no_num : notifyN+1,
                no_type : breakList,
                st_id : station.st_id,
                u_id : await AsyncStorage.getItem('id')
            });
            console.log("Document written with ID: ", docRef.id);
            
            Alert.alert('신고 접수',
                '신고가 완료되었습니다',
                [
                    {
                        text: "확인",
                        onPress: () => navigation.navigate.pop()
                    }
                ]
            )
        })();
    }



    return (
        <View style={styles.container}>

            <View style={styles.rentalReportView}>
                <View style={styles.problemView}>
                    <GraySmallButton title="대여가 안돼요" func={() => rentalReport(0)} height='80%' width='45%' />
                    <GraySmallButton title="반납이 안돼요" func={() => rentalReport(1)} height='80%' width='45%' />
                </View>

                <View style={styles.stationnum}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#6699FF' }}>신고할 station</Text>
                    <TouchableOpacity
                        style={styles.bigbutton}
                        onPress={() => {
                            console.log('QR코드 스캔')
                            navigation.navigate('ScanStation')
                        }}
                    >
                        {
                            station == null ?
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>QR코드 촬영</Text>
                                : <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{station.st_id}</Text>
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.radioView}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#6699FF' }}>문제 원인 선택하기</Text>
                    <View style={styles.radio}>
                        <RadioButton
                            color='#6699FF'
                            value="first"
                            status={checked === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('first')}
                        />
                        <Text style={{ fontSize: 17 }}>대여했는데 우산을 잃어버렸어요</Text>
                    </View>
                    <View style={styles.radio}>
                        <RadioButton
                            color='#6699FF'
                            value="second"
                            status={checked === 'second' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('second')}
                        />
                        <Text style={{ fontSize: 17 }}>대여하지 않았는데 대여중이라고 나와있어요</Text>
                    </View>
                    <View style={styles.radio}>
                        <RadioButton
                            color='#6699FF'
                            value="third"
                            status={checked === 'third' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('third')}
                        />
                        <Text style={{ fontSize: 17 }}>기타(하단에 구체적인 신고 내용을 적어주세요)</Text>
                    </View>
                </View>


                <View style={styles.sentence}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#6699FF' }}>구체적인 신고 내용</Text>
                        <View style={{ marginTop: 10, }}>
                            <View style={styles.sentenceInputView}>
                                <TextInput
                                    value={sentence}
                                    onChangeText={text => setSentence(text)}
                                    placeholder="구체적인 신고 내용을 적어주세요"
                                    multiline={true}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={styles.submitView}>
                <TouchableOpacity
                    style={styles.submit}
                    onPress={() =>  {
                        submit()
                    }}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>제출하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RentalReturnReposrt;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'space-between',
    },
    rentalReportView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.75,
        padding: 10,
    },
    problemView: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
    },
    stationnum: {
        height: '20%',
        padding: 8,
    },
    breakInfo: {
        height: '30%',
        padding: 8,
    },
    breakselect: {
        height: '75%',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    radioView: {
        height: '25%',
        padding: 8,
        marginTop: 10,
    },
    radio: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sentence: {
        height: '40%',
        padding: 8,
        marginTop: 10,
    },
    sentenceInputView: {
        height: '90%',
        width: '100%',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        padding: 10,
    },
    bigbutton: {
        backgroundColor: '#F2F2F2',
        padding: 10,
        borderRadius: 10,
        height: '70%',
        marginTop: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.25,
        padding: 10,
    },
    submit: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D9E5FF',
        borderRadius: 15,
        height: '40%',
    },
});