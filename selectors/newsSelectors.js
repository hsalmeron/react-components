import { createSelector } from 'reselect';

export const newsStateSelector = (state) => state.news;

export const newNewsSelector = createSelector(
  newsStateSelector,
  (news) => news.get('newNews')
);

export const newNewsPendingSelector = createSelector(
  newNewsSelector,
  (news) => news.get('pending')
);

export const addNewsSelector = createSelector(
  newsStateSelector,
  (news) => news.get('addNews')
);

export const addNewsPendingSelector = createSelector(
  addNewsSelector,
  (news) => news.get('pending')
);