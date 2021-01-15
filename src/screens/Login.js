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

import {LoginManager, AccessToken} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';

const Login = ({
  userActionSet,
  navigation,
  initializing,
  initializationActionSet,
}) => {

  const [loading, setLoading] = useState(false);

  const facebookLogin = async () => {
    setLoading(true);
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    auth()
      .signInWithCredential(facebookCredential)
      .then((user) => {
        // console.log('user ==>', user);
      })
      .catch((err) => {
        console.log('error ==>', err);
      });
  };

  function onAuthStateChanged(user) {
    // console.log(user);
    if (user) {
      setLoading(false);
      userActionSet(user);
      navigation.navigate('HomeScreen');
    }
    if (initializing) initializationActionSet(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Facebook Login" onPress={facebookLogin} />
      {loading && <Text>Loading ....</Text>}
    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
