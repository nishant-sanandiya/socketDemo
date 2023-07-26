import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  View,
  TextStyle,
} from 'react-native';
import {ChatType} from '../../../types/chat';
import {useAppSelector} from '../../../store/root/RootSlice';

interface PropsType {
  data: ChatType;
  onPress: (chat: ChatType) => void;
}

export const ChatItem = (props: PropsType) => {
  const {data, onPress} = props;
  const userId = useAppSelector(state => state.AuthSlice.user._id);
  const unReadCount = data.count;
  const onPressHandler = () => {
    if (data.history.length > 0 && data.history[0].room_id) {
      onPress(data);
    } else {
      Alert.alert('Room id not found');
    }
  };

  const oppUser = data.participants
    .filter(obj => obj.user_id !== userId)
    .reduce(
      (temp, obj) =>
        temp +
        `${temp === '' ? '' : ' , '}` +
        obj.firstName +
        ' ' +
        obj.lastName,
      '',
    );

  const lastHistory =
    data.history.length > 0
      ? data.history[0].type === 'text'
        ? data.history[0].content
        : data.history[0].content
      : '';

  const countTextStyle: TextStyle[] = [
    styles.countTextStyle,
    {display: unReadCount > 0 ? 'flex' : 'none'},
  ];

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      activeOpacity={0.7}
      style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.textStyle}>{oppUser}</Text>
        <Text style={styles.textStyle2}>{lastHistory}</Text>
      </View>
      <Text style={countTextStyle}>{unReadCount}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    margin: 10,
    padding: 5,
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 18,
  },
  textStyle2: {
    fontSize: 16,
    color: '#635a5a',
  },
  innerContainer: {
    flex: 1,
  },
  countTextStyle: {
    alignSelf: 'center',
    padding: 7,
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#87CEEB',
    borderRadius: 50,
  },
});
