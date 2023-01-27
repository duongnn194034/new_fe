import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import React, { useState, Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, FlatList, Image } from "react-native";
import { State } from "react-native-gesture-handler";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import msgList from "../data/msgList";

const ChatView = () => {

    const refreshFlatList = (activeKey) => {
        setState((prevState) => {
            return{
                deletedRowKey: activeKey
            };
        });
    }

    const [state, setState] = useState({
        newMsg: '',
        idCate: 1
    })
    
    const sendMsg = () => {
        console.log('Send msg')
    }

    const generateKey = (numberOfCharacters) => {
        return require('random-string')({length: numberOfCharacters});
    }
    
    // 1: send, 2: received
    // const [msgList, setMsgList] = useState([
    //     {
    //         key: '8990289042834joqwjer92rq',
    //         msg: 'Hello!',
    //         idCate: 1
    //     },
    //     {
    //         key: '899028904248djfqwjer92rq',
    //         msg: 'Hello There!',
    //         idCate: 2
    //     },
    //     {
    //         key: '899028904s829soqwjer92rq',
    //         msg: 'How are u?',
    //         idCate: 1
    //     },
    //     {
    //         key: '89hjd8d042834joqwjer92rq',
    //         msg: 'Fine',
    //         idCate: 2
    //     },
    //     {
    //         key: '89902890428348s8wjer92rq',
    //         msg: 'Adjgjhs',
    //         idCate: 1
    //     }
    // ])
    return (
        <View style={styles.container}>
            
            <FlatList
                data={msgList}
                keyExtractor={item => item.key}
                renderItem={({item, index}) => {
                    return ( <View>{ item.idCate == 1 ?
                        <View style={styles.sendContainer}>
                            <View style={styles.msgContainer}>
                                <Text style={styles.sendMsg}>{item.msg}</Text>
                            </View>
                        </View>
                    :
                        <View style={styles.receivedContainer}>
                            <View style={styles.proPicContainer}>
                                <Image style={styles.proPic} source={{ uri : 'https://i.imgur.com/6oU7JoG.jpg' }} />
                            </View>
                            <View style={styles.receivedMsgContainer}>
                                <Text style={styles.receivedMsg}>{item.msg}</Text>
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

                <TouchableOpacity onPress={() => {
                    const newKey = generateKey(24);
                    const newMessage = {
                        key: newKey,
                        msg: state.newMsg,
                        idCate: 1
                    };
                    msgList.push(newMessage);
                    refreshFlatList(newKey);

                    
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
