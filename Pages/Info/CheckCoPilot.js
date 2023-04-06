import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'


// import firebase from './firebaseConfig'
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, } from "firebase/storage";




const CheckCoPilot = () => {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);
    const storage = getStorage();




    const upload = () => {
        if (imageUpload === null) return;

        const imageRef = ref(storage, `images/${imageUpload.name}`);
        // `images === 참조값이름(폴더이름), / 뒤에는 파일이름 어떻게 지을지
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            // 업로드 되자마자 뜨게 만들기
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url]);
            });
            // 
        });
    };





    return (
        <>
            <View style={styles.container}>
                <Text>dfdfdf</Text>
            </View>
        </>
    )
}

export default CheckCoPilot

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
