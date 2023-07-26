import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface HeaderPropType {
  userStatus: string;
}

export const Header = (props: HeaderPropType) => {
  const {userStatus} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{userStatus}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 45,
    backgroundColor: '#87CEEB',
  },
  statusText: {
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
});
