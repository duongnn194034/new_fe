import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ActiveUsers from "../components/ActiveUsers";

const Users = ({navigation}) => {

    return (
        <View style={styles.container}>
            <ScrollView>
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
            </ScrollView>
        </View>
    )
}

export default Users

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 10
    }
})