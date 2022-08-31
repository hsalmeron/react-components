import { requestAction, createRequestTypes } from './helpers';

// Async actions
export const CREATE_CLASS = createRequestTypes('addClass/CREATE_CLASS');
export const FETCH_CLASSES = createRequestTypes('classesList/FETCH_NEW_CLASSES');
export const FETCH_ONE_CLASS = createRequestTypes('classesList/FETCH_ONE_CLASS');
export const UPDATE_CLASS = createRequestTypes('classesList/UPDATE_CLASS');

// Async action helpers
export const createClass = requestAction(CREATE_CLASS, ['form', 'history']);
export const fetchClasses = requestAction(FETCH_CLASSES, ['page']);
export const fetchOneClass = requestAction(FETCH_ONE_CLASS, ['id', 'navigator']);
export const updateClass = requestAction(UPDATE_CLASS, ['id', 'participants']);