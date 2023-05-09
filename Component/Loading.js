import React from 'react';
import { View, Image } from 'react-native';


const Loading = (props) => {
    return (
        <Image
            style={{ width: 100, height: 100, resizeMode: 'contain', }}
            source={require('../assets/Loading.gif')}
        />
    );
};

export default Loading;