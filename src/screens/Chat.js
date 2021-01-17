import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

// components
import Header from '../components/Header';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

import {chatPartnerAction} from '../store/actions/chatActions';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
} from 'react-native';

import database from '@react-native-firebase/database';

const Chat = ({
  navigation,
  chatPartner,
  user,
  chattingID,
  chatPartnerActionSet,
}) => {
  const [value, onChangeText] = useState('');
  const [chatId, setChatId] = useState(null);
  const [messagesList, setMessageList] = useState([]);

  const chattingIDGernate = () => {
    console.log(chatPartner.name);
    if (user.uid < chatPartner.uid) {
      setChatId('chat_' + user.uid + '_' + chatPartner.uid);
    } else {
      setChatId('chat_' + chatPartner.uid + '_' + user.uid);
    }
  };



  const fetchMassages = () => {
    // console.log('chat id before fetch data ===> ', chatId);
    if (chatId) {
      try {
        database()
          .ref('/')
          .child(`/messages/${chatId}`)
          .on('value', (data) => {
            if (data.val()) {
              var dataObj = data.val();
              var arr = [];
              Object.keys(dataObj).forEach((key) => {
                arr.push(dataObj[key]);
                // setMessageList([...messagesList, dataObj[key]]);
              });
              setMessageList(arr);
            } else {
              setMessageList([]);
            }
          });
      } catch {
        console.log('error');
      }
    }
  };

  const backButton = () => {
    setChatId(null);
  };

  useEffect(() => {
    console.log(messagesList);
  }, [messagesList]);

  useEffect(() => {
    if (chatPartner.uid) {
      chattingIDGernate();
    }
  }, [chatPartner]);

  useEffect(() => {
    fetchMassages();
  }, [chatId]);

  return (
    <>
      {chatPartner.uid && (
        <View style={styles.container}>
          <Header
            screenName="ChatScreen"
            navigation={navigation}
            backButtonFunc={backButton}
          />

          <View style={styles.chatPanel}>
            <ScrollView>
              {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
            </ScrollView>
          </View>
          <View style={styles.chatSend}>
            <TextInput
              style={styles.chatInput}
              onChangeText={(text) => onChangeText(text)}
              value={value}
              placeholder="Useless Placeholder"
              // multiline={true}
            />
            <Ionicons
              name="send"
              onPress={() => navigation.openDrawer()}
              size={30}
            />
            {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
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
  chatPanel: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    overflow: 'scroll',
  },
  chatSend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  chatInput: {
    width: '80%',
    height: 40,
    borderColor: '#9e9e9e',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    backgroundColor: '#ffff',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.homeReducer.user,
    chatPartner: state.chatReducer.chatPartner,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    chatPartnerActionSet: (dataObj) => dispatch(chatPartnerAction(dataObj)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
