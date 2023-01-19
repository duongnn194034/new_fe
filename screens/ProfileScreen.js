import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useContext } from 'react'

import AppContext from '../context/AppContext'

import { assets, COLORS, FONTS, SIZES } from '../constants'
import Separator from '../components/Separator'
import SeparatorSmall from '../components/SeparatorSmall'

const BaseURL2 = "https://6f39-2001-ee0-4914-f780-2491-e240-5ebe-b8bb.ap.ngrok.io/it4788/auth"

const ProfileScreen = () => {
    const navigation = useNavigation();
    const appContext = useContext(AppContext);

    const DATA = [
        {
            id: "1",
            avatar: assets.zoro_avatar,
            name: "Zoro",
        },
        {
            id: "2",
            avatar: assets.nami_avatar,
            name: "Nami",
        },
        {
            id: "3",
            avatar: assets.sanji_avatar,
            name: "Sanji",
        },
        {
            id: "4",
            avatar: assets.zoro_avatar,
            name: "Zoro",
        },
        {
            id: "5",
            avatar: assets.nami_avatar,
            name: "Nami",
        },
        {
            id: "6",
            avatar: assets.sanji_avatar,
            name: "Sanji",
        },
    ]

    const Item = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("ProfileView", {
                    item
                })}
                style={{ flexDirection: 'column', alignItems: "center", marginHorizontal: 5 }}>
                <Image
                    source={item.avatar}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 100,
                    }}
                />
                <Text style={{ marginTop: 10 }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const axiosTest = async () => {
        try {
            const res = await axios.post(
                `${BaseURL2}/login`,
                {},
                {
                    params: {
                        phonenumber: "0971885192",
                        password: "hellominh1"
                    }
                }
            )
            console.log(JSON.stringify(res.data.data.id))
            appContext.dispatch({
                type: 'LOGIN',
                user_id: JSON.stringify(res.data.data.id),
                token: JSON.stringify(res.data.data.token),
                username: JSON.stringify(res.data.data.username)
            })
            console.log("appContext Runned")
            console.log(appContext.loginState.user_id)
            console.log(appContext.loginState.token)
            console.log(appContext.loginState.username)

        } catch (error) {
            console.log(JSON.stringify(error.message))
        }
    }

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView>
                <View style={{
                    alignItems: "center"
                }}>
                    <Image
                        source={assets.coverImg}
                        resizeMode="cover"
                        style={{ height: 250, width: "100%" }}
                    />
                    <View
                        style={{
                            backgroundColor: "white",
                            borderRadius: 300,
                            width: 170,
                            height: 170,
                            marginTop: -100,
                            justifyContent: "center"
                        }}>
                        <Image
                            source={assets.avatar}
                            resizeMode="cover"
                            style={{ width: 160, height: 160, alignSelf: "center", borderRadius: 300, }} />
                    </View>
                    <Text style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.extraLarge, marginTop: 10, }}>Nguyễn Đức Minh</Text>
                    <View style={{ width: "100%", height: 60, flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Edit")}
                            style={{
                                flex: 5,
                                backgroundColor: "#1877f2",
                                height: 40,
                                margin: 10,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center"

                            }}>
                            <Text style={{ color: "white", fontFamily: FONTS.semiBold, fontSize: SIZES.medium }}>Chỉnh sửa trang cá nhân</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("Setting")}
                            style={{
                                flex: 1,
                                backgroundColor: "#DDDDDD",
                                height: 40,
                                marginVertical: 10,
                                marginRight: 10,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Text style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.medium }}>...</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Separator />

                <View>
                    <View style={{
                        backgroundColor: "#DDDDDD",
                        width: 100,
                        height: 36,
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 10,
                        marginBottom: 0,
                        borderRadius: 24,
                    }}>
                        <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.font }}>Giới thiệu</Text>
                    </View>

                    <SeparatorSmall />

                    <View>
                        <View style={{ flexDirection: 'row', margin: 10, alignItems: "center", marginLeft: 20 }}>
                            <Image
                                source={assets.work}
                                resizeMode="contain"
                                style={{
                                    tintColor: "#777777",
                                    width: 24,
                                    height: 24,
                                }} />
                            <Text style={{ marginLeft: 10, fontSize: SIZES.medium }}>Đang làm việc tại TruePlatform</Text>
                        </View>

                        <View style={{ flexDirection: 'row', margin: 10, alignItems: "center", marginLeft: 20 }}>
                            <Image
                                source={assets.livein}
                                resizeMode="contain"
                                style={{
                                    tintColor: "#777777",
                                    width: 24,
                                    height: 24,
                                }} />
                            <Text style={{ marginLeft: 10, fontSize: SIZES.medium }}>Đến từ Hưng Yên</Text>
                        </View>

                        <View style={{ flexDirection: 'row', margin: 10, alignItems: "center", marginLeft: 20 }}>
                            <Image
                                source={assets.status}
                                resizeMode="contain"
                                style={{
                                    tintColor: "#777777",
                                    width: 24,
                                    height: 24,
                                }} />
                            <Text style={{ marginLeft: 10, fontSize: SIZES.medium }}>Độc thân</Text>
                        </View>
                    </View>
                    <Separator />

                    <View>
                        <View style={{
                            backgroundColor: "#DDDDDD",
                            width: 100,
                            height: 36,
                            alignItems: "center",
                            justifyContent: "center",
                            margin: 10,
                            marginBottom: 10,
                            borderRadius: 24,
                        }}>
                            <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.font }}>Bạn bè</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: "100%" }}>
                            <FlatList style={{ flex: 1 }}
                                data={DATA}
                                renderItem={({ item }) => <Item item={item} />}
                                horizontal={true}
                                keyExtractor={item => item.id}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("FriendList", DATA)}
                            style={{
                                backgroundColor: "#DDDDDD",
                                height: 40,
                                margin: 10,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center"

                            }}>
                            <Text style={{ color: "black", fontFamily: FONTS.semiBold, fontSize: SIZES.medium }}>Xem tất cả bạn bè</Text>
                        </TouchableOpacity>
                    </View>

                    <Separator />
                </View>
                <View>
                    <View style={{
                        backgroundColor: "#DDDDDD",
                        width: 100,
                        height: 36,
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 10,
                        marginBottom: 0,
                        borderRadius: 24,
                    }}>
                        <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.font }}>Bài viết</Text>
                    </View>

                    <SeparatorSmall />
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Image
                            source={assets.avatar}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 200,
                                margin: 10,
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Setting")}
                            style={{
                                width: 300,
                                height: 36,
                                borderRadius: 20,
                                justifyContent: "center",
                                borderWidth: 1,
                                borderColor: "#AAAAAA",
                            }}>
                            <View
                                style={{
                                    marginStart: 15
                                }}>
                                <Text style={{ color: "#AAAAAA" }}>Say something</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Separator />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen