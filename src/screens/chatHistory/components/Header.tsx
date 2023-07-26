import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {ChatType} from '../../../types/chat';
import {useAppSelector} from '../../../store/root/RootSlice';
import {Images} from '../../../image';
import {useNavigation} from '@react-navigation/native';

interface HeaderPropType {
  chat: ChatType;
}

export const Header = (props: HeaderPropType) => {
  const {chat} = props;
  const userId = useAppSelector(state => state.AuthSlice.user._id);
  const {goBack} = useNavigation();

  const oppUser = chat.participants
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

  const onBackPressHandler = () => {
    goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPressHandler} style={styles.backButton}>
        <Image
          resizeMode="contain"
          style={styles.imageStyle}
          source={Images.back}
        />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.statusText}>
        {oppUser}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 45,
    backgroundColor: '#87CEEB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  backButton: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: '80%',
    height: '80%',
  },
});
