import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

import {connect} from 'react-redux';
import {
  chatPartnerAction,
  chattingIDAction,
} from '../store/actions/chatActions';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const Header = ({
  navigation,
  screenName,
  chatPartner,
  chatPartnerActionSet,
  chattingIDActionSet,
  backButtonFunc,
}) => {
  const back = () => {
    backButtonFunc();
  };

  return (
    <View style={styles.container}>
      {screenName == 'HomeScreen' && (
        <Ionicons
          name="md-menu-outline"
          onPress={() => navigation.openDrawer()}
          size={30}
        />
      )}
      {screenName == 'ChatScreen' && (
        <>
          <Ionicons
            name="chevron-back"
            onPress={() => {
              chatPartnerActionSet({});
              back();
              // chattingIDActionSet(null);
              navigation.goBack();
            }}
            size={30}
          />
          <Image
            source={{uri: chatPartner.photoURL}}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40,
              marginHorizontal: 7,
            }}
          />
          <Text style={styles.headerTitle}>{chatPartner.name}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: height / 10,
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    chatPartner: state.chatReducer.chatPartner,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    chatPartnerActionSet: (uid) => dispatch(chatPartnerAction(uid)),
    chattingIDActionSet: (id) => dispatch(chattingIDAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
