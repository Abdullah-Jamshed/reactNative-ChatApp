import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {connect} from 'react-redux';
import {userAction, initializationAction} from '../store/actions/homeActions';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Home = ({
  user,
  userActionSet,
  initializationActionSet,
  initializing,
  navigation,
}) => {
  // Set an initializing state whilst Firebase connects
  // const [initializing, setInitializing] = useState(true);
  const [usersList, setUserList] = useState([]);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    if (user) {
      userActionSet(user);
    } else {
      userActionSet(null);
      navigation.navigate('LoginScreen');
    }
    // console.log(user);
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
        });
      }
    }
  };

  const usersListFetch = async () => {
    if (user) {
      const users = await database()
        .ref('/')
        .child(`/users/`)
        .on('value', (data) => {
          const dataObj = data.val();
          // console.log([...usersList]);
          // console.log('dataObj ===>', {...usersList, {...dataObj}});
          setUserList([...usersList, {...dataObj}]);
        });

      // if (!value) {
      //   database().ref('/users').child(`/${user.uid}/`).set({
      //     name: user.displayName,
      //     uid: user.uid,
      //   });
      // }
    }
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
        <View style={styles.container}>
          {/* {!user && <Button title="Facebook Login" onPress={facebookLogin} />} */}
          {user && (
            <View>
              {/* <Text>Name: {user.displayName}</Text>
              <Text>uid: {user.uid}</Text> */}
              {usersList.length &&
                Object.keys(usersList[0]).map((key, i) => {
                  return (
                    usersList[0][key].name !== user.displayName && (
                      <Text key={i}>name : {usersList[0][key].name}</Text>
                    )
                  );
                })}
            </View>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    initializing: state.homeReducer.initializing,
    user: state.homeReducer.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    userActionSet: (user) => dispatch(userAction(user)),
    initializationActionSet: (flag) => dispatch(initializationAction(flag)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
