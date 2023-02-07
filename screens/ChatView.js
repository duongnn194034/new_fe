import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, FlatList, Image } from "react-native";
import { useNavigation } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import axios from 'axios'

import AppContext from "../context/AppContext";
import { BaseURL } from "../ultis/Constants";

const ChatView = ({route}) => {
    let flatListMsgRef;
    const navigation = useNavigation();
    const appContext = useContext(AppContext);

    // var conversation_Id='';
    const [conversation_Id, setConversation_Id] = useState('');
    
    var MSG_LIST = route.params.data;
    const partner_id = route.params.partner_id;
    const conversationId = route.params.conversation_Id
    
    const getConversationId = async () => {
        const res = await axios.post(
            `${BaseURL}/it4788/chat/get_list_conversation`,
            {},
            {
                params: {   // Login Token
                    index: 0,
                    count: 50,
                    token: appContext.loginState.token
                }
            }
        )
        const response = res.data.data;

        for(var i in response){
            // console.log(i)
            if(JSON.stringify(response[i].partner.id) == JSON.stringify(partner_id)){
                // conversation_Id = JSON.stringify(response[i].id);
                setConversation_Id(response[i].id);
                return;
            }
            
        }
    }

    useEffect(() => {
        getConversationId();
    })


    const refreshFlatList = (activeKey) => {
        setState((prevState) => {
            return{
                deletedRowKey: activeKey
            };
        });
        flatListMsgRef.scrollToEnd({animated: true})
    }


    const [state, setState] = useState({
        newMsg: '',
        idCate: 1
    })

    const generateKey = (numberOfCharacters) => {
        return require('random-string')({length: numberOfCharacters});
    }
    
    return (
        <View style={styles.container}>

            <FlatList
                ref={(ref) => {flatListMsgRef = ref}}
                data={MSG_LIST}
                keyExtractor={item => item.message_id}
                renderItem={({item, index}) => {
                    return ( <View>{ item.sender.id == appContext.loginState.user_id ? // My ID
                        <View style={styles.sendContainer}>
                            <View style={styles.msgContainer}>
                                <Text style={styles.sendMsg}>{item.message}</Text>
                            </View>
                        </View>
                    :
                        <View style={styles.receivedContainer}>
                            <View style={styles.proPicContainer}>
                                <Image style={styles.proPic} source={{ uri : 'https://i.imgur.com/6oU7JoG.jpg' }} />
                            </View>
                            <View style={styles.receivedMsgContainer}>
                                <Text style={styles.receivedMsg}>{item.message}</Text>
                            </View>
                        </View>
                }
                    </View>
                    )
                    
                }}
                style={{flex: 1}}>
            
            </FlatList>
            
            <View style={styles.inputContainer}>
                <View style={styles.sendMsgContainer}>
                    <TextInput
                    placeholder="Aa"
                    style={styles.input}
                    onChangeText={newText => setState({newMsg: newText})}
                    value={state.newMsg} />
                    <Entypo name="emoji-happy" size={responsiveFontSize(2.5)} color="gray" />
                </View>

                <TouchableOpacity onPress={async () => {
                    getConversationId();
                    console.log(conversation_Id);
                    console.log(typeof(conversation_Id));
                    
                    if(state.newMsg == ''){
                        console.log('message is null');
                        return;
                    }
                    const newKey = generateKey(8);
                    const newMessage = {
                        message_id: newKey,
                        message: state.newMsg,
                        sender: {
                            id: appContext.loginState.user_id,  // My ID
                        }
                    };
                    MSG_LIST.push(newMessage);
                    refreshFlatList(newKey);

                    try {
                        const res = await axios.post(
                            `${BaseURL}/it4788/chat/add_dialog`,
                            {},
                            {
                                params: {
                                    dialogId: generateKey(8),
                                    conversationId: conversation_Id,  // conversationId
                                    senderId: appContext.loginState.user_id,   // My ID => firstUser or secondUser
                                    content: state.newMsg
                                }
                            }
                        )
                        console.log(res.data)
                    } catch (error) {
                        console.log(`error: ${error}`);
                    }


                    
                }} style={styles.icon}>
                    <FontAwesome5 name="paper-plane" size={responsiveFontSize(3.5)} color="#006AFF" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatView

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        flex: 1,
    },
    chatContainer : {

    },
    inputContainer : {
        height : responsiveHeight(7),
        flexDirection : 'row',
        alignItems : 'center',
        shadowOffset : { width : 2, height : 2 },
        shadowColor : 'black',
        shadowOpacity : 0.5,
        shadowRadius : 20,
        elevation : 3,
        paddingLeft: 10
    },
    input : {
        flex : 1,
        fontSize : responsiveFontSize(1.8)
    },
    sendMsgContainer : {
        width : '86%',
        backgroundColor : 'rgba(211,211,211,0.5)',
        borderRadius : 20,
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal : 10,
        height : '70%'
    },
    icon : {
        padding : 5,
        width : '12%',
        justifyContent : 'center',
        alignItems : 'center'
    },
    msgContainer : {
        backgroundColor : '#006AFF',
        borderRadius : 20,
        padding : 10,
        maxWidth : '80%'
    },
    sendMsg : { 
        color : 'white',
        fontWeight : '500',
        fontSize : responsiveFontSize(1.9)
    },
    sendContainer: {
        paddingHorizontal : 10,
        marginVertical : 5,
        flexDirection : 'row',
        width : '100%',
        justifyContent : 'flex-end'
    },
    receivedContainer: {
        paddingHorizontal : 10,
        marginVertical : 5,
        flexDirection : 'row',
        maxWidth : '80%'
    },
    receivedMsgContainer : {
        backgroundColor : '#F1F0F0',
        borderRadius : 20,
        padding : 10,
    },
    receivedMsg : { 
        color : 'black',
        fontWeight : '500',
        fontSize : responsiveFontSize(1.9)
    },
    proPicContainer : {
        display : 'flex',
        paddingRight : 10,
        justifyContent : 'flex-end',
        // backgroundColor : 'red'
    },
    proPic : {
        width : responsiveHeight(4),
        height : responsiveHeight(4),
        borderRadius : 200
    }
})