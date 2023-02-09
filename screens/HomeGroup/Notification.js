import {
  ScrollView,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Avatar from "../../components/Avatar";
const TopBar = () => {
  return (
    <View style={[styles.Row, { justifyContent: "space-between" }]}>
      <Text style={styles.label}>Thông báo</Text>
      <View>
        <TouchableOpacity style={styles.btn}>
          <Feather name="search" size={23} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const PostNotification = () => {};
const Notification = () => {
  return (
    <ScrollView style={styles.container}>
      <TopBar />
      <View style={styles.Divider} />
      <TouchableOpacity style={styles.Row}>
        <Avatar source={require("../../assets/user1.jpg")} big />
      </TouchableOpacity>
    </ScrollView>
  );
};
export default Notification;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  Row: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  Divider: {
    width: "100%",
    height: 5,
    backgroundColor: "#f0f2f5",
  },
  label: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: -0.3,
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 21,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
  },
});
