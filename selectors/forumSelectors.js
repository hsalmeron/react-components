import { createSelector } from 'reselect';

export const forumStateSelector = (state) => state.forum;

export const newForumSelector = createSelector(
  forumStateSelector,
  (forum) => forum.get('allForums')
);

export const newForumListSelector = createSelector(
  newForumSelector,
  (allForums) => allForums.get('list')
);

export const newForumPendingSelector = createSelector(
  newForumSelector,
  (allForums) => allForums.get('pending')
);

export const fetchOneForumParentSelector = createSelector(
  forumStateSelector,
  (forum) => forum.get('oneForum')
);

export const fetchOneForumSelector = createSelector(
  fetchOneForumParentSelector,
  (oneForum) => oneForum.get('detail')
);

export const fetchOneForumPendingSelector = createSelector(
  fetchOneForumParentSelector,
  (oneForum) => oneForum.get('pending')
);

export const createParentForumSelector = createSelector(
  forumStateSelector,
  (forum) => forum.get('createForum')
);

export const createForumPendingSelector = createSelector(
  createParentForumSelector,
  (createForum) => createForum.get('pending')
);
