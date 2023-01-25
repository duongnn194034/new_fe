import React from 'react'
import { View, StyleSheet, Modal, Button, Image, TouchableWithoutFeedback, TextInput, Pressable } from 'react-native'
import DatePicker from 'react-native-modern-datepicker'
import CustomInput from './CustomInput';

const MyDatePicker = ({date, setSelectedDate}) => {
    const [open, setOpen] = React.useState(false);
    return (
        <View style={styles.container}>
                <View style={styles.dateView}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            editable={false}
                            style={styles.date}
                        >
                            {date}
                        </TextInput>
                    </View>
                    <Pressable style={styles.icon} onPress={() => setOpen(!open)}>
                        <Image source={require('../assets/calendar.png')} style={{width: '100%', height: '100%'}} resizeMode='contain'/>
                    </Pressable>
                </View>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={open}
                    onRequestClose={() => setOpen(!open)}
                >
                    <View style={styles.modal}>
                        <DatePicker
                            onSelectedChange={date => setSelectedDate(date)}
                            mode="calendar"
                            
                        />
                        <View style={styles.button}>
                            <Button
                                title='Xác nhận'
                                onPress={() => setOpen(!open)}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginHorizontal: '5%'
    },
    button: {
        position: 'absolute',
        top: 365,
        right: 20
    },
    dateView: {
        flexDirection: 'row'
    },
    icon: {
        height: 30,
        width: 25,
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
    },
    date: {
        fontSize: 17,
        alignSelf: 'center',
        color: '#000000'
    },
    inputContainer: {
        backgroundcolor: 'white',
        width: '89%',
        height: 50,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingTop: 10,
        marginVertical: 5,
    },
    modal: {
        marginVertical: '45%',
        borderColor: '#EEEEEE',
        borderWidth: StyleSheet.hairlineWidth
    },
})

export default MyDatePicker;