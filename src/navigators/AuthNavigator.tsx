import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../screens/login/Login';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
