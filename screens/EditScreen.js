import { Text, View, SafeAreaView, ScrollView, Image, Button } from 'react-native'
import { assets, COLORS, FONTS, SIZES } from '../constants'
import axios from 'axios'

import Separator from '../components/Separator'
import SeparatorSmall from '../components/SeparatorSmall'

const EditScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 10, marginTop: 10 }}>
                        <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.extraLarge, }}>Ảnh đại diện</Text>
                        <Button title='Chỉnh sửa'
                            style={{ fontFamily: FONTS.regular, fontSize: SIZES.large, }} />
                    </View>
                    <Image
                        source={assets.avatar}
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
                    <Image
                        source={assets.coverImg}
                        resizeMode="cover"
                        style={{ height: 250, width: "100%" }}
                    />
                </View>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 10, marginTop: 10 }}>
                        <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.extraLarge, }}>Chi tiết</Text>
                        <Button title='Chỉnh sửa'
                            style={{ fontFamily: FONTS.regular, fontSize: SIZES.large, }} />
                    </View>
                </View>
                <View>
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
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export default EditScreen