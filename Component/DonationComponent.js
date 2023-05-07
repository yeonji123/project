import { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';


const DonationComponent = (props) => {
    return (
        <TouchableOpacity
            style={styles.donationView}
            onPress={() => {
                console.log('donation')
            }}
        >
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.stationInfo}>
                    <View style={styles.stationNum}>
                        <Text style={{ fontSize: 25, marginLeft: 5, fontWeight:'bold', color:'white' }}>{props.num + 1}</Text>
                    </View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 5 }}>{props.date}</Text>
                    <Text style={{ fontSize: 20, padding: 5 }}>{props.stationnum}</Text>
                </View>
                <View style={styles.donaPickture}>
                    {
                        props.d_image == null ?
                        <Image style={{ width: '100%', height: '100%', }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4343/4343277.png' }} /> :
                        <Image style={{ width: '100%', height: '100%', }} source={{ uri: props.d_image }} />
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default DonationComponent;

const styles = StyleSheet.create({
    donationView: {
        backgroundColor: '#F2F2F2',
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.18,
        borderRadius: 10,
        padding: 10,
    },
    stationNum:{
        backgroundColor: '#6699FF', 
        width:35, 
        height:35,
        borderRadius:20, 
        alignItems:'center',
        justifyContent:'center',
    },
    stationInfo:{
        width:'60%',
        padding:8,
        justifyContent:'center',

    },
    donaPickture:{
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        width:'40%',
        height:'100%',
    },
});
