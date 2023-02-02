import { View, Text, Image, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useContext } from 'react'

import { assets, COLORS, FONTS, SIZES } from '../constants'
import AppContext from '../context/AppContext'
import { avatar_basic, BaseURL } from '../ultis/Constants'

const FriendListScreen = ({ route }) => {
    const navigation = useNavigation();
    const appContext = useContext(AppContext);

    const friend_data = route.params
    // console.log(friend_data)

    // get_friend_info
    const get_item_info = async (userId) => {
        const res = await axios.post(
            `${BaseURL}/it4788/user/get_user_info`,
            {},
            {
                params: {
                    token: appContext.loginState.token,
                    user_id: userId
                }
            }
        )
        console.log(res.data.data)
    }

    if (JSON.stringify(friend_data) == JSON.stringify([])) {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.large }}>No friend to show</Text>
            </SafeAreaView>
        )
    }

    const FriendItem = ({ item }) => {
        console.log(item.id)
        return (
            <TouchableOpacity
                onPress={() => get_item_info(item.id)}
                // onPress={() => navigation.push("ProfileView", { item })}
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    margin: 10,
                    marginLeft: 20
                }}>
                <Image
                    source={{ uri: (item.avatar) ? item.avatar : avatar_basic.uri }}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 100,
                    }}
                />
                <Text style={{ marginLeft: 16, fontFamily: FONTS.medium }}>{item.username}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <FlatList
                data={friend_data}
                renderItem={({ item }) => <FriendItem item={item} />} />
        </View>
    )
}

export default FriendListScreen