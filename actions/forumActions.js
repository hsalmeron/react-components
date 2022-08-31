import { requestAction, createRequestTypes } from './helpers';

// Async actions
export const CREATE_FORUM = createRequestTypes('CREATE_FORUM');
export const FETCH_ALL_FORUM = createRequestTypes('FETCH_ALL_FORUM');
export const FETCH_ONE_FORUM = createRequestTypes('FETCH_ONE_FORUM');
export const CREATE_ANSWER = createRequestTypes('CREATE_ANSWER');

// Async action helpers
export const createForum = requestAction(CREATE_FORUM, ['forum']);
export const fetchAllForums = requestAction(FETCH_ALL_FORUM, ['page']);
export const fetchOneForum = requestAction(FETCH_ONE_FORUM, ['id', 'navigator']);
export const createAnswer = requestAction(CREATE_ANSWER, ['id', 'answer']);