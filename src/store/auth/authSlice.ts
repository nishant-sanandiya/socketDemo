import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loginApi} from '../../services/apis';
import {LoginActionParamTypes} from './types';

interface AuthSliceStateType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profile_image: string;
  bio: string;
  countryCode: string;
  userSignUpLevel: number;
  profilePicture: string;
  birthday: string;
  skillPoints: number;
  totalAttended: number;
  totalOrganized: string;
  facebookId: string;
  googleId: string;
  appleId: string;
  subscriptionEndDate: string;
  resetToken: string;
  isSubscribed: boolean;
  isFreeUser: boolean;
  selectedSportIds: string[];
  finishSteps: boolean;
  socketIds: string[];
  location: {
    type: string;
    index: string;
    coordinates: number[];
  };
  socketId: string;
  isOnline: string;
  isActive: boolean;
  isDeleted: boolean;
  referralCode: string;
  referralBy: string;
  lastUsedAt: string;
  lastSeen: string;
  selectedSportId: string;
  accessToken: string;
}

const initUserState: AuthSliceStateType = {
  _id: '',
  accessToken: '',
  appleId: '',
  bio: '',
  birthday: '',
  countryCode: '',
  email: '',
  facebookId: '',
  finishSteps: false,
  firstName: '',
  googleId: '',
  isActive: false,
  isDeleted: false,
  isFreeUser: false,
  isOnline: '',
  isSubscribed: false,
  lastName: '',
  lastSeen: '',
  lastUsedAt: '',
  location: {
    coordinates: [0, 0],
    index: '',
    type: '',
  },
  phoneNumber: '',
  profile_image: '',
  profilePicture: '',
  referralBy: '',
  referralCode: '',
  resetToken: '',
  selectedSportId: '',
  selectedSportIds: [''],
  skillPoints: 0,
  socketId: '',
  socketIds: [''],
  subscriptionEndDate: '',
  totalAttended: 0,
  totalOrganized: '',
  userSignUpLevel: 0,
};

export const LoginAction = createAsyncThunk(
  'LoginAction',
  async (params: LoginActionParamTypes) => {
    const response = await loginApi(params.email, params.password);
    return response;
  },
);

export const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState: {user: initUserState},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(LoginAction.rejected, (state, action) => {
      throw action.error;
    });
    builder.addCase(LoginAction.fulfilled, (state, action) => {
      state.user = {...action.payload.data};
    });
  },
});

export const AuthActions = AuthSlice.actions;
