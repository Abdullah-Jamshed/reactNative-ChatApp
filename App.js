import React from 'react';

import {View, StyleSheet} from 'react-native';

import Navigation from './src/components/Navigation';

const App = () => {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
