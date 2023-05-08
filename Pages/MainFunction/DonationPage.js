import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal, Pressable, Image } from 'react-native';


// npm i expo-location
import { Camera, Constants } from 'expo-camera';
// firestorage
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const DonationPage = ({ navigation, route }) => {
    const [workcomplete, setWorkcomplete] = useState(false);
    const [isphoto, setIsphoto] = useState(false); // 사진 찍기 여부

    // 사진찍기
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [photoModal, setPhotoModal] = useState(false); // 사진 찍기 모달
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [firebaseImage, setFirebaseImage] = useState(null);


    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }


    useEffect(() => {
        // 데이터 요청
        (async () => {
            try {
                const data = await getDocs(collection(db, "Station"))
                data.docs.map((doc, idx) => {
                    console.log(idx, '=', doc.data())
                })
                const cameraStatus = await Camera.requestCameraPermissionsAsync();
                setHasCameraPermission(cameraStatus.status === 'granted');

            } catch (error) {
                console.log('eerror', error.message)
            }
        })();


    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null)
            setImage(data.uri);
            console.log('data', data.uri);
            setPhotoModal(!photoModal)

            // storage에 올리기
            // uploadImage(data.uri);
        }
    }

    // storage에 올리기 DB 설계
    // const uploadImage = async (uri) => {
    //     console.log('result.uri------> ',uri)
    //     setImage(uri);

    //     const storage = getStorage(); // firebase storage 가져오기
    //     const storageRef = ref(storage, 'images/checkImagePicker.jpg'); // storage에 저장할 위치 지정 (이미지 이름)

    //     const responce = await fetch(uri); // file 형태나 blob 형태로 가져올 수 있음
    //     const blob = await responce.blob(); // blob 형태로 가져오기

    //     const response = await uploadBytes(storageRef, blob, {
    //         contentType: 'image/jpeg',
    //     }); // storage에 저장하기, content type은 이미지 형식으로 지정

    //     const imageset = await getDownloadURL(storageRef) // storage에 저장된 이미지의 url 가져오기
    //     setFirebaseImage(imageset)
    //     console.log(imageset)
    // }







    return (
        <View style={styles.container}>

            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={photoModal}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setPhotoModal(!photoModal);
                    }}>

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Camera
                                ref={ref => setCamera(ref)}
                                style={{
                                    height: 400,
                                    width: 300,
                                }}
                                // style={styles.fixedRatio}
                                type={type}
                            />

                            <View style={{ width: 300, paddingTop: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                    <Pressable
                                        style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', }}
                                        onPress={() => {
                                            setType(
                                                type === Camera.Constants.Type.back
                                                    ? Camera.Constants.Type.front
                                                    : Camera.Constants.Type.back
                                            )
                                        }} >
                                        <View style={{
                                            borderColor: "white",
                                            justifyContent: 'center',
                                            width: 40,
                                            height: 40,
                                            padding: 5,
                                        }} >
                                            <Image style={{ resizeMode: "cover", width: '100%', height: '100%', }}
                                                source={require('../../assets/ch.png')}></Image>
                                        </View>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => {
                                            console.log("찰칵")
                                            takePicture()
                                        }} >
                                        <View style={styles.takeButton}></View>
                                    </Pressable>
                                    <Pressable
                                        style={{ width: 50, textAlign: 'center', justifyContent: 'center' }}
                                        onPress={() => setPhotoModal(!photoModal)}
                                    >
                                        <Text style={{ fontSize: 18, color: '#6699FF' }}>취소</Text>
                                    </Pressable>
                                </View>
                            </View>
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    explainView: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.1,
        padding: 10,
    },
    pictureView: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'gray',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    buttonView: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.1,
        marginBottom: 40,
        padding: 10,
    },
    buttonstyle: {
        width: '100%',
        height: Dimensions.get('window').height * 0.10,
        backgroundColor: '#6699FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 18,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width: '80%',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    takeButton: {
        borderColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: "#5775D9",
        borderRadius: 100
    },
})