import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './AppNavigator';
import {useAppSelector} from '../store/root/RootSlice';
import {AuthNavigator} from './AuthNavigator';

export const RootNavigator = () => {
  const accessToken = useAppSelector(state => state.AuthSlice.user.accessToken);
  return (
    <NavigationContainer>
      {accessToken !== '' ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
