import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Chat} from '../screens/chat/Chat';
import {ChatHistory} from '../screens/chatHistory/ChatHistory';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="chatHistory"
        component={ChatHistory}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
