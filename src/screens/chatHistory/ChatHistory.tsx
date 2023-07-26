import React, {useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TextStyle,
} from 'react-native';
import {FlatListRenderParams, NavigationPropsType} from '../../types/common';
import {getSocketInstance} from '../../socket/socket';
import {useAppSelector} from '../../store/root/RootSlice';
import {Header} from './components/Header';
import {ChatHistoryType, ChatType} from '../../types/chat';
import {ChatHistoryItem} from './components/ChatHistoryItem';
import {Images} from '../../image/index';
import {Log} from '../../utility/log.utilities';
import {isAndroid} from '../../constants/common.constants';

export const ChatHistory = (props: NavigationPropsType) => {
  const {route} = props;
  const userId = useAppSelector(state => state.AuthSlice.user._id);
  const params: any = useMemo(() => route?.params, [route]);
  const chat: ChatType = useMemo(() => params?.chat, [params]);
  const room_id = useMemo(() => chat.history[0].room_id, [chat]);

  const [historyList, setHistoryList] = useState<ChatHistoryType[]>([]);
  const [messageText, setMessageText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const textStyle: TextStyle[] = [
    styles.typingText,
    {display: isTyping ? 'flex' : 'none'},
  ];

  const typingHandler = (response: any, bool: boolean) => {
    if (response?.data?.roomId === room_id) {
      setIsTyping(bool);
    }
  };

  const readAllMessagesHandler = () => {
    getSocketInstance()?.emit(
      'client-change-message-status-all',
      {
        userId: userId,
        roomId: room_id,
      },
      (response: any) => {
        Log('client-change-message-status-all emit :- ', response);
      },
    );
  };

  const initHistoryListListener = () => {
    getSocketInstance()?.emit(
      'client-chat-history',
      {userId: userId, roomId: room_id, skip: 0, limit: 20000},
      (response: any) => {
        if (response.status === 200) {
          setHistoryList(response.data?.reverse());
        }
      },
    );
    getSocketInstance()?.on('server-receive-message', (response: any) => {
      readAllMessagesHandler();
      setHistoryList(prev => [response, ...prev]);
    });
    getSocketInstance()?.on('server-typing-start', (response: any) => {
      Log('server-typing-start', response);
      typingHandler(response, true);
    });
    getSocketInstance()?.on('server-typing-stop', (response: any) => {
      Log('server-typing-stop', response);
      typingHandler(response, false);
    });
    getSocketInstance()?.on(
      'server-change-message-status-all',
      (response: any) => {
        Log('server-change-message-status-all on :- ', response);
      },
    );
    readAllMessagesHandler();
  };

  const keyboardStatusHandler = (status: string) => {
    getSocketInstance()?.emit(
      'client-user-typing',
      {
        user_id: userId,
        typing: status,
        roomId: room_id,
      },
      (data: any) => {
        Log('keyboardStatusHandler :- ', data);
      },
    );
  };

  useEffect(() => {
    initHistoryListListener();
    return () => {
      if (getSocketInstance()?.connect) {
        getSocketInstance()?.off('client-chat-history');
        getSocketInstance()?.off('server-typing-start');
        getSocketInstance()?.off('server-typing-stop');
        getSocketInstance()?.off('server-change-message-status-all');
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        keyboardStatusHandler('1');
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        keyboardStatusHandler('0');
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendPressHandler = () => {
    if (messageText.trim()) {
      getSocketInstance()?.emit(
        'client-send-message',
        {
          roomId: room_id,
          userId: userId,
          message: messageText.trim(),
          mediaId: '',
        },
        (response: any) => {
          if (response?.status === 200) {
            setMessageText('');
          }
        },
      );
      getSocketInstance()?.emit(
        'client-chat-history',
        {userId: userId, roomId: room_id, skip: 0, limit: 2000},
        (response: any) => {
          if (response.status === 200) {
            setHistoryList(response.data?.reverse());
            Log('client-chat-history emit :- ', {});
          }
        },
      );
    }
  };

  const renderListHandler = (data: FlatListRenderParams<ChatHistoryType>) => {
    return <ChatHistoryItem data={data.item} />;
  };

  const onMessageTextHandler = (text: string) => {
    setMessageText(text);
  };

  return (
    <KeyboardAvoidingView
      behavior={isAndroid ? 'height' : 'padding'}
      keyboardVerticalOffset={Platform.select({
        android: 30,
      })}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header chat={chat} />
        <Text style={textStyle}>{'Typing ...'}</Text>
        <FlatList
          inverted={true}
          style={styles.listStyle}
          data={historyList}
          renderItem={renderListHandler}
        />
        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.textInputStyle}
            value={messageText}
            onChangeText={onMessageTextHandler}
          />
          <TouchableOpacity
            onPress={sendPressHandler}
            style={styles.sendButton}>
            <Image style={styles.sendImage} source={Images.send} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputStyle: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
  },
  messageInputContainer: {
    height: 50,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    height: 40,
    width: 40,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendImage: {
    height: '80%',
    width: '80%',
  },
  listStyle: {
    flex: 1,
  },
  typingText: {
    paddingLeft: 40,
    paddingVertical: 5,
    backgroundColor: '#87CEEB',
  },
});
