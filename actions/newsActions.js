import { requestAction, createRequestTypes } from './helpers';

// Async actions
export const CREATE_NEWS = createRequestTypes('news/CREATE_NEWS');
export const FETCH_NEWS = createRequestTypes('news/FETCH_NEWS');

// Async action helpers
export const createNews = requestAction(CREATE_NEWS, ['form', 'history']);
export const fetchNews = requestAction(FETCH_NEWS, ['page']);