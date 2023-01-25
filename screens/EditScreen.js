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
import { assets, COLORS, FONTS, SIZES } from '../constants'

const EditScreen = () => {
    // { username, description, address, city, country, link, birthday }
    const [username, setUsername] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [link, setLink] = useState("")
    const [birthday, setBirthday] = useState("")

    const [avatar, setAvatar] = useState(assets.avatar)
    const [cover, setCover] = useState(assets.coverImg)

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
                                style={{ fontFamily: FONTS.regular, fontSize: SIZES.large, }} />
                        </View>
                        <Image
                            source={avatar}
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
                                style={{ fontFamily: FONTS.regular, fontSize: SIZES.large, }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 10 }}>
                            <Image
                                source={cover}
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
                                    placeholder="Nguyễn Văn A"
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Tiểu sử</Text>
                                <TextInput
                                    onChangeText={setDescription}
                                    value={description}
                                    placeholder="Hello I'm A"
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Địa chỉ</Text>
                                <TextInput
                                    onChangeText={setAddress}
                                    value={address}
                                    placeholder="Bách Khoa"
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Thành phố</Text>
                                <TextInput
                                    onChangeText={setCity}
                                    value={city}
                                    placeholder="Hà Nội"
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Quốc gia</Text>
                                <TextInput
                                    onChangeText={setCountry}
                                    value={country}
                                    placeholder="Việt Nam"
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Link</Text>
                                <TextInput
                                    onChangeText={setLink}
                                    value={link}
                                    placeholder="@insta/ducminhsw"
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Ngày sinh</Text>
                                <TextInput
                                    onChangeText={setBirthday}
                                    value={birthday}
                                    placeholder="YYYY-MM-DD"
                                    style={styles.infoInput}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <View>
                        <TouchableOpacity
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