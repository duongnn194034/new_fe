import { AntDesign, FontAwesome, Zocial } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal } from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

export default function UserInfo(){

    const deleteChat = () => {
        console.log('delete')
    }

    const blockChat = () => {
        console.log('block')
    }

    return (
                <View style={styles.model}>
                    
                    <View style={styles.content}>
                        {/* <View style={styles.topContainer}>
                            <Zocial style={styles.icon} name="call" size={responsiveFontSize(3)} color="#006AFF" />
                            <FontAwesome style={styles.icon} name="video-camera" size={responsiveFontSize(3)} color="#006AFF" />
                        </View> */}
                        <View style={styles.centerContainer}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image} source={{ uri: 'https://i.imgur.com/6oU7JoG.jpg' }} />
                            </View>
                            <Text style={styles.name}>Name</Text>
                            <Text style={styles.name}>12.12.2001</Text>
                            <Text style={styles.name}>Description</Text>
                            {/* <Text style={styles.facebookTitle}>Facebook</Text>
                            <Text style={styles.caption}>You're friend on Facebok</Text> */}
                        </View>
                        <TouchableOpacity onPress={ deleteChat } style={styles.bottomBtn1}>
                            <Text style={styles.btnText}>DELETE</Text>
                            
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ blockChat } style={styles.bottomBtn}>
                            <Text style={styles.btnText}>BLOCk</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    model: {
        width: '100%',
        height: '100%',
        backgroundColor: '#006aff4f',
        // backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '80%',
        height: '60%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 200,
        // paddingBottom : 20,
    },
    // topContainer: {
    //     height: '20%',
    //     justifyContent: 'flex-end',
    //     flexDirection : 'row',
    //     padding : 10
    // },
    icon: {
        paddingHorizontal: 10
    },
    centerContainer: {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    bottomBtn: {
        height : 60,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#006AFF'
    },
    bottomBtn1: {
        height : 60,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'red'
    },
    btnText: {
        color : 'white',
        fontSize : 18,
    },
    name: {
        fontSize : 24
    },
    facebookTitle: {
        fontSize : 13
    },
    caption: {
        color : 'gray',
        fontSize : 14
    },
    close : {
        width : 35,
        height : 35,
        backgroundColor : 'transparent',
        flexDirection : 'column',
        position: 'absolute',
        top : 20,
        left : 20,
        color : 'white'
    },
    imageContainer : {
        paddingBottom : 20
    }
})