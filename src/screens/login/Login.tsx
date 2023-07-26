import React, {useState} from 'react';
import {
  Alert,
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useAppDispatch} from '../../store/root/RootSlice';
import {LoginAction} from '../../store/auth/authSlice';
import {Log} from '../../utility/log.utilities';

export const Login = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>(
    Platform.OS === 'android' ? 'jolly@yopmail.com' : 'marryjane@yopmail.com',
  );
  const [password, setPassword] = useState<string>('123456');

  const onEmailTextChangeHandler = (text: string) => {
    setEmail(text);
  };

  const onPasswordTextChangeHandler = (text: string) => {
    setPassword(text);
  };

  const onSubmitPressHandler = async () => {
    try {
      await dispatch(LoginAction({email, password}));
    } catch (err: any) {
      Log('err :- ', err);
      Alert.alert(err?.message);
    }
  };

  const validationHandler = () => {
    if (!email) {
      Alert.alert('Invalid Email');
    } else if (!password) {
      Alert.alert('Invalid Password');
    } else {
      onSubmitPressHandler();
    }
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={onEmailTextChangeHandler}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={onPasswordTextChangeHandler}
      />
      <Button title="Submit" onPress={validationHandler} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 45,
    marginBottom: 25,
    width: '80%',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
