import React from 'react';
import {RootNavigator} from './src/navigators/RootNavigator';
import {Provider} from 'react-redux';
import {RootStore} from './src/store/root/RootSlice';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <Provider store={RootStore}>
      <StatusBar backgroundColor={'rgba(0,0,0,0.1)'} />
      <RootNavigator />
    </Provider>
  );
};

export default App;
