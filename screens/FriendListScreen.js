import { View, Text, Image, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useContext } from 'react'

import { assets, COLORS, FONTS, SIZES } from '../constants'
import AppContext from '../context/AppContext'

const FriendListScreen = ({ route }) => {
    const navigation = useNavigation();
    const appContext = useContext(AppContext);

    const friend_data = route.params

    if (JSON.stringify(friend_data) == JSON.stringify([])) {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.large }}>No friend to show</Text>
            </SafeAreaView>
        )
    }

    const FriendItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("ProfileView", { item })}
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    margin: 10,
                    marginLeft: 20
                }}>
                <Image
                    source={item.avatar}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 100,
                    }}
                />
                <Text style={{ marginLeft: 16, fontFamily: FONTS.medium }}>{item.name}</Text>
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