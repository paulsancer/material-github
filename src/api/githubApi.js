import axios from 'axios';
import parseLink, { Links } from 'parse-link-header';

const GitHubAPIUrl = 'https://api.github.com';

const isLastPage = pageLinks =>
  Object.keys(pageLinks).length === 2 && pageLinks.first && pageLinks.prev;

const getPageCount = pageLinks => {
  if (!pageLinks) {
    return 0;
  }
  if (isLastPage(pageLinks)) {
    return parseInt(pageLinks.prev.page, 10) + 1;
  }
  if (pageLinks.last) {
    return parseInt(pageLinks.last.page, 10);
  }
  return 0;
};

export async function getIssues(org, repo, page = 1) {
  const url = `${GitHubAPIUrl}/repos/${org}/${repo}/issues?per_page=25&page=${page}`;

  const issuesResponse = await axios.get(url);
  let pageCount = 0;
  const pageLinks = parseLink(issuesResponse.headers.link);

  if (pageLinks !== null) {
    pageCount = getPageCount(pageLinks);
  }

  return {
    pageLinks,
    pageCount,
    issues: issuesResponse.data,
  };
}

export async function getRepoDetails(org, repo) {
  const url = `${GitHubAPIUrl}/repos/${org}/${repo}`;

  const { data } = await axios.get(url);
  return data;
}

export async function getIssue(org, repo, number) {
  const url = `${GitHubAPIUrl}/repos/${org}/${repo}/issues/${number}`;

  const { data } = await axios.get(url);
  return data;
}

export async function getComments(url) {
  const { data } = await axios.get(url);
  return data;
}
