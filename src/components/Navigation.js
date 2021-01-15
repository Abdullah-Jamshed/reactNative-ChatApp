import React, {useEffect, useState} from 'react';

import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import { LoginButton, AccessToken } from 'react-native-fbsdk';

//  Screens
import Home from '../screens/Home';
import Login from '../screens/Login';
import Chat from '../screens/Chat';

//  Components 
import DrawerContent from '../components/DrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={Home} />
    </Stack.Navigator>
  );
};
const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={Login} />
    </Stack.Navigator>
  );
};
const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={Chat} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeScreen" component={HomeStack} />
        <Drawer.Screen name="LoginScreen" component={LoginStack} />
        <Drawer.Screen name="ChatScreen" component={ChatStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Navigation;
