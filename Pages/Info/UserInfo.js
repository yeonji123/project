import React from 'react';
import { View, Text, StyleSheet, Dimensions, Button, Alert, Modal, Pressable, Image, TextInput, Keyboard, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';

import TitleName from '../../Component/TitleName';
import Detail from '../../Component/Detail';

const UserInfo = () => {
    return (
        <View style={styles.container}>
            <ScrollView style={{padding:5}}>
                <View style={styles.titleView}>
                    <TitleName title="프로필"></TitleName>
                </View>
                <Detail title="닉네임" value="user" icon="true" />
                <Detail title="ID" value="user" />
                <Detail title="PW" value="*****" icon="true" />
                <Detail title="번호" value="010-1234-1234" />
                <Detail title="이메일" value="diddus45@gmail.com" />



                <View style={styles.titleView}>
                    <TitleName title="이용 내역"></TitleName>
                </View>
                <Detail title="폐우산 기부 정보" icon="true"/>
                <Detail title="고객센터" icon="true"/>
                <Detail title="신고 및 접수" icon="true"/>

                <View style={styles.logoutView}>
                    <Text style={{fontSize:20,}}>로그아웃</Text>
                </View>

            </ScrollView>
        </View>
    );
};

export default UserInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        paddingTop:20,
        paddingBottom:30,
        alignItems:'center',
    },
    titleView: {
        justifyContent:'center',
        alignItems:'center',
    },
    titleView: {
        justifyContent:'center',
        alignItems:'center',
        paddingTop:20,
    },
    logoutView:{
        width: '100%',
        height: Dimensions.get('window').height*0.1,
        padding: 15,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#D9E5FF',
        borderRadius:15,
        marginTop:20,
    },

});