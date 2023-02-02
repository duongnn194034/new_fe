import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'

import AppContext from '../context/AppContext'

import { assets, COLORS, FONTS, SIZES } from '../constants'
import Separator from '../components/Separator'
import { avatar_basic, BaseURL, coverImage_basic, DATA } from '../ultis/Constants'

const ProfileViewScreen = ({ route }) => {
    const navigation = useNavigation()
    const appContext = useContext(AppContext)

    const { id, avatar, username, coverImage, friendState } = route.params.item
    const [friend, setFriend] = useState(friendState)
    const [block, setBlock] = useState(0)
    const [friendStateInit, setFriendState] = useState("Bạn bè")

    const blockUser = async () => {
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
        setBlock(1)
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
            `${BaseURL}/it4788/friend/get_user_friends`,
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
        const DATA = res.data.data.friends
        navigation.push("FriendList", DATA)

        return res;
    }

    const Item = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.push("ProfileView", { item })}
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
                        source={{ uri: coverImage ? coverImage : coverImage_basic.uri }}
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
                            source={{ uri: avatar ? avatar : avatar_basic.uri }}
                            resizeMode="cover"
                            style={{ width: 160, height: 160, alignSelf: "center", borderRadius: 300, }} />
                    </View>
                    <Text style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.extraLarge, marginTop: 10, }}>{username}</Text>
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
                            <Text style={{ color: "white", fontFamily: FONTS.semiBold, fontSize: SIZES.medium }}>{friendStateInit}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.push("Setting")}
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
                            onPress={() => navigation.push("EditView")}
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
                            onPress={getFriends}
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