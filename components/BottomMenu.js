import React, { useState } from "react";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
const BottomMenu = ({setModalVisible}) => {
  const disableModal = ()=>setModalVisible(false);
  return (
    <View style={styles.flexView}>
      <Modal
        onBackdropPress={() => disableModal()}
        onBackButtonPress={()=>disableModal()}
        isVisible={true}
        swipeDirection="down"
        onSwipeComplete={disableModal}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.center}>
            <View style={styles.barIcon} />
            <Text style={styles.text}>Welcome To My Bottom Sheet</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default BottomMenu
const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    backgroundColor: "white",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#161616",
    paddingTop: 12,
    // paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 400,
    paddingBottom: 20,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 3,
  },
  text: {
    color: "#bbb",
    fontSize: 24,
    marginTop: 100,
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
});
