import React from 'react';

import {connect} from 'react-redux';

import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');

const DrawrContent = ({navigation, user}) => {
  //   console.log('Login user ==>', user);
  const signOut = () => {
    auth().signOut();
  };

  return (
    <View style={styles.container}>
      {user && (
        <View style={{height}}>
          <View style={styles.DrawerHeaer}>
            <Image source={{uri: user.photoURL}} style={styles.profilePic} />
            <Text style={styles.userName}>{user.displayName}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{
                // position: 'absolute',
                // bottom: 0,
                alignSelf: 'flex-end',
                width: '100%',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={signOut}
                style={{
                  paddingVertical: 20,
                  paddingHorizontal: 25,
                  backgroundColor: '#f5f5f5',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                  }}>
                  SignOut
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  DrawerHeaer: {
    // height,
    // backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 20,
    // backgroundColor: '#f5f5f5',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.homeReducer.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawrContent);
