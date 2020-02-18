import { createSlice } from '@reduxjs/toolkit';
import { getIssues } from 'api/githubApi';
import { sleep } from 'utils';

const repoIssuesSlice = createSlice({
  name: 'repoIssues',
  initialState: {
    isLoading: true,
    issuesCount: -1,
    error: null,
    issues: [],
  },
  reducers: {
    getIssuesStart: state => {
      state.isLoading = true;
    },
    getIssuesFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getIssuesSuccess: (state, { payload }) => {
      console.log(payload);
      state.error = null;
      state.isLoading = false;
      state.issues = payload.issues;
    },
  },
});

export const {
  getIssuesStart,
  getIssuesFailed,
  getIssuesSuccess,
} = repoIssuesSlice.actions;

export const fetchRepoIssues = (org, repo, page = 1) => async dispatch => {
  try {
    await sleep(2000);
    const repoDetails = await getIssues(org, repo, page);
    dispatch(getIssuesSuccess(repoDetails));
  } catch (err) {
    dispatch(getIssuesFailed(err.toString()));
  }
};

export default repoIssuesSlice.reducer;
