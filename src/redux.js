import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import repoDetailsReducer from 'features/repoDetails/repoSlice';
import repoIssuesReducer from 'features/repoIssues/repoIssuesSlice';

export const rootReducer = combineReducers({
  repoDetails: repoDetailsReducer,
  repoIssues: repoIssuesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default { rootReducer, store };
