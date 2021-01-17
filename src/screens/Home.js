import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  ClippingRectangle,
  TouchableOpacity,
  Image,
} from 'react-native';

import {connect} from 'react-redux';
import {userAction, initializationAction} from '../store/actions/homeActions';
import {chatPartnerAction} from '../store/actions/chatActions';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import Header from '../components/Header';

const Home = ({
  user,
  userActionSet,
  initializationActionSet,
  initializing,
  navigation,
  chatPartnerActionSet,
}) => {
  const [usersList, setUserList] = useState([]);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    if (user) {
      userActionSet(user);
    } else {
      userActionSet(null);
      navigation.navigate('LoginScreen');
    }
    if (initializing) initializationActionSet(false);
  };

  const userInDatabase = async () => {
    if (user) {
      const {
        _snapshot: {value},
      } = await database().ref('/').child(`/users/${user.id}`).once('value');
      if (!value) {
        database().ref('/users').child(`/${user.uid}/`).set({
          name: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
        });
      }
    }
  };

  const usersListFetch = async () => {
    if (user) {
      try {
        database()
          .ref('/')
          .child(`/users/`)
          .on('value', (data) => {
            const dataObj = data.val();
            dataObj && setUserList([...usersList, {...dataObj}]);
          });
      } catch {
        setUserList([]);
      }
    }
  };

  const chatStart = (charPartner) => {
    chatPartnerActionSet(charPartner);
    navigation.navigate('ChatScreen');
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    userInDatabase();
  }, []);

  useEffect(() => {
    usersListFetch();
  }, []);

  return (
    <>
      {!initializing && (
        <>
          <Header navigation={navigation} screenName="HomeScreen" />
          <View style={styles.container}>
            {user && (
              <View>
                {usersList.length != 0 && (
                  <View>
                    {Object.keys(usersList[0]).map((key, i) => {
                      return (
                        usersList[0][key].uid !== user.uid && (
                          <TouchableOpacity
                            key={i}
                            style={styles.userList}
                            activeOpacity={0.9}
                            onPress={() => chatStart(usersList[0][key])}>
                            <Image
                              source={{uri: usersList[0][key].photoURL}}
                              style={styles.usersPhoto}
                            />
                            <Text style={styles.userName}>
                              {usersList[0][key].name}
                            </Text>
                          </TouchableOpacity>
                        )
                      );
                    })}
                  </View>
                )}
              </View>
            )}
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  userList: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
  usersPhoto: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
  },
  userName: {
    fontSize: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    initializing: state.homeReducer.initializing,
    user: state.homeReducer.user,
    chattingID: state.chatReducer.chattingID,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    userActionSet: (user) => dispatch(userAction(user)),
    initializationActionSet: (flag) => dispatch(initializationAction(flag)),
    chatPartnerActionSet: (dataObj) => dispatch(chatPartnerAction(dataObj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
