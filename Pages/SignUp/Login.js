import { StatusBar } from "expo-status-bar";
import { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, Alert, Modal, Pressable, Image, TextInput, Keyboard, KeyboardAvoidingView, TouchableOpacity} from 'react-native';


const umColor = '(102,152, 255,50)'


const Login = ({ navigation }) => {

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    
    const findPw = () => {
        // 비밀번호 찾기
        //설계 해야함
    
    }

    const login = () => {
        // DB 확인하기
        navigation.navigate("Main")

    }

    return (
        <View style={styles.container}>

            {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}

            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="ID"
                    placeholderTextColor="#003f5c"
                    onChangeText={(id) => setUserId(id)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity
                onPress={()=>findPw()}
            >
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => login()}
            >
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
    },
    inputView: {
        backgroundColor: "#6699FF",
        opacity:0.5,
        borderRadius: 30,
        width: Dimensions.get('window').width * 0.7,
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    
    forgot_button: {
        height: 30,
    },
    loginBtn: {
        width: Dimensions.get('window').width * 0.8,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#6699FF",
    },
});