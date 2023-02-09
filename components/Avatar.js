import React from "react";
import { Image, StyleSheet, View } from "react-native";
export default Avatar = (props) => {
  const imageUrl= props.Avatar;
  return (
    <View style={styles.Container}>
      <Image
        style={
          props.big ? styles.User1 :(props.small ? styles.User2 : styles.User)
        }
        source={imageUrl ? {uri: imageUrl} : require('../assets/default_avatar.png')}
        story={props.story}
      />
      {props.online && <View style={styles.UserActive} />}
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    position: "relative",
  },
  User: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#1777f2",
  },
  User1: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: "#1777f2",
  },
  User2: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#1777f2",
  },
  UserActive: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: "#4bcb1f",
    position: "absolute",
    bottom: -2,
    right: -2,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
});
