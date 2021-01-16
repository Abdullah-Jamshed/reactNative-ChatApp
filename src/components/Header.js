import React from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const Header = ({navigation, screenName}) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="md-menu-outline"
        onPress={() => navigation.openDrawer()}
        size={30}
      />
      <Text style={styles.headerTitle}>{screenName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    height: height / 12,
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

export default Header;
