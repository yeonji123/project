import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Dimensions, ScrollView, TextInput, Keyboard, KeyboardAvoidingView,
  Image, TouchableOpacity, NativeModules,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// firebase 데이터 추가
import { db } from '../../firebaseConfig';
import { getDocs, collection, setDoc, doc } from 'firebase/firestore';


// 키보드가 가리는 문제 때문에 아마 아이폰에만 있을 듯?
const { StatusBarManager } = NativeModules


const Join = ({ navigation }) => {
  // 입력 내용
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");

  //회원가입 버튼 활설화
  const [okId, setOkId] = useState(false);
  const [okPw, setOkPw] = useState(false);
  const [okPwEq, setOkPwEq] = useState(false);
  const [okName, setOkName] = useState(false);
  const [okPhone, setOkPhone] = useState(false);
  const [okMail, setOkMail] = useState(false);


  //정규식 메시지 check
  const [errorMessageid, setErrorMessageID] = useState(""); //id
  const [errorMessagePw, setErrorMessagePw] = useState(""); // pw
  const [errorMessagePwEq, setErrorMessageEq] = useState(""); // pwEq
  const [errorMessageName, setErrorMessageName] = useState(""); // name
  const [errorMessageMail, setErrorMessageMail] = useState(""); // nickname 
  const [errorMessagePhone, setErrorMessagePhone] = useState(""); // phone

  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
      setStatusBarHeight(statusBarFrameData.height)
    }) : null
  }, []);






  // 버튼 활성화 Sign Up
  const regiButton = () => {
    if (okId & okPw & okPwEq & okName & okName & okPhone & okMail == true) {
      return false;
    }
    return true;
  }


  //아이디 정규식
  const validateId = id => {
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regex.test(id) && id.length > 4;
  }

  //패스워드 정규식
  const validatePw = pw => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(pw);
  }

  //패드워드 같은지
  const validateEq = eq => {
    if (eq === pw) { return true; }
    else { return false; }
  }

  //이름 정규식
  const validateName = name => {
    const regex = /^[가-힣]{2,20}$/;
    return regex.test(name);
  }

  //전화번호 정규식
  const validatePhone = phone => {
    const regex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    return regex.test(phone);
  }

  // 이메일 정규식
  const validateMail = mail => {
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*$/;
    return regex.test(mail);
  }

  //띄어쓰기 고로시
  const removespace = text => {
    const regex = /\s/g;
    return text.replace(regex, '');
  }

  //자동 하이픈 생성
  const autoHyphen = (target) => {
    return target.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
  }


  //아이디 핸들러
  const handleIdChange = (id) => {
    const changeID = removespace(id)
    setId(changeID)
    setErrorMessageID(
      validateId(changeID) ? "올바른 ID 형식입니다." : "영문으로 4~12자리"
    );

  };

  //비밀번호 핸들러
  const handlePwChange = (pw) => {
    const changedPw = removespace(pw);
    setPassword(changedPw);
    setErrorMessagePw(
      validatePw(changedPw) ? "올바른 비밀번호 형식입니다." : "영어 한개이상 숫자 한개 이상 특수문자 한개이상 8자리 이상."
    );
    setOkPw(validatePw(changedPw));
  }

  //비밀번호 확인 핸들러
  const handlePwEqChange = (eq) => {
    const changedPwEq = removespace(eq);
    setPasswordCheck(changedPwEq);
    setErrorMessageEq(
      validateEq(changedPwEq) ? "비밀번호가 일치합니다." : "비밀번호가 다릅니다!"
    );
    setOkPwEq(validateEq(changedPwEq));
  }
  //이름 핸들러
  const handleNameChange = (name) => {
    const changedName = removespace(name);
    setName(changedName);
    setErrorMessageName(
      validateName(changedName) ? "올바른 이름 형식입니다." : "이름을 올바르게 입력해주세요."
    );
    setOkName(validateName(changedName));
  }

  //전화번호 핸들러
  const handlePhoneChange = (call) => {
    const changedPhone = autoHyphen(call);
    setPhone(changedPhone);
    setErrorMessagePhone(
      validatePhone(changedPhone) ? "올바른 휴대전화 번호입니다" : "올바른 휴대전화 번호가 아닙니다."
    );
    setOkPhone(validatePhone(changedPhone));
  }

  const handleMailChange = (mail) => {
    const changedMail = removespace(mail);
    setMail(changedMail)
    setErrorMessageMail(
      validateMail(changedMail) ? '올바른 이메일 형식입니다.' : '올바른 이메일 형식이 아닙니다.'
    )
    setOkMail(validateMail(changedMail))
  }


  // 아이디 중복 확인
  const checkID = (id) => {
    //DB 아이디 중복체크
    // 중복이면 false
    (async () => {
      try {

          const data = await getDocs(collection(db, "User")) // Station이라는 테이블 명
          var total = 0; // 전체 사용자 수
          var check = 0; // id가 중복되지 않은 사용자 수 

          data.docs.map(doc => {
            total += 1; // 전체
            if (doc.data().u_id === id) {
              Alert('중복된 아이디입니다.')
              setUsercheck(false)
              setOkId(false)
            } else {
              check += 1 // 중복 확인 
            }
          })

          if (total != check) { // 사용자가 중복 확인을 했는지 여부 확인하기 위해 
            // total과 check가 다르면 중복확인을 클릭, 중복된 아이디가 없다는 뜻
            setUsercheck(true)
          }
      } catch (error) {
        console.log('eerror', error.message)
      }
    })();

  }




  const SignUpButton = () => {
    // 회원가입 DB 넣기
    console.log(id)
      (async () => {

        const docRef = await setDoc(doc(db, "StationNotification", dbid), {
          no_additional: sentence,
          no_date: today,
          no_num: notifyN + 1,
          no_type: breakList,
          st_id: 'station1',
          u_id: 'user1'
        });
        console.log("Document written with ID: ", docRef.id);

      })();


  }


  return (
    <View style={styles.container}>

      {/* 회원가입 */}
      <View style={styles.title}>
        <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/Logo.png')} />
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={"padding"}
        keyboardVerticalOffset={statusBarHeight + 44}
      >
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/* 사용자 필수정보 */}
            <View style={styles.importInfo}>
              <View style={{ width: '80%' }}>
                <Text style={styles.titleText}>ID</Text>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                  <TextInput
                    style={styles.idloginputText}
                    value={id}
                    placeholder="ID"
                    onChangeText={handleIdChange}
                    
                    maxLength={15}
                  ></TextInput>

                  <TouchableOpacity
                    style={styles.overlapButton}
                    disabled={!validateId(id)}
                    onPress={() => { checkID(id) }}
                  >
                    <Text style={{ fontSize: 15 }}>
                      중복확인
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text>{errorMessageid}</Text>

                <Text style={styles.titleText}>PW</Text>
                <TextInput
                  style={styles.loginputText}
                  value={password}
                  placeholder="Password"
                  onChangeText={handlePwChange}
                />
                <Text>{errorMessagePw}</Text>

                <Text style={styles.titleText}>Check PW</Text>
                <TextInput
                  style={styles.loginputText}
                  value={passwordCheck}
                  placeholder="Check Password"
                  onChangeText={handlePwEqChange}
                ></TextInput>
                <Text>{errorMessagePwEq}</Text>

                <Text style={styles.titleText}>Name</Text>
                <TextInput
                  style={styles.loginputText}
                  value={name}
                  placeholder="Name"
                  onChangeText={handleNameChange}
                ></TextInput>
                <Text>{errorMessageName}</Text>

                <Text style={styles.titleText}>Phone</Text>
                <TextInput
                  style={styles.loginputText}
                  value={phone}
                  placeholder="Phone Number"
                  onChangeText={handlePhoneChange}
                  maxLength={13}
                  numeric
                  keyboardType={'numeric'}
                ></TextInput>
                <Text>{errorMessagePhone}</Text>

                <Text style={styles.titleText}>E-mail</Text>
                <TextInput
                  style={styles.loginputText}
                  value={mail}
                  placeholder="E-mail"
                  onChangeText={handleMailChange}
                ></TextInput>
                <Text>{errorMessageMail}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>


      <View style={{ paddingBottom: 50 }}>
        <TouchableOpacity
          style={styles.loginBTN}
          disabled={regiButton}
          onPress={() => { SignUpButton }}
        >
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBTN}
          onPress={() => {
            props.navigation.navigate("Login")
          }}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default Join;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  title: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.2,
  },
  importInfo: { // 회원가입 필수정보
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitbutton: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.1,
  },
  //로그인 화면 인풋텍스트
  idloginputText: {
    width: '73%',
    height: 35,
    fontSize: 18,
    color: 'black',
    backgroundColor: '#EDEDED',
    borderRadius: 3,
    alignItems: 'center',
    padding: 5,
  },
  loginputText: {
    width: '100%',
    height: 35,
    fontSize: 18,
    color: 'black',
    backgroundColor: '#EDEDED',
    borderRadius: 3,
    alignItems: 'center',
    padding: 5,
  },

  titleText: {
    marginTop: 8,
    marginLeft: 8,
    color: '#6699FF',
    fontWeight: 'bold',
  },

  overlapButton: {
    backgroundColor: '#6699FF',
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: '25%',
    borderRadius: 5,
    marginLeft: 5,
  },
  loginBTN: {
    backgroundColor: '#D9E5FF',
    width: 100,
    height: 30,
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //로그인 화면 버튼 텍스트
  loginText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
});