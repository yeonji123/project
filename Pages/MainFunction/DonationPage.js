import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const DonationPage = ({navigation}) => {
    const [workcomplete, setWorkcomplete] = useState(false);
    const [isphoto, setIsphoto] = useState(false); // 사진 찍기 여부
    const [photoModal, setPhotoModal] = useState(false); // 사진 찍기 모달
    
    


    
    
    useEffect(() => {
        // 데이터 요청
        (async () => {
            try {
                const data = await getDocs(collection(db, "Station"))
                data.docs.map((doc, idx) => {
                    console.log(idx, '=', doc.data())
                })


            } catch (error) {
                console.log('eerror', error.message)
            }
        })();


    }, []);

    const takeaPicture = () => {





    }



    return (
        <View style={styles.container}>

<View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={photoModal}
                    onRequestClose={() => {
                        setPhotoModal(!photoModal);
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
                                onPress={() => setPhotoModal(!photoModal)}>
                                <Text style={styles.textStyle}>취소</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

            </View>







            <View style={styles.explainView}>
                <Text style={styles.text}>안쓰는</Text>
                <Text style={styles.text}>우산 기부하기</Text>
            </View>


            <View style={{ padding: 10 }}>
                <View style={styles.pictureView}>

                </View>
            </View>

            <View style={styles.buttonView}>

                {
                    isphoto ?
                        <TouchableOpacity
                            style={styles.buttonstyle}
                            

                        >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>기부 완료</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={styles.buttonstyle}
                            onPress={() => setPhotoModal(!photoModal)}
                        >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>사진 찍기</Text>
                        </TouchableOpacity>
                }

            </View>
        </View>
    );
};

export default DonationPage;


const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    explainView: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.1,
        padding:10,
    },
    pictureView:{
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.5,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        backgroundColor:'gray',
    },
    text:{
        fontSize:30,
        fontWeight:'bold',
        color:'black',
        textAlign:'center',
    },
    buttonView: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.1,
        marginBottom: 40,
        padding:10,
    },
    buttonstyle: {
        width: '100%',
        height: Dimensions.get('window').height * 0.10,
        backgroundColor: '#6699FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }


})