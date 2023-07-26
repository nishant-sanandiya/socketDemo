import {io, Socket} from 'socket.io-client';
import {SOCKET_BASE_URL} from '../constants/socket.constants';
import {Log} from '../utility/log.utilities';
import Toast from 'react-native-simple-toast';

let socketInstance: Socket | null = null;

export const initSocket = () =>
  new Promise<Socket>((resolve, reject) => {
    if (socketInstance !== null) {
      return resolve(socketInstance);
    } else {
      let tempSocket = io(SOCKET_BASE_URL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
      });
      tempSocket.on('connect', () => {
        Log('connect :-> ', {});
        socketInstance = tempSocket;
        Toast.showWithGravity('connect', Toast.LONG, Toast.BOTTOM);
        resolve(socketInstance);
      });
      tempSocket.on('error', (data: any) => {
        Log('error :-> ', data);
        Toast.showWithGravity('error', Toast.LONG, Toast.BOTTOM);
        socketInstance = null;
        reject(data);
      });
      tempSocket.on('disconnect', (data: any) => {
        Log('disconnect :-> ', data);
        Toast.showWithGravity('disconnect', Toast.LONG, Toast.BOTTOM);
        socketInstance = null;
        reject(data);
      });
      tempSocket.on('reconnection_attempt', (data: any) => {
        Toast.showWithGravity('reconnection_attempt', Toast.LONG, Toast.BOTTOM);
        Log('reconnection_attempt :-> ', data);
      });
    }
  });

export const getSocketInstance = (): Socket | null => {
  return socketInstance || null;
};
