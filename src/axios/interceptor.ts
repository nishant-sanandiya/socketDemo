import {AxiosInstance} from './instance';

AxiosInstance.interceptors.request.use(
  (request: any) => {
    // const token = RootStore.getState().AuthSlice.access_token;
    // if (token) {
    //   request.headers.Authorization = `Bearer ${token}`;
    // }
    return request;
  },
  (error: any) => {
    throw new Error(error);
  },
);

AxiosInstance.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const status = error?.response?.status;
    if (status === 401) {
    }
    return Promise.reject(error);
  },
);

export default AxiosInstance;
