import {isAndroid} from '../constants/common.constants';

export const Log = (text: any, other: any) => {
  __DEV__ &&
    console.log(
      `${isAndroid ? 'Android' : 'IOS'} ${text} ${JSON.stringify(other)}`,
    );
};
