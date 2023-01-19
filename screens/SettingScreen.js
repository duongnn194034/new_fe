import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useContext } from 'react'

import AppContext from '../context/AppContext'
import { BaseURL } from '../ultis/Constants'

import { assets, COLORS, FONTS, SHADOWS, SIZES } from '../constants'

const SettingScreen = () => {
    const navigation = useNavigation();
    const appContext = useContext(AppContext);

    let token = appContext.loginState.token;
    const logout = async () => {
        try {
            const res = await axios.post(
                `${BaseURL}/auth/logout`,
                {},
                {
                    params: {
                        token: token
                    }
                }
            )
            console.log(JSON.stringify(res))
            appContext.dispatch({
                type: 'LOGOUT'
            })
        } catch (error) {
            console.log(JSON.stringify(error.message))
        }
    }

    const logoutButton = () => {
        Alert.alert("Alert", "Are you sure to logging out?", [
            {
                text: "Yes",
                onPress: () => console.log("logging out")
            },
            {
                text: "Cancel",
                onPress: () => console.log("Cancel logout"),
                style: 'cancel'
            }
        ])
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ChangePass")}
                    style={{
                        width: "90%",
                        height: 48,
                        backgroundColor: "#DDDDDD",
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 8,
                        marginVertical: 10,
                        backgroundColor: "white",
                        ...SHADOWS.medium
                    }}>
                    <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.medium }}>Đổi mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigation.navigate("ChangeName")}
                    style={{
                        width: "90%",
                        height: 48,
                        backgroundColor: "#DDDDDD",
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 8,
                        marginVertical: 10,
                        backgroundColor: "white",
                        ...SHADOWS.medium
                    }}>
                    <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.medium }}>Đổi tên hiển thị</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={logoutButton}
                    style={{
                        width: "90%",
                        height: 48,
                        backgroundColor: "#DDDDDD",
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 8,
                        marginVertical: 10,
                        backgroundColor: "white",
                        ...SHADOWS.medium
                    }}>
                    <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.medium }}>Đăng xuất</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SettingScreen