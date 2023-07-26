import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {ChatHistoryType} from '../../../types/chat';
import {useAppSelector} from '../../../store/root/RootSlice';

interface PropsType {
  data: ChatHistoryType;
}

export const ChatHistoryItem = (props: PropsType) => {
  const {data} = props;
  const userId = useAppSelector(state => state.AuthSlice.user._id);
  const isMyMessage = data.sender_id._id === userId;
  const containerStyle: ViewStyle = {
    ...styles.container,
    alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
  };

  return (
    <View style={containerStyle}>
      <Text>{data.content !== '' ? data.content : data.type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#87CEEB95',
    borderRadius: 10,
    margin: 5,
    maxWidth: '85%',
  },
});
