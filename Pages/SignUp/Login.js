import { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from "react-native";
import { styles } from "../../Component/style";

// firebase 데이터 추가
import { db } from '../../firebaseConfig';
import { getDocs, collection, setDoc, doc } from 'firebase/firestore';

/* LoginScreen - 관리자 로그인 화면 DB를 통해 회원 식별, 회원가입 선택 가능 */
const Login = ({navigation}) => {
    const [users, setUsers] = useState() //불러온 회원 정보


    const [idTextInput, setIdTextinput] = useState("") //입력받은 id
    const [pwTextInput, setPwTextinput] = useState("") //입력받은 password


    useEffect(() => {
        // DB에서 사용자의 데이터를 가져옴
        (async () => {
            try {

                const data = await getDocs(collection(db, "User")) // User 데이터 불러옴
                setUsers(data.docs.map(doc => doc.data())) // 데이터를 배열로 저장
                console.log('users', users)
            } catch (error) {
                console.log('eerror', error.message)
            }
        })();
    }, [])


    const login = () => {
        console.log('login')
        // 입력받은 id와 password가 DB에 저장된 회원정보와 일치하는지 확인
        users.map((user) => {
            if (user.u_id == idTextInput && user.u_pw == pwTextInput) {
                navigation.navigate("Main")
            }
        })

    }

    const idChangeInput = (event) => {
        setIdTextinput(event)
    }
    const pwChangeInput = (event) => {
        setPwTextinput(event)
    }





    return (
        <ImageBackground style={styles.image} source={require('../../assets/LoginScreen.png')} resizeMode='cover'>
            <View style={styles.mainView}>

                <TextInput
                    style={styles.loginputText}
                    value={idTextInput}
                    onChangeText={idChangeInput}
                    placeholder="ID"
                />
                <TextInput
                    style={styles.loginputText}
                    secureTextEntry={true}
                    value={pwTextInput}
                    onChangeText={pwChangeInput}
                    placeholder="PASSWORD"
                />


                <TouchableOpacity
                    style={styles.loginBTN}
                    onPress={() => {
                        login()
                    }}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginBTN}
                    onPress={() => {
                        props.navigation.navigate("SignUp")
                    }}>
                    <Text style={styles.loginText}>SignUp</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    )
}

export default Login;