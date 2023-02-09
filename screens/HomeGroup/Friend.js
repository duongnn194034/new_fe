import {
  ScrollView,
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
      <Text style={styles.label}>Bạn bè</Text>
      <View>
        <TouchableOpacity style={styles.btn}>
          <Feather name="search" size={23} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const BottomBar = () => {
  return (
    <View style={styles.Row}>
      <TouchableOpacity style={styles.btn1}>
        <Text style={styles.textStyle}>Tất cả bạn bè</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn1}>
        <Text style={styles.textStyle}>Danh sách chặn</Text>
      </TouchableOpacity>
    </View>
  );
};
const UserChoice = () => {
  return (
    <View>
      <View style={[styles.Row]}>
        <Text style={styles.textStyle}>Tạ Thành</Text>
        <Text style={{ marginLeft: 100 }}>1 ngày</Text>
      </View>
      <View style={[styles.Row]}>
        <TouchableOpacity>
          <Text style={[styles.btnAccept]}>Chấp nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.btnDeny]}>Xoá</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const FriendRequest = () => {
  return (
    <View style={styles.Row}>
      <Avatar source={require("../../assets/user1.jpg")} big />
      <UserChoice />
    </View>
  );
};
const FriendRequestList = () => {
  return (
    <View>
      <View style={styles.Row}>
        <Text style={styles.label}>Lời mời kết bạn</Text>
      </View>
      <ScrollView>
        <FriendRequest />
      </ScrollView>
    </View>
  );
};
const Friend = () => {
  return (
    <View style={styles.container}>
      <TopBar />
      <BottomBar />
      <View style={styles.Divider} />
      <FriendRequestList />
    </View>
  );
};
export default Friend;
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
  textStyle: {
    fontSize: 20,
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
  btn1: {
    borderRadius: 21,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 16,
  },
  btnAccept: {
    borderRadius: 21,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 15,
    color: "#ffffff",
  },
  btnDeny: {
    borderRadius: 21,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 15,
    color: "#ffffff",
    marginLeft: 75,
  },
});
