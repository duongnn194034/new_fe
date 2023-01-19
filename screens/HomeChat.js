import React from "react";
import { View, StyleSheet, Text, ScrollView, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Chat from "../components/Chat";

// import ActiveUserOnHome from "../components/ActiveUserOnHome";
// import CreateRoom from "../components/CreateRoom";

const HomeChat = ({navigation}) => {
    return (
        <ScrollView contentContainerStyle={{alignItems: 'center'}} style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchIconContainer}>
                    <Ionicons name="ios-search" size={responsiveFontSize(3)} color="gray" />
                </View>
                <TextInput style={styles.search} placeholder='Search' />
            </View>
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
            <Chat
                navigation={navigation}
                profilePicture='https://i.imgur.com/w3Ln36b.jpg'
                seenPicture='https://i.imgur.com/w3Ln36b.jpg'
                name="Le Minh Hoang"
                isLastMessageYours={true}
                hasSeen={true}
                time="2 days"
                message="hello hello"
            />
            <Chat
                navigation={navigation}
                profilePicture='https://i.imgur.com/6oU7JoG.jpg'
                seenPicture='https://i.imgur.com/6oU7JoG.jpg'
                name="Hoang Minh"
                isLastMessageYours={true}
                hasSeen={false}
                time="3 days"
                message="Goodbye!!"
            />
            <Chat
                navigation={navigation}
                profilePicture='https://i.imgur.com/9qnDvZO.jpg'
                seenPicture='https://i.imgur.com/9qnDvZO.jpg'
                name="Le Minh"
                isLastMessageYours={false}
                hasSeen={false}
                time="3 days"
                message="Hi there!!"
            />
            
        </ScrollView>
    )
}

export default HomeChat

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: 10
    },
    searchContainer : {
        width : responsiveWidth(90),
        height : responsiveHeight(5),
        backgroundColor : 'rgba(211, 211, 211, 0.2)',
        borderRadius : 30,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
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