import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, } from 'react-native';


const RentalPage = ({navigation}) => {
    const [workcomplete, setWorkcomplete] = useState(false);

    useEffect(() => {
        // 데이터 요청
        console.log('RentalPage')
        // 로직
        // 1. 사용자가 rental에서 예를 누르면 이페이지로 이동
        // 2. 이페이지에서 블루투스를 이용하여 station 작동
        // 3. station 작동이 완료되면 대여 완료 버튼이 활성화
        // 4. 대여 완료 버튼을 누르면 functionList 페이지로 이동
        // 확인 부분은 블루투스

        // (async () => {
        //     try {
        //         const data = await getDocs(collection(db, "Station"))
        //         data.docs.map((doc, idx) => {
        //             console.log(idx, '=', doc.data())
        //         })


        //     } catch (error) {
        //         console.log('eerror', error.message)
        //     }
        // })();


    }, []);


    return (
        <View style={styles.container}>

        <View style={styles.explainView}>
            <Text style={styles.text}>Station</Text>
            <Text style={styles.text}>작동 중입니다....</Text>
        </View>


        <View style={{ padding: 10 }}>
            <View style={styles.pictureView}>

            </View>
        </View>

        <View style={styles.buttonView}>
            <TouchableOpacity
                style={styles.buttonstyle}
                onPress={() => navigation.navigate('Rental', { data: stationNum })}

            >
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>대여 완료</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
};

export default RentalPage;


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