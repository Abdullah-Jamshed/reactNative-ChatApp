import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import Header from '../components/Header';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

const Chat = ({navigation, chatPartner}) => {
  // console.log(chatPartner);
  return (
    <>
      {chatPartner.uid && (
        <View style={styles.container}>
          <Header screenName="ChatScreen" navigation={navigation} />
          <View>
            <Button title="Go back" onPress={() => navigation.goBack()} />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    chatPartner: state.chatReducer.chatPartner,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
