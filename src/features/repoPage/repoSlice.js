import { createSlice } from '@reduxjs/toolkit';

const repoSlice = createSlice({
  name: 'repoDetails',
  initialState: { issuesCount: -1, error: null },
  reducers: {
    getRepoStart: state => {
      state.isLoading = true;
    },
    getRepoFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getRepoSuccess: (state, { payload }) => {
      state.issuesCount = payload.open_issues_count;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const fetchRepo = (org, repo, page = 1) => async dispatch => {
  dispatch();
};

export const { addTodo, toggleTodo } = repoSlice.actions;

export default repoSlice.reducer;
