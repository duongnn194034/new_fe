import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import React, { useReducer } from 'react';

import { reducer } from './context/AppReducer'
import AppContext from './context/AppContext'

import ProfileScreen from './screens/ProfileScreen';
import EditScreen from './screens/EditScreen';
import EditViewScreen from './screens/EditViewScreen';
import SettingScreen from './screens/SettingScreen';
import ProfileViewScreen from './screens/ProfileViewScreen';
import FriendListScreen from './screens/FriendListScreen';
import ChangePassScreen from './screens/ChangePassScreen';
import SignIn from './screens/SignInScreen';
import SignUp from './screens/SignUpScreen';

const Stack = createStackNavigator()

export default function App() {
  const initLoginState = {
    token: null,
    user_id: null,
    username: null,
    description: null,
    address: null,
    city: null,
    country: null,
    link: null,
    birthday: null,
    avatarURL: null,
    coverImgURL: null,
    friend_list: [],
    block_list: [],
    received: []
  }

  const [loginState, dispatch] = useReducer(reducer, initLoginState);
  const appContext = {
    loginState,
    dispatch
  }

  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) return null;

  return (
    <AppContext.Provider value={appContext}>
      <NavigationContainer>
        <Stack.Navigator
          // screenOptions={{ headerShown: false }}
          initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignIn} screenOptions={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Profile" component={ProfileScreen} screenOptions={{ headerShown: true }}/>
          <Stack.Screen name="Edit" component={EditScreen} />
          <Stack.Screen name="EditView" component={EditViewScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
          <Stack.Screen name="ProfileView" component={ProfileViewScreen} />
          <Stack.Screen name="FriendList" component={FriendListScreen} />
          <Stack.Screen name="ChangePass" component={ChangePassScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

