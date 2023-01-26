import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, Image, StyleSheet, useWindowDimensions, SafeAreaView, TouchableOpacity, ImageComponent, Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import Logo from "../assets/images/facebook_logo.png";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput"
import { BaseURL } from "../ultis/Constants"
import AppContext from "../context/AppContext";

const SignIn = () => {
    const navigation = useNavigation()
    const netinfo = useNetInfo()
    const appContext = useContext(AppContext)

    const { height } = useWindowDimensions();
    const [phonenumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);

    const axios = require('axios').default

    const onLoginPressed = async () => {
        if (!netinfo.isConnected || !netinfo.isInternetReachable) {
            Alert.alert(
                "Lỗi mạng",
                "Kết nối không thành công, kiểm tra kết nối với mạng và thử lại",
                [
                    {
                        text: "OK",
                        style: 'cancel'
                    }
                ]
            )
            return
        }
        try {
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
            const user_data = res.data.data
            appContext.dispatch({
                type: 'LOGIN',
                user_id: user_data.id,
                token: user_data.token,
                username: user_data.username,
                description: user_data.description,
                address: user_data.address,
                city: user_data.city,
                country: user_data.city,
                link: user_data.link,
                birthday: user_data.birthday.slice(0, 10),
                avatar: user_data.avatar,
                coverImg: user_data.coverImage
            })
            navigation.navigate("Profile")
        } catch (error) {
            console.log(error)
            Alert.alert(
                "Lỗi đăng nhập",
                "Tài khoản hoặc mật khẩu không chính xác",
                [
                    {
                        text: "OK",
                        style: 'cancel'
                    }
                ]
            )
        }
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