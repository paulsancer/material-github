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
      state.error = null;
    },
    getIssuesFailed: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    getIssuesSuccess: (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      state.issues = payload;
    },
  },
});

export const {
  getIssuesStart,
  getIssuesFailed,
  getIssuesSuccess,
} = repoIssuesSlice.actions;

export const fetchRepoIssues = (org, repo, page = 1) => async dispatch => {
  dispatch(getIssuesStart());
  try {
    await sleep(500);
    const { issues } = await getIssues(org, repo, page);
    const iss = issues.filter(i => !i.pull_request);
    dispatch(getIssuesSuccess(iss));
  } catch (err) {
    dispatch(getIssuesFailed(err.toString()));
  }
};

export default repoIssuesSlice.reducer;
