import Axios from 'axios';
import {BASE_URL} from '../constants/apis.constants';

export const AxiosInstance = Axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});
