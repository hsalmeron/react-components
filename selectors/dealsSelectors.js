import { createSelector } from 'reselect';

export const dealsStateSelector = (state) => state.deals;

export const newDealsSelector = createSelector(
  dealsStateSelector,
  (deals) => deals.get('newDeals')
);

export const newDealsPendingSelector = createSelector(
  newDealsSelector,
  (deals) => deals.get('pending')
);

export const addDealsSelector = createSelector(
  dealsStateSelector,
  (deals) => deals.get('addDeals')
);

export const addDealsPendingSelector = createSelector(
  addDealsSelector,
  (deals) => deals.get('pending')
);