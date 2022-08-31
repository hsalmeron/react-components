import { requestAction, createRequestTypes } from './helpers';

// Async actions
export const CREATE_DEALS = createRequestTypes('deals/CREATE_DEALS');
export const FETCH_DEALS = createRequestTypes('deals/FETCH_DEALS');

// Async action helpers
export const createDeals = requestAction(CREATE_DEALS, ['form', 'history']);
export const fetchDeals = requestAction(FETCH_DEALS, ['page']);