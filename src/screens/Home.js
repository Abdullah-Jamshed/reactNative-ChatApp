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

import {LoginManager, AccessToken} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';

// fetch(
//   `https://graph.facebook.com/${data.userID}?fields=name,birthday,last_name,email&access_token=${data.accessToken}`,
// )

const Home = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log(user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const facebookLogin = async () => {
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
        console.log('user ==>', user);
      })
      .catch((err) => {
        console.log('error ==>', err);
      });
  };

  const signOut = () => {
    auth()
    .signOut()
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <>
      {!initializing && (
        <View style={styles.container}>
          {!user && <Button title="Facebook Login" onPress={facebookLogin} />}
          {user && (
            <View>
              <Text>Name: {user.displayName}</Text>
              <Text>uid: {user.uid}</Text>
              <Button title="SignOut" onPress={signOut} />
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

export default Home;
