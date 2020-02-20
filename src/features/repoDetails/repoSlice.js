import { createSlice } from '@reduxjs/toolkit';
import { getRepoDetails } from 'api/githubApi';
import { sleep } from 'utils';

const repoSlice = createSlice({
  name: 'repoDetails',
  initialState: { isLoading: true, issuesCount: -1, error: null },
  reducers: {
    getRepoDetailsStart: state => {
      state.isLoading = true;
    },
    getRepoDetailsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getRepoDetailsSuccess: (state, { payload }) => {
      state.org = payload.owner.login;
      state.openIssuesCount = payload.open_issues_count;
      state.orgAvatar = payload.owner.avatar_url;
      state.private = payload.private;
      state.error = null;
      state.isLoading = false;
      state.details = payload;
    },
  },
});

export const {
  getRepoDetailsStart,
  getRepoDetailsFailed,
  getRepoDetailsSuccess,
} = repoSlice.actions;

export const fetchRepoDetails = (org, repo) => async dispatch => {
  try {
    await sleep(1000);
    const repoDetails = await getRepoDetails(org, repo);
    dispatch(getRepoDetailsSuccess(repoDetails));
  } catch (err) {
    dispatch(getRepoDetailsFailed(err.toString()));
  }
};

export default repoSlice.reducer;
