import React, { useContext, useState } from 'react'
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image,
    Button,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
const FormData = require('form-data')
import { useNetInfo } from '@react-native-community/netinfo'

import { assets, COLORS, FONTS, SIZES } from '../constants'
import { BaseURL } from '../ultis/Constants'
import AppContext from '../context/AppContext'

const MAX_AVATAR_SIZE = 4 * 1024 * 1024;

const EditScreen = () => {
    const netinfo = useNetInfo()
    // { username, description, address, city, country, link, birthday }
    const [username, setUsername] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [link, setLink] = useState("")
    const [birthday, setBirthday] = useState("")

    // avatar, coverImage
    const [avatar, setAvatar] = useState(assets.avatar)
    const [cover, setCover] = useState(assets.coverImg)

    const avatarlink = ""
    const coverlink = ""
    const typeAvatar = ""
    const typeCover = ""

    const appContext = useContext(AppContext)
    const data = appContext.loginState

    const checkConnect = () => {
        return (!netinfo.isConnected || !netinfo.isInternetReachable)
    }

    const changeInfo = async () => {
        if (checkConnect) {
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

        const formdata = new FormData()
        formdata.append("avatar",
            {
                name: "avatar",
                type: "image/" + typeAvatar[1],
                uri: avatarlink
            })
        formdata.append("avatar",
            {
                name: "avatar",
                type: "image/" + typeCover[1],
                uri: coverlink
            })

        try {
            const res = await axios(
                `${BaseURL}/user/set_user_info`,
                {
                    avatar: avatar,
                    coverImage: cover,
                },
                {
                    params: {
                        username: username,
                        description: description,
                        address: address,
                        city: city,
                        country: country,
                        link: link,
                        birthday: birthday
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const pickAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            if (result.assets[0].fileSize > MAX_AVATAR_SIZE) {
                Alert.alert(
                    "Alert: This image file is too big",
                    "Only accept image under 4MB",
                    {
                        text: "OK",
                        type: "cancel"
                    }
                )
                return
            }
            setAvatar(result.assets);
            avatarlink = result.assets[0].uri
            typeAvatar = /\.(\w+)$/.exec(result.assets[0].uri)
        }
    };

    const pickCover = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            if (result.assets[0].fileSize > MAX_AVATAR_SIZE) {
                Alert.alert(
                    "Alert: This image file is too big",
                    "Only accept image under 4MB",
                    {
                        text: "OK",
                        type: "cancel"
                    }
                )
                return
            }
            setImage(result.assets);
            coverlink = result.assets[0].uri
            typeCover = /\.(\w+)$/.exec(result.assets[0].uri)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <ScrollView>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 10, marginTop: 10 }}>
                            <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.extraLarge, }}>Ảnh đại diện</Text>
                            <Button title='Chỉnh sửa'
                                onPress={pickAvatar}
                                style={{ fontFamily: FONTS.regular, fontSize: SIZES.large }} />
                        </View>
                        <Image
                            source={{ uri: data.avatarURL }}
                            style={{
                                width: 180,
                                height: 180,
                                borderRadius: 100,
                                alignSelf: "center",
                                margin: 20,
                            }}
                        />
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 10, marginTop: 10 }}>
                            <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.extraLarge, }}>Ảnh bìa</Text>
                            <Button title='Chỉnh sửa'
                                onPress={pickCover}
                                style={{ fontFamily: FONTS.regular, fontSize: SIZES.large, }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 10 }}>
                            <Image
                                source={{ uri: data.coverImgURL }}
                                resizeMode="cover"
                                style={{ height: 250, width: "100%", alignSelf: "center", borderRadius: 12 }}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 10, marginTop: 10 }}>
                            <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.extraLarge, }}>Chi tiết</Text>
                            <Button title='Chỉnh sửa'
                                style={{ fontFamily: FONTS.regular, fontSize: SIZES.large, }} />
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ marginBottom: 30 }}>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Tên</Text>
                                <TextInput
                                    onChangeText={setUsername}
                                    value={username}
                                    placeholder={data.username}
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Tiểu sử</Text>
                                <TextInput
                                    onChangeText={setDescription}
                                    value={description}
                                    placeholder={data.description}
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Địa chỉ</Text>
                                <TextInput
                                    onChangeText={setAddress}
                                    value={address}
                                    placeholder={data.address}
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Thành phố</Text>
                                <TextInput
                                    onChangeText={setCity}
                                    value={city}
                                    placeholder={data.city}
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Quốc gia</Text>
                                <TextInput
                                    onChangeText={setCountry}
                                    value={country}
                                    placeholder={data.country}
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Link</Text>
                                <TextInput
                                    onChangeText={setLink}
                                    value={link}
                                    placeholder={data.link}
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Ngày sinh</Text>
                                <TextInput
                                    onChangeText={setBirthday}
                                    value={birthday}
                                    placeholder={data.birthday}
                                    style={styles.infoInput}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <View>
                        <TouchableOpacity
                            onPress={changeInfo}
                            style={{
                                flex: 5,
                                backgroundColor: "#1877f2",
                                height: 40,
                                margin: 10,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Text style={{ color: "white", fontFamily: FONTS.semiBold, fontSize: SIZES.medium }}>Chỉnh sửa thông tin</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    infoText: {
        flex: 2,
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large
    },
    infoInput: {
        flex: 5,
        width: 100,
        height: 40,
        fontSize: 18
    }
})
export default EditScreen