import React from "react"
import { StyleSheet, View, SafeAreaView } from "react-native"
import CustomInput from "..components/CustomInput"

const ForgotPassword = () => {
    return (
        <SafeAreaView>
            <Text style={styles.header}>ForgotPassword</Text>
            <View>
                <CustomInput/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
})