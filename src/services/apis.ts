import {Axios} from '../axios/index';

export const loginApi = async (email: string, password: string) => {
  try {
    const response: any = await Axios.post('auth/login', {
      email: email,
      password: password,
      loginType: '1',
      deviceType: 'android',
      deviceId: '121212',
      fcm_token: 'fcm_token',
    });
    if (response?.data && response?.data?.status === 200) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (err) {
    throw err;
  }
};
