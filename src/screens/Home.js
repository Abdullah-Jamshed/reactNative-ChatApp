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

const Home = ({
  user,
  userActionSet,
  initializationActionSet,
  initializing,
  navigation,
}) => {
  // Set an initializing state whilst Firebase connects
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      userActionSet(user);
    } else {
      userActionSet(null);
      navigation.navigate('LoginScreen');
    }
    console.log(user);
    if (initializing) initializationActionSet(false);
  }

  const signOut = () => {
    auth().signOut();
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <>
      {!initializing && (
        <View style={styles.container}>
          {/* {!user && <Button title="Facebook Login" onPress={facebookLogin} />} */}
          {user && (
            <View>
              <Text>Name: {user.displayName}</Text>
              <Text>uid: {user.uid}</Text>
              {/* <Button title="SignOut" onPress={signOut} /> */}
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
