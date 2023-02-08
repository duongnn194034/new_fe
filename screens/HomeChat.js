import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput, Alert, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Chat from "../components/Chat";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../context/AppContext";
import axios from "axios";
import { BaseURL } from "../ultis/Constants";

// import ActiveUserOnHome from "../components/ActiveUserOnHome";
// import CreateRoom from "../components/CreateRoom";

const HomeChat = () => {
    const navigation = useNavigation();
    const appContext = useContext(AppContext);

    const [listData, setListData] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    var MSG_LIST = [{}];

    const getListConversation = async () => {
        try {
            const res = await axios.post(
                `${BaseURL}/it4788/chat/get_list_conversation`,
                {},
                {
                    params: {   // login token
                        index: 0,
                        count: 50,
                        token: appContext.loginState.token
                    }
                }
            )

            // console.log(res.data.data);
            setListData(res.data.data);

            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getListConversation();
    })


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                    <View style={styles.searchIconContainer}>
                        <Ionicons name="ios-search" size={responsiveFontSize(3)} color="gray" />
                    </View>
                    <TextInput style={styles.search} placeholder='Search' />
                </View>
                <FlatList
                    contentContainerStyle={{alignItems: 'center'}}
                    data={listData}
                    keyExtractor={item => item.id}
                    renderItem={({item, index}) => {
                        return <TouchableOpacity onPress={ async () => {
                                // console.log(listData[0]);
                                // try {
                                //     const resInfo = await axios.post(
                                //         `${BASEURL}/it4788/user/get_user_info`,
                                //         {},
                                //         {
                                //             params: {   // Login token
                                //                 token: LOGIN_TOKEN,
                                //                 user_id: item.partner.id
                                //             }
                                //         }
                                //     )
                                //     console.log(resInfo.data.data.username);
                                //     setUserInfo(resInfo.data.data);
                        
                                // } catch (error) {
                                //     console.log(`error: ${error}`);
                                //     Alert.alert(
                                //         "Lỗi lấy thông tin",
                                //         "Không thể lấy thông tin User",
                                //         [
                                //             {
                                //                 text: "OK",
                                //                 style: 'cancel'
                                //             }
                                //         ]
                                //     )
                                // }

                                try {
                                    const res = await axios.post(
                                        `${BaseURL}/it4788/chat/get_conversation`,
                                        {},
                                        {
                                            params:{    // token: token login
                                                token: appContext.loginState.token,
                                                index: 0,
                                                count: 50,
                                                // partner_id: item.partner.id
                                                conversation_id: item.id
                                            }
                                        }
                                    )
                                    console.log('get conversation');
                                    // console.log(res.data.data.conversation)
                        
                                    MSG_LIST = res.data.data.conversation;
                                    // console.log(MSG_LIST[0].message);
                                    
                                    navigation.navigate('ChatView', {
                                        data: MSG_LIST,
                                        partner_id: item.partner.id,
                                        username: item.partner.username,
                                        conversation_id: item.id
                                    });
                                } catch (error) {
                                    console.log(`error: ${error}`);
                                }

                            }} activeOpacity={0.7} style={styles.containerItem}>
                            <Chat
                            profilePicture='https://cdn2.downdetector.com/static/uploads/logo/fb-messenger.png'
                            name={item.partner.username}
                            isLastMessageYours={false}
                            hasSeen={item.lastMessage.unread == 0}
                            time={`${(new Date(item.lastMessage.created*1000)).toLocaleTimeString().slice(0, -3)} ${(new Date(item.lastMessage.created*1000)).toLocaleDateString()}`}
                            message={item.lastMessage.message}
                        />
                    </TouchableOpacity>
                    }}
                    >

                </FlatList>
            {/* <ScrollView contentContainerStyle={{alignItems: 'center'}} style={styles.container}> */}
                
                {/* <View style={styles.activeUsersContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{marginVertical: 10}}>
                        <CreateRoom />
                        <ActiveUserOnHome  />
                        <ActiveUserOnHome  />
                        <ActiveUserOnHome  />
                        <ActiveUserOnHome  />
                        <ActiveUserOnHome  />
                        <ActiveUserOnHome  />
                        <ActiveUserOnHome  />
                    </ScrollView>
                </View> */}
                {/* <Chat
                    navigation={navigation}
                    profilePicture='https://i.imgur.com/w3Ln36b.jpg'
                    name="Le Minh Hoang"
                    isLastMessageYours={true}
                    hasSeen={true}
                    time="2 days"
                    message="hello hello"
                />
                <Chat
                    navigation={navigation}
                    profilePicture='https://i.imgur.com/6oU7JoG.jpg'
                    name="Hoang Minh"
                    isLastMessageYours={true}
                    hasSeen={false}
                    time="3 days"
                    message="Goodbye!!"
                />
                <Chat
                    navigation={navigation}
                    profilePicture='https://i.imgur.com/9qnDvZO.jpg'
                    name="Le Minh"
                    isLastMessageYours={false}
                    hasSeen={false}
                    time="3 days"
                    message="Hi there!!"
                />
                
            </ScrollView> */}
        </SafeAreaView>
    )
}

export default HomeChat

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: 10,
    },
    containerItem: {
        flexDirection: 'row',
        width: '100%',
        height: responsiveHeight(9),
        paddingHorizontal: 8,
        marginVertical: 2
    },
    searchContainer : {
        width : responsiveWidth(94),
        height : responsiveHeight(5),
        backgroundColor : 'rgba(211, 211, 211, 0.2)',
        borderRadius : 30,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft: 10
        // backgroundColor : 'red'
    },
    search : {
        flex : 1
    },
    searchIconContainer : {
        paddingHorizontal : 10
    },
    // activeUsersContainer : {
    //     height : responsiveHeight(13),
    //     width : responsiveWidth(100),
    //     marginVertical : 5
    // }
})