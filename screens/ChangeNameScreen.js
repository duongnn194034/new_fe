import React, { useState } from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList, TextInput, Alert } from 'react-native'
import { FONTS, SIZES } from '../constants';

const ChangeNameScreen = () => {
    const [name, onChangeName] = useState("")

  return (
    <View style={{
        backgroundColor: "white",
        flex: 1,
    }}>
        <View style={{
            margin: 10,
        }}>
            <Text style={{
                fontFamily: FONTS.regular,
                fontSize: SIZES.large,
            }}>Tên muốn thay đổi</Text>
            <TextInput
                text={name}
                onChangeText={onChangeName}
                placeholder="Tên mới"
                style={{
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "#DDDDDD",
                    marginTop: 10,
                    marginRight: 10,
                    fontSize: SIZES.medium
                }}
            />
        </View>
        <TouchableOpacity
            onPress={() => console.log("OK")}
            style={{
                backgroundColor: "#1877f2",
                height: 40,
                margin: 10,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center"

            }}>
            <Text style={{ color: "white", fontFamily: FONTS.semiBold, fontSize: SIZES.medium }}>Đổi tên</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ChangeNameScreen