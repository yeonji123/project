import { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, Alert, Modal, Pressable, Image, TextInput, Keyboard, KeyboardAvoidingView, } from 'react-native';


const TitleName = (props) => {

    return (
        <View style={styles.titleVIew}>
            {/* 어떤걸 넣을 것인지 = props.title */}
            <Text style={styles.titleText}>{props.title}</Text>
        </View>
    );
};

export default TitleName;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    titleVIew: {
        width: Dimensions.get('window').width * 0.8,
        borderBottomColor: '#6699FF',
        borderBottomWidth: 3,
    },
    titleText: {
        marginTop: 8,
        marginLeft: 8,
        color: '#6699FF',
        fontWeight: 'bold',
    },
    textInput: {
        padding: 10,
        backgroundColor: 'white',
    },
}
);