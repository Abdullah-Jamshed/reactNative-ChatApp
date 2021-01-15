import React, {useEffect, useState} from 'react';

import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import { LoginButton, AccessToken } from 'react-native-fbsdk';


//  Screens
import Home from '../screens/Home';
import Login from '../screens/Login';
import Chat from '../screens/Chat';

const Navigation = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Navigation;
