import React from 'react';
import { View, Text, StyleSheet, Dimensions, Button, Alert, Modal, Pressable, Image, TextInput, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';


import TitleName from '../../Component/TitleName';
import Detail from '../../Component/Detail';



const CustMain = () => {
    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <TitleName title="고객센터" />
            </View>
            <Detail title="Station 고장 신고" value="check" />
            <Detail title="대여/반납 신고"/>
            <Detail title="나의 기부 내역 보기"/>
        </View>
    );
};

export default CustMain;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        paddingTop:50,
        alignItems:'center',
    },
    titleView: {
        justifyContent:'center',
        alignItems:'center',
    },
});