import { call, put, takeEvery, all } from 'redux-saga/effects';

import {
    CREATE_NEWS,
    FETCH_NEWS,
    createNews as createNewsAction,
    fetchNews as fetchNewsAction,
} from '../actions/newsActions';

// GraphQL methods
import {
    createNewsMutation,
} from '../graphql/mutations/newsMutations';

import {
  getAllNewsQuery,
} from '../graphql/queries/newsQueries';

// Other
import client from '../apolloClient';

// Function responsible for logging user with Digits
function* createNews({ payload: { form, history } }) {
    try {
        const {
            data: { createNews: { changedNews } }, errors 
        } = yield call(client.mutate, createNewsMutation(form));
        if (errors && errors.length > 0) {
            throw new Error({ msg: 'user saga error', err: errors });
        }
        
        yield put(createNewsAction.success({
            ...changedNews,
        }));
        history.push('/news/archive');
    } catch (err) {
        console.log("!!!!!!", err)
        yield put(createNewsAction.failure(err));
    }
}

// Function responsible for fetching new classes
function* fetchNews({ payload: { page } }) {
    try {
        const { errors, data: { viewer:  { allNews: { edges } } } } =
            yield call(client.query, getAllNewsQuery(page));

        if (errors && errors.length > 0) {
            throw new Error(errors);
        }

        const list = edges.map((e) => ({
          ...e.node,
        }));

        yield put(fetchNewsAction.success(list));
    } catch (err) {
        console.log(err)
        yield put(fetchNewsAction.failure('error:', err));
    }
}

// Listeners exposition
export default function* newsSaga() {
    yield all([
        takeEvery(CREATE_NEWS.REQUEST, createNews),
        takeEvery(FETCH_NEWS.REQUEST, fetchNews),
    ]);
}
