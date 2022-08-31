import { requestAction, createRequestTypes } from './helpers';

// Async actions
export const FETCH_ME = createRequestTypes('myprofile/FETCH_ME');

// Async action helpers
export const fetchMe = requestAction(FETCH_ME, ['id']);
