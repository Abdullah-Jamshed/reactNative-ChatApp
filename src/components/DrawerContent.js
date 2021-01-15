import React from 'react';

import {View, Text, Button, TouchableOpacity, TouchableRipple, StyleSheet} from 'react-native';

const DrawrContent = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>ABC</Text>
      <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
        <Text>Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DrawrContent;
