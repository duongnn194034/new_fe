import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Image, StyleSheet, useWindowDimensions, SafeAreaView, TouchableOpacity } from "react-native";
import Logo from "../assets/images/facebook_logo.png";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput"
import { BaseURL } from "../ultis/Constants"


const SignIn = () => {
    const navigation = useNavigation()

    const { height } = useWindowDimensions();
    const [phonenumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);

    const axios = require('axios').default

    const onLoginPressed = async () => {
        const res = await axios.post(
            `${BaseURL}/it4788/auth/login`,
            {},
            {
                params: {
                    phonenumber: phonenumber,
                    password: password
                }
            }
        )
        console.log(res)
    };
    const onForgotPasswordPressed = () => {

    };
    const onSignUpPressed = () => {
        navigation.navigate("SignUp")
    };


    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
            />
            <View style={styles.inputGroup}>
                <CustomInput
                    placeholder="Số điện thoại"
                    value={phonenumber}
                    setValue={setPhoneNumber}
                />
                <View style={styles.password}>
                    <CustomInput
                        placeholder="Mật khẩu"
                        value={password}
                        setValue={setPassword}
                        secureTextEntry={secure}
                    />
                    <TouchableOpacity style={styles.visible} onPress={() => setSecure(!secure)} activeOpacity={0.7}>
                        {secure ?
                            <Image source={require('../assets/icons/visible.jpg')} style={{ width: '100%', height: '100%', color: '#E8E8E8' }} resizeMode='contain' />
                            :
                            <Image source={require('../assets/icons/notvisible.jpg')} style={{ width: '100%', height: '100%', color: '#E8E8E8' }} resizeMode='contain' />
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.signInButtonGroup}>
                <CustomButton
                    text="Đăng nhập"
                    onPress={onLoginPressed}
                />
                <CustomButton
                    text="Quên mật khẩu?"
                    onPress={onForgotPasswordPressed}
                    type="TERTIARY"
                />
            </View>
            <View
                style={styles.line}
            />
            <View style={styles.registerGroup}>
                <CustomButton
                    text="Tạo tài khoản mới"
                    onPress={onSignUpPressed}
                    type="SECONDARY"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    root: {
        justifyContent: 'center',
        padding: 20,
        flex: 1
    },
    logo: {
        width: '30%',
        maxWidth: 300,
        height: 100,
        marginHorizontal: '35%'
    },
    inputGroup: {
        marginVertical: '10%'
    },
    signInButtonGroup: {
        marginTop: '25%'
    },
    line: {
        borderBottomColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '80%',
        marginLeft: '10%',
        marginTop: 10,
    },
    registerGroup: {
        marginVertical: 10,
    },
    visible: {
        height: 30,
        width: 25,
        position: 'absolute',
        right: '8%',
        alignSelf: 'center',
    },
    password: {
        flexDirection: 'row'
    }
})

export default SignIn;