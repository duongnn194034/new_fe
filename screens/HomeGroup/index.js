import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { appColor } from "../../ultis/Constants";
import Feed from "./Feed";
import Notification from "./Notification";
import Setting from "./Setting";
import Friend from "./Friend";
import { NavigationContext } from "../../navigations/MainNavigation";
import { useNavigation } from "@react-navigation/native";
const TopBar = () => {
  const navigation = useNavigation();
  const navigationRef = useContext(NavigationContext);
  const name = navigationRef?.current?.getCurrentRoute()?.name;
  let enable = true;
  if (name) {
    if (!(name === "Feed")) enable = false;
  }
  return (
    enable && (
      <View style={styles.subContainer}>
        <Text style={styles.appName}>Facebook</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn}>
            <Feather name="search" size={23} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("HomeChat");
            }}
          >
            <MaterialCommunityIcons name="facebook-messenger" size={23} />
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};
const HomeTab = createMaterialTopTabNavigator();
const HomeNavigator = () => {
  return (
    <HomeTab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        // swipeEnabled: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Feed") {
            return (
              <Entypo
                name="home"
                size={26}
                color={focused ? appColor.LIGHT_BLUE : "black"}
              />
            );
          } else if (route.name === "Friend") {
            return (
              <MaterialIcons
                name="group"
                size={26}
                color={focused ? appColor.LIGHT_BLUE : "black"}
              />
            );
          } else if (route.name === "Notification") {
            return (
              <Entypo
                name="bell"
                size={26}
                color={focused ? appColor.LIGHT_BLUE : "black"}
              />
            );
          } else {
            return (
              <Entypo
                name="menu"
                size={26}
                color={focused ? appColor.LIGHT_BLUE : "black"}
              />
            );
          }
        },
      })}
    >
      <HomeTab.Screen name="Feed" component={Feed} />
      <HomeTab.Screen name="Friend" component={Friend} />
      <HomeTab.Screen name="Notification" component={Notification} />
      <HomeTab.Screen name="Setting" component={Setting} />
    </HomeTab.Navigator>
  );
};
export default Home = () => {
  return (
    <View style={styles.container}>
      <TopBar />
      <HomeNavigator />
    </View>
  );
};
export { Feed, Friend, Notification, Setting };
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    paddingTop: 16,
    width: "100%",
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: "#ffffff",
  },
  appName: {
    color: "#3a86e9",
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: -0.3,
  },
  row: {
    flexDirection: "row",
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
