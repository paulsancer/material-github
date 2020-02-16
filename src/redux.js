import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { CounterReducer } from './features/counter';

export const rootReducer = combineReducers({
  count: CounterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default { rootReducer, store };
