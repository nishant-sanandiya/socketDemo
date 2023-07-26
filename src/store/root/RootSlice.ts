import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';

import {AuthSlice} from '../auth/authSlice';

const rootReducer = combineReducers({
  AuthSlice: AuthSlice.reducer,
});

export const RootStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export type RootStoreType = ReturnType<typeof RootStore.getState>;

export type AppDispatch = typeof RootStore.dispatch;
export type AppSelector = typeof RootStore.getState;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStoreType> = useSelector;
