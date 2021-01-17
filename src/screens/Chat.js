import React, {useEffect, useState, useRef} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  Dimensions,
} from 'react-native';

import {connect} from 'react-redux';


// components
import Header from '../components/Header';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';


import database from '@react-native-firebase/database';

const {width, height} = Dimensions.get('window');

const Chat = ({navigation, chatPartner, user}) => {
  const [value, onChangeText] = useState('');
  const [chatId, setChatId] = useState(null);
  const [messagesList, setMessageList] = useState([]);

  const scrollEnd = useRef('');

  const chattingIDGernate = () => {
    if (user.uid < chatPartner.uid) {
      setChatId('chat_' + user.uid + '_' + chatPartner.uid);
    } else {
      setChatId('chat_' + chatPartner.uid + '_' + user.uid);
    }
  };

  const fetchMassages = () => {
    if (chatId) {
      try {
        var arr = [];
        database()
          .ref('/')
          .child(`/messages/${chatId}`)
          .on('child_added', (data) => {
            if (data.exists()) {
              var dataObj = data.val();
              arr.push(dataObj);
            } else {
              setMessageList([]);
            }
            setMessageList([...messagesList, ...arr]);
          });
      } catch {
        console.log('error');
      }
    }
  };

  const backButton = () => {
    setChatId(null);
    setMessageList([]);
  };
  const sendMessage = async () => {
    if (chatId && value !== '') {
      onChangeText('');
      const key = database().ref().push().key;
      database().ref('/').child(`/messages/${chatId}/${key}`).set({
        key,
        uid: user.uid,
        message: value,
      });
    }
  };

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
            <ScrollView
              ref={scrollEnd}
              onContentSizeChange={(width, height) =>
                scrollEnd.current.scrollTo({y: height})
              }>
              {messagesList.length != 0 && (
                <View>
                  {messagesList.map((massageObj) => {
                    return (
                      <View
                        key={massageObj.key}
                        style={
                          massageObj.uid === user.uid
                            ? styles.myChat
                            : styles.otherChat
                        }>
                        <View
                          style={
                            massageObj.uid === user.uid
                              ? styles.chatTextContainer1
                              : styles.chatTextContainer2
                          }>
                          <Text
                            style={
                              massageObj.uid === user.uid
                                ? styles.chatText1
                                : styles.chatText2
                            }>
                            {massageObj.message}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
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
              onPress={sendMessage}
            />
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
    paddingTop: 20,
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
  myChat: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'flex-end',
  },
  otherChat: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  chatTextContainer1: {
    minWidth: width / 3,
    maxWidth: width / 1.5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#0084ff',
  },
  chatTextContainer2: {
    minWidth: width / 3,
    maxWidth: width / 1.5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#e4e6eb',
  },
  chatText1: {
    color: '#fff',
  },
  // chatText2: {},
});

const mapStateToProps = (state) => {
  return {
    user: state.homeReducer.user,
    chatPartner: state.chatReducer.chatPartner,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
