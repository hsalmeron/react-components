import { call, put, takeEvery, all } from 'redux-saga/effects';

import {
    CREATE_DEALS,
    FETCH_DEALS,
    createDeals as createDealsAction,
    fetchDeals as fetchDealsAction,
} from '../actions/dealsActions';

// GraphQL methods
import {
    createDealsMutation,
} from '../graphql/mutations/dealsMutations';

import {
  getAllDealsQuery,
} from '../graphql/queries/dealsQueries';

// Other
import client from '../apolloClient';

// Function responsible for logging user with Digits
function* createDeals({ payload: { form, history } }) {
    try {
        const {
            data: { createDeals: { changedDeals } }, errors 
        } = yield call(client.mutate, createDealsMutation(form));
        if (errors && errors.length > 0) {
            throw new Error({ msg: 'user saga error', err: errors });
        }
        
        yield put(createDealsAction.success({
            ...changedDeals,
        }));
        history.push('/deals/archive');
    } catch (err) {
        yield put(createDealsAction.failure(err));
    }
}

// Function responsible for fetching new deals
function* fetchDeals({ payload: { page } }) {
    try {
        const { errors, data: { viewer:  { allDeals: { edges } } } } =
            yield call(client.query, getAllDealsQuery(page));

        if (errors && errors.length > 0) {
            throw new Error(errors);
        }

        const list = edges.map((e) => ({
          ...e.node,
        }));

        yield put(fetchDealsAction.success(list));
    } catch (err) {
        yield put(fetchDealsAction.failure('error:', err));
    }
}

// Listeners exposition
export default function* dealsSaga() {
    yield all([
        takeEvery(CREATE_DEALS.REQUEST, createDeals),
        takeEvery(FETCH_DEALS.REQUEST, fetchDeals),
    ]);
}
