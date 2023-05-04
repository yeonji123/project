import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// firebase 데이터 추가
import { db } from '../../firebaseConfig';
import { addDoc, getDocs, collection, setDoc, doc } from 'firebase/firestore';

import GraySmallButton from '../../Component/GraySmallButton';


const BreakReport = ({ navigation, route }) => {
    const [breakList, setBreakList] = useState([false, false, false, false]); // 고장 내용 입력 list
    const [sentence, setSentence] = useState(''); // 구체적인 고장 사유 입력
    const [notifiData, setNotifiData] = useState(); // 고장 내용 입력 list

    const breakListFunc = (index) => {
        const temp = breakList;
        temp[index] = !temp[index];
        setBreakList(temp);
    }


    useEffect(() => {
        (async () => {
            try {
                const data = await getDocs(collection(db, "StationNotification")) // Station이라는 테이블 명
                setNotifiData(data.docs.map(doc => ({ ...doc.data(), id: doc.id }))) // map을 돌려서 데이터를 복사하여 붙여놓고, id를 추가해줌

            } catch (error) {
                console.log('eerror', error.message)
            }
        })();
    }, []);


    const submit = () => {
        (async () => {
            console.log('notifi', notifiData)
            var notifyN=0;
            notifiData.map((item) => {
                if (item.id.split('_')[0]=='BR' && item.id.split('_')[1] == 'station1'){ // scan한 station id와 동일하고
                    if (item.id.split('_')[2]>=notifyN){ // station관련 신고의 번호와 달라야하니까 
                        notifyN = parseInt(item.id.split('_')[2])
                    }
                }
            })
            let todayData = new Date(); 
            let today = todayData.toLocaleDateString()

            let dbid = "BR_"+'station1'+"_"+(notifyN+1)
            console.log(dbid) // data id

            // const docRef = await setDoc(doc(db, "StationNotification", dbid), {
            //     no_additional : sentence,
            //     no_date : today,
            //     no_num : notifyN+1,
            //     no_type : breakList,
            //     st_id : 'station1',
            //     u_id : 'user1'
            // });
            // console.log("Document written with ID: ", docRef.id);
        })();
    }



    return (
        <View style={styles.container}>

            <View style={styles.breakReportView}>
                <View style={styles.stationnum}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#6699FF' }}>신고할 station</Text>
                    <TouchableOpacity
                        style={styles.bigbutton}
                        onPress={() => {
                            console.log('check')
                            navigation.navigate('ScanStation')
                        }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>QR코드 촬영</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.breakInfo}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#6699FF' }}>고장 내용</Text>
                    <Text>* 해당되는 문제를 클릭하여주세요(복수 선택 가능)</Text>
                    <View style={styles.breakselect}>
                        <View style={{ justifyContent: 'space-around', width: '50%', marginRight: 5 }}>
                            <GraySmallButton title="여닫이 작동 안함" func={() => breakListFunc(0)} />
                            <GraySmallButton title="폐우산 기부 안됨" func={() => breakListFunc(1)} />
                        </View>
                        <View style={{ justifyContent: 'space-around', width: '50%', marginLeft: 5 }}>
                            <GraySmallButton title="모터 작동 안함" func={() => breakListFunc(2)} />
                            <GraySmallButton title="QR코드 손실" func={() => breakListFunc(3)} />
                        </View>
                    </View>
                </View>


                <View style={styles.sentence}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#6699FF' }}>구체적인 고장 사유</Text>
                    </TouchableWithoutFeedback>

                    <View style={{ marginTop: 10, }}>
                        <View style={styles.sentenceInputView}>
                            <TextInput
                                value={sentence}
                                onChangeText={text => setSentence(text)}
                                placeholder="useless placeholder"
                                multiline={true}
                            />
                        </View>
                    </View>
                </View>

            </View>
            <View style={styles.submitView}>
                <TouchableOpacity
                    style={styles.submit}
                    onPress={() => { 
                        console.log('DB에 저장 ') 
                        submit()
                    }}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>제출하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BreakReport;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'space-between',
    },
    breakReportView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.75,
        padding: 10,
    },
    stationnum: {
        height: '18%',
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
    sentence: {
        height: '52%',
        padding: 8,
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