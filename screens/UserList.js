import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import AppContext from "../context/AppContext";
import { BaseURL } from "../ultis/Constants";

const Users = () => {

    const navigation = useNavigation();
    const appContext = useContext(AppContext);
    const [state, setState] = useState(null);

    var MSG_LIST = [{}];

    const generateKey = (numberOfCharacters) => {
        return require('random-string')({length: numberOfCharacters});
    }

    const refreshFlatList = (activeKey) => {
        setState((prevState) => {
            return{
                deletedRowKey: activeKey
            };
        });
    }

    // const checkConversation = async (partnerId) => {
    //     try {
    //         const res = await axios.post(
    //             `${BASEURL}/it4788/chat/get_conversation`,
    //             {},
    //             {
    //                 params:{    // token: token login
    //                     token: LOGIN_TOKEN,
    //                     index: 0,
    //                     count: 50,
    //                     partner_id: partnerId
    //                 }
    //             }
    //         )
    //         console.log('get conversation');
    //         // console.log(res.data.data.conversation)

    //         MSG_LIST = res.data.data.conversation;
    //         // console.log(MSG_LIST[0].message);
            
    //         navigation.navigate('ChatView', {
    //             data: MSG_LIST,
    //             partner_id: partnerId,
    //             username: res.data.data.conversation[0].sender.username
    //         });
    //         return;
            
    //     } catch (error) {
    //         console.log(`error: ${error}`)
    //         console.log('create conversation')
    //         const res = await axios.post(
    //             `${BASEURL}/it4788/chat/create_conversation`,
    //             {},
    //             {
    //                 params:{
    //                     conversationId: generateKey(5),
    //                     firstUser: '63d4a90b99927c523ca04f02',   // My Id
    //                     secondUser: partnerId
    //                 }
    //             }
    //         )

    //         console.log(res.data.data)
            

    //         MSG_LIST = [
    //             {
    //                 message_id: generateKey(8),
    //                     message: 'Giờ đây 2 bạn đã có thể nhắn tin cho nhau',
    //                     sender: {
    //                         id: '63d4a90b99927c523ca04f02',  // My ID
    //                     }
    //             }
    //         ]
            
    //         navigation.navigate('ChatView', {
    //             data: MSG_LIST,
    //             partner_id: partnerId,
    //             username: resInfo.data.data.username
    //         })

    //     }
        
        
    // }

    const DATA = [  // friend_data
        {
            id: '63d4a82abb4edf5b244219a5',
            name: 'Hoàng',
            avatar: 'https://i.imgur.com/w3Ln36b.jpg'
        },
        {
            id: '63d4e4acb1fb9f28c0e14b3b',
            name: 'Minh Hoang',
            avatar: 'https://i.imgur.com/9qnDvZO.jpg'
        },
        {
            id: '63d4a90b99927c523ca04f02',
            name: 'Minh',
            avatar: 'https://i.imgur.com/w3Ln36b.jpg'
        },
        {
            id: '63d4f66cb1fb9f28c0e14b3d',
            name: 'Văn Huy',
            avatar: 'https://i.imgur.com/6oU7JoG.jpg'
        },
        
    ]

    return (
        <View style={styles.container}>
            {/* <ScrollView>
                <ActiveUsers
                    navigation={navigation}
                    name="Le Minh Hoang"
                    profile='https://i.imgur.com/w3Ln36b.jpg'
                />
                <ActiveUsers
                    navigation={navigation}
                    name="Hoang Minh"
                    profile='https://i.imgur.com/6oU7JoG.jpg'
                />
                <ActiveUsers
                    navigation={navigation}
                    name="Le Minh"
                    profile='https://i.imgur.com/9qnDvZO.jpg'
                />
            </ScrollView> */}
            <FlatList
                data={DATA}
                extraData={state}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                    return <TouchableOpacity onPress={ async () => {
                            // checkConversation(item.id);
                            try {
                                const res = await axios.post(
                                    `${BaseURL}/it4788/chat/get_conversation`,
                                    {},
                                    {
                                        params:{    // token: token login
                                            token: appContext.loginState.token,
                                            index: 0,
                                            count: 50,
                                            partner_id: item.id
                                        }
                                    }
                                )
                                console.log('get conversation');
                                // console.log(res.data.data.conversation)
                    
                                MSG_LIST = res.data.data.conversation;
                                // console.log(MSG_LIST[0].message);
                                
                                navigation.navigate('ChatView', {
                                    data: MSG_LIST,
                                    partner_id: item.id,
                                    username: item.name,
                                    conversation_id: ''
                                });
                                return;
                                
                            } catch (error) {
                                console.log(`error: ${error}`)
                                console.log('create conversation')
                                const newKey = generateKey(5);
                                const res = await axios.post(
                                    `${BaseURL}/it4788/chat/create_conversation`,
                                    {},
                                    {
                                        params:{
                                            conversationId: newKey,
                                            firstUser: appContext.loginState.user_id,   // My Id
                                            secondUser: item.id
                                        }
                                    }
                                )
                    
                                console.log(res.data.data)
                                
                    
                                MSG_LIST = [
                                    {
                                        message_id: generateKey(8),
                                            message: 'Giờ đây 2 bạn đã có thể nhắn tin cho nhau',
                                            sender: {
                                                id: appContext.loginState.user_id,  // My ID
                                            }
                                    }
                                ]

                                refreshFlatList(generateKey(5));
                                
                                navigation.navigate('ChatView', {
                                    data: MSG_LIST,
                                    partner_id: item.id,
                                    username: item.name,
                                    conversation_id: newKey
                                })
                    
                            }
                        }
                    } activeOpacity={0.7} style={styles.container1}>
                                <View style={styles.imageContainer}>
                                    <Image style={styles.image} source={{ uri: item.avatar }} />
                                    {/* <View style={styles.activeStatus} /> */}
                                </View>
                                <Text style={styles.name}>{item.name}</Text>
                            </TouchableOpacity>
                }}
            >
            </FlatList>
        </View>
    )
}

export default Users

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 10
    },
    container1: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    imageContainer: {
        position: 'relative'
    },
    image: {
        width: responsiveHeight(5),
        height: responsiveHeight(5),
        borderRadius: 200
    },
    name: {
        paddingHorizontal: 10,
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold'
    },
})