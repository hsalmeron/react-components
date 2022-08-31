import { createSelector } from 'reselect';

export const profileStateSelector = (state) => state.profile;

export const fetchMeParentSelector = createSelector(
  profileStateSelector,
  (profile) => profile.get('myprofile')
);

export const fetchMeSelector = createSelector(
  fetchMeParentSelector,
  (myprofile) => myprofile.get('detailInfo')
);

export const fetchMePendingSelector = createSelector(
  fetchMeParentSelector,
  (myprofile) => myprofile.get('pending')
);