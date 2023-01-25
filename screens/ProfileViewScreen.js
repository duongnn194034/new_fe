import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'

import AppContext from '../context/AppContext'

import { assets, COLORS, FONTS, SIZES } from '../constants'
import Separator from '../components/Separator'
import SeparatorSmall from '../components/SeparatorSmall'
import { BaseURL } from '../ultis/Constants'



const ProfileViewScreen = ({ route }) => {
    const navigation = useNavigation();
    const appContext = useContext(AppContext);

    const { id, avatar, name } = route.params.item
    const [friend, setFriend] = useState(0)
    const [block, setBlock] = useState(0)
    const [friendState, setFriendState] = useState("Bạn bè")

    useEffect(() => {
        if (friend == 0) {
            setFriendState("Thêm bạn bè")
        }
        if (friend == 2 || friend == 1) {
            setFriendState("Hủy yêu cầu")
        }
    }, [friend])
    const checkFriend = (friend) => {
        if (friend == 0) {
            setFriend(1)
        }
        if (friend == 2 || friend == 1) {
            setFriend(0)
        }
    }

    const blockUser = async () => {
        // api call
        const res = await axios.post(
            `${BaseURL}/friend/set_block`,
            {},
            {
                params: {
                    token: appContext.loginState.token,
                    user_id: id,
                    type: block
                }
            }
        )
        console.log(res)
    }

    const blockAlert = () => {
        Alert.alert('Block Alert', 'Do you want to block/unblock this user?',
            [
                {
                    text: 'Yes',
                    onPress: () => blockUser,
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ])
    }

    const getFriends = async () => {
        const res = await axios.post(
            `${BaseURL}/friend/get_user_friends`,
            {},
            {
                params: {
                    token: appContext.loginState.token,
                    user_id: id,
                    index: 0,
                    count: 10
                }
            }
        )

        console.log(JSON.stringify(res.data.data.friends))

        return res;
    }

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
                onPress={() => navigation.navigate("ProfileView", { item })}
                style={{ alignItems: "center", marginHorizontal: 5 }}>
                <Image
                    source={item.avatar}
                    style={{
                        width: 30,
                        height: 30,
                        borderRadius: 100,
                        marginLeft: item.id === "1" ? 0 : -20,
                    }}
                />
            </TouchableOpacity>
        )
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
                            source={avatar}
                            resizeMode="cover"
                            style={{ width: 160, height: 160, alignSelf: "center", borderRadius: 300, }} />
                    </View>
                    <Text style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.extraLarge, marginTop: 10, }}>{name}</Text>
                    <View style={{ width: "100%", height: 60, flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={() => checkFriend(friend)}
                            style={{
                                flex: 4,
                                flexDirection: 'row',
                                backgroundColor: "#1877f2",
                                height: 40,
                                margin: 10,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center"

                            }}>
                            <Image
                                source={assets.friend_ic}
                                style={{
                                    width: 28,
                                    height: 28,
                                    tintColor: "white",
                                    margin: 2
                                }}
                            />
                            <Text style={{ color: "white", fontFamily: FONTS.semiBold, fontSize: SIZES.medium }}>{friendState}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("Setting")}
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                backgroundColor: "#dddddd",
                                height: 40,
                                marginVertical: 10,
                                marginRight: 10,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Image
                                source={assets.mess_ic}
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: "black",
                                    margin: 2
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={blockAlert}
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                backgroundColor: "#dddddd",
                                height: 40,
                                marginVertical: 10,
                                marginRight: 10,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Text style={{ color: "black", fontFamily: FONTS.semiBold, fontSize: SIZES.medium }}>...</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Separator />

                <View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{
                            width: 100,
                            height: 36,
                            justifyContent: "center",
                            margin: 10,
                            marginBottom: 0,
                            borderRadius: 24,
                        }}>
                            <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.medium }}>Giới thiệu</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("EditView")}
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                margin: 10,
                                marginBottom: 0,
                                borderRadius: 24,
                            }}>
                            <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.medium, alignSelf: "center", color: "#BBBBBB" }}>Xem thông tin giới thiệu {'>'}</Text>
                        </TouchableOpacity>

                    </View>
                    <Separator />
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{
                                height: 36,
                                justifyContent: "center",
                                margin: 10,
                                borderRadius: 24,
                            }}>
                                <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.medium }}>Bạn bè</Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: 250, direction: "rtl", margin: 10 }}>
                                <FlatList
                                    data={DATA}
                                    renderItem={({ item }) => <Item item={item} />}
                                    horizontal={true}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("FriendList", DATA)}
                            style={{
                                backgroundColor: "#DDDDDD",
                                height: 40,
                                marginHorizontal: 10,
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
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{
                            width: 100,
                            height: 36,
                            justifyContent: "center",
                            margin: 10,
                            marginBottom: 0,
                            borderRadius: 24,
                        }}>
                            <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.medium }}>Bài viết</Text>
                        </View>
                        <TouchableOpacity style={{
                            alignItems: "center",
                            justifyContent: "center",
                            margin: 10,
                            marginBottom: 0,
                            borderRadius: 24,
                        }}>
                            <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.medium, alignSelf: "center", color: "#BBBBBB" }}>Thêm bài viết {'>'}</Text>
                        </TouchableOpacity>

                    </View>
                    <Separator />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileViewScreen