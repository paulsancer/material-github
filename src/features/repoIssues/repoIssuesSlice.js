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
  dispatch(getIssuesStart());
  try {
    // await sleep(1000);
    const issues = await getIssues(org, repo, page);
    console.log(issues);
    dispatch(getIssuesSuccess(issues));
  } catch (err) {
    dispatch(getIssuesFailed(err.toString()));
  }
};

export default repoIssuesSlice.reducer;
