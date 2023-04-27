import React, { useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

import TitleName from '../../Component/TitleName';

const Rental = ({ navigation, props }) => {

    useEffect(() => {
        console.log(props.params)


        // (async () => {
        //     try {
        //         const data = await getDocs(collection(db, "Station"))
        //         setStations(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))

        //         // stations?.map((row, idx) => {
        //         //   console.log('row' + idx, row)
        //         // })
        //         console.log('data', data.docs)
        //     } catch (error) {
        //         console.log('eerror', error.message)
        //     }
        // })();
    }, []);



    return (
        <View style={styles.container}>
            <TitleName title='대여하기' />
            <View style={styles.buttonView}>
                
        

            </View>

        </View>
    );
};

export default Rental;

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height ,
        padding:20,
        paddingTop:50,
    },
    buttonView:{
        justifyContent: 'space-between', 
        height:Dimensions.get('window').height * 0.1, 
        marginBottom:20,
    },


});