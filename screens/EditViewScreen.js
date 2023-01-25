import React, { useContext, useState } from 'react'
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image, Button,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
import { assets, COLORS, FONTS, SIZES } from '../constants'

const EditViewScreen = () => {
    const [username, setUsername] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [link, setLink] = useState("")
    const [birthday, setBirthday] = useState("")

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <KeyboardAvoidingView
                behavior='padding'
                style={{ flex: 1 }}>
                <ScrollView>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 10, marginTop: 10 }}>
                            <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.extraLarge, }}>Chi tiết</Text>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ marginBottom: 30 }}>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Tên</Text>
                                <Text
                                    value={username}
                                    placeholder="Nguyễn Văn A"
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Tiểu sử</Text>
                                <Text
                                    value={description}
                                    placeholder="Hello I'm A"
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Địa chỉ</Text>
                                <Text
                                    value={address}
                                    placeholder="Bách Khoa"
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Thành phố</Text>
                                <Text
                                    value={city}
                                    placeholder="Hà Nội"
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Quốc gia</Text>
                                <Text
                                    value={country}
                                    placeholder="Việt Nam"
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Link</Text>
                                <Text
                                    value={link}
                                    placeholder="@insta/ducminhsw"
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Ngày sinh</Text>
                                <Text
                                    value={birthday}
                                    placeholder="YYYY-MM-DD"
                                    style={styles.infoInput}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
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

export default EditViewScreen