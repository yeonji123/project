import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';



// firestorage
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Get a reference to the storage service, which is used to create references in your storage bucket
// import {storage} from '../../firebaseConfig'
const storage = getStorage();
const storageRef = ref(storage, 'img/check.png');


export default function Play(navigation) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);



  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);


  const takePicture = async () => {

    console.log('dfdfdfdf')
    if (camera) {
      const data = await camera.takePictureAsync(null)
      console.log('data.uri===========',data.uri)
      setImage(data.uri);
      
      const metadata = {
        contentType: 'image/jpeg',
      }


      uploadBytes(storageRef, data.uri, metadata).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
      
    }
  }



  const _handlePhotoBtnPress = async () => {
    // image library 접근에 대한 허가 필요 없음
    // ImagePicker를 이용해 Image형식의 파일을 가져온다
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
 
    console.log(result)

    // cancelled가 아닐 때 가져온 사진의 주소로 onChangePhoto
    if (!result.canceled) {
      console.log(result.uri)
      setImage(result.uri);



      const metadata = {
        contentType: 'image/jpeg',
      }

      uploadBytes(storageRef, result.uri, metadata).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    }
  };

  const uploadImage = async () => {
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });

    try {
      await task;
    } catch (e) {
      console.error(e);
    }

    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
    setImage(null);
  };


  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const downloadPhoto = async () => {
    console.log(image)

    getDownloadURL(ref(storage, 'img/check.png'))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        console.log('getDownload',uri)

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        // Or inserted into an <img> element
        const img = document.getElementById('myimg');
        img.setAttribute('src', url);
        console.log(url)
      })
      .catch((error) => {
        console.log('getDownloadURL error',error)
        // Handle any errors
      });

  }


  return (
    <View style={{ flex: 1, padding:30 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={ref => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'} />
      </View>
      <Button
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}>
      </Button>
      <Button title="Take Picture" onPress={() => takePicture()} />
      <Button title='앨범' onPress={_handlePhotoBtnPress} />
      <Button title='이미지 가져오기' onPress={downloadPhoto} />

        {image && <Image source={{ uri: image }} style={{ flex:1 }} />}

  
    </View>
  );
}
const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  }
})