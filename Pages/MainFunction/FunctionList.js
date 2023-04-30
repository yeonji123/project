import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Button } from 'react-native';


const FunctionList = ({ navigation, route }) => {
    const [retalButton, setRentalButton] = useState(true)
    const [returnButton, setReturnButton] = useState(true)
    const [donationButton, setDonationButton] = useState(true)
    const [stationNum, setStationNum] = useState('')

    useEffect(() => {
        // 로직
        // 1. station QR 코드 스캔 완료
        // 2. 사용자 상태 확인(대여 / 반납 / 폐우산 기부 버튼 활성화)
        // 3. station에 우산(대여 가능)이 있는 지 확인하기
        // 4. station에 우산(반납 가능)이 있는 지 확인하기
        var ishaveum = []
        var countrental = 0
        var countreturn = 0
        setStationNum(route.params.data.s_num)
        route.params.data.s_count.map((item, idx) => {
            if (item.u_state) {
                countreturn += 1;
                // true이면 우산이 있는 것
                return ishaveum[idx] = true
            }
            else {
                countrental += 1;
                // false이면 우산이 없는 것
                return ishaveum[idx] = false
            }
        })
        if (ishaveum.length == countrental) { // 우산이 없어 대여 불가능 경우
            console.log('대여 불가능')
            setRentalButton(!retalButton)
        }
        if (ishaveum.length == countreturn) { // 우산이 모두 꽉차 있어 반납 불가능한 경우
            console.log('반납 불가능')
            setReturnButton(!returnButton)
        }





    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={retalButton? styles.buttonstyle : [styles.buttonstyle, { opacity: 0.5 }]}
                    onPress={() => navigation.navigate('Rental', { data: stationNum })}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>대여하기</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={retalButton ? styles.buttonstyle : [styles.buttonstyle, { opacity: 0.5 }]}
                    onPress={() => navigation.navigate('Return')}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>반납하기</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.buttonstyle}
                    onPress={() => navigation.navigate('Donation')}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>폐우산 기부하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FunctionList;

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
        marginBottom: 40,
    },
    buttonstyle: {
        width: '100%',
        height: Dimensions.get('window').height * 0.10,
        backgroundColor: '#6699FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }
});