import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {Header} from './components/Header';
import {getSocketInstance, initSocket} from '../../socket/socket';
import {useAppSelector} from '../../store/root/RootSlice';
import {ChatType} from '../../types/chat';
import {FlatListRenderParams, NavigationPropsType} from '../../types/common';
import {ChatItem} from './components/ChatItem';

export const Chat = (props: NavigationPropsType) => {
  const {navigation} = props;

  const userId = useAppSelector(state => state.AuthSlice.user._id);
  const [userStatus, setUserStatus] = useState<string>('Not Connected');
  const [chatList, setChatList] = useState<ChatType[]>([]);

  const initUserConnection = () => {
    initSocket()
      .then(socket => {
        socket.emit(
          'client-user-connected',
          {userId: userId},
          (response: any) => {
            if (response.status === 200) {
              setUserStatus('Connect');
            }
          },
        );
        socket.emit(
          'client-chat-listing',
          {userId: userId},
          (response: any) => {
            if (response.status === 200) {
              setChatList(response.data);
            }
          },
        );
      })
      .catch(() => {});
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      initUserConnection();
    });
    return () => {
      unsubscribe();
      getSocketInstance()?.off('client-chat-listing');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onItemPressHandler = (chat: ChatType) => {
    navigation.navigate('chatHistory', {chat: chat});
  };

  const renderListHandler = (
    data: FlatListRenderParams<ChatType>,
  ): React.JSX.Element => {
    return <ChatItem data={data.item} onPress={onItemPressHandler} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header userStatus={userStatus} />
      <FlatList data={chatList} renderItem={renderListHandler} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
