import { createSelector } from 'reselect';

export const userStateSelector = (state) => state.user;

export const signUpSelector = createSelector(
    userStateSelector,
    (user) => user.get('signUp')
);

export const signUpFormSelector = createSelector(
    signUpSelector,
    (signup) => signup.get('form')
);

export const fetchPendingParentSelector = createSelector(
    userStateSelector,
    (user) => user.get('updateprofile')
);

export const fetchPendingSelector = createSelector(
    fetchPendingParentSelector,
    (updateprofile) => updateprofile.get('updatePending')
);

export const fetchAllUsersParentSelector = createSelector(
    userStateSelector,
    (user) => user.get('fetchAllUsers')
);

export const fetchAllUsersSelector = createSelector(
    fetchAllUsersParentSelector,
    (fetchAllUsers) => user.get('allUsers')
);

export const fetchOneUserParentSelector = createSelector(
    userStateSelector,
    (user) => user.get('getUser')
);

export const fetchOneUserSelector = createSelector(
    fetchOneUserParentSelector,
    (getUser) => getUser.get('getUserInfo')
);
