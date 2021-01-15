import React from 'react';

import {View, StyleSheet} from 'react-native';

import Navigation from './src/components/Navigation';

import {Provider} from 'react-redux';
import store from './src/store';
const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Navigation />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
