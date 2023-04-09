import React from 'react';
import { View, Text, StyleSheet, Dimensions, Button, Alert, Modal, Pressable, Image, TextInput, Keyboard, KeyboardAvoidingView, } from 'react-native';


import TitleName from '../Component/TitleName';


const Servicelist = () => {
    return (
        <View style={styles.container}>

        </View>
    );
};

export default Servicelist;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
}
);

