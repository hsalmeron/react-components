import { call, put, takeEvery, all } from 'redux-saga/effects';

import {
    CREATE_CLASS,
    createClass as createClassAction,
    FETCH_CLASSES,
    fetchClasses as fetchClassesAction,
    FETCH_ONE_CLASS,
    fetchOneClass as fetchOneClassAction,
    UPDATE_CLASS,
    updateClass as updateClassAction
} from '../actions/classesActions';

// GraphQL methods
import {
    createClassMutation,
    updateClassMutation
} from '../graphql/mutations/classesMutations';

import {
  getAllClassesQuery,
  fetchOneClassQuery
} from '../graphql/queries/classesQueries';

// Other
import client from '../apolloClient';
import screens from '../constants/Screens'

// Function responsible for logging user with Digits
function* createClass({ payload: { form, history } }) {
    try {
        const {
            data: { createClass: { changedClass } }, errors 
        } = yield call(client.mutate, createClassMutation(form));
        if (errors && errors.length > 0) {
            throw new Error({ msg: 'user saga error', err: errors });
        }
        
        yield put(createClassAction.success({
            ...changedClass,
        }));
        history.push('/classes/browse');
    } catch (err) {
        yield put(createClassAction.failure(err));
    }
}

// Function responsible for fetching new classes
function* fetchClasses({ payload: { page } }) {
    try {
        const { errors, data: { viewer:  { allClasses: { edges } } } } =
            yield call(client.query, getAllClassesQuery(page));

        if (errors && errors.length > 0) {
            throw new Error(errors);
        }

        const list = edges.map((e) => ({
          ...e.node,
        }));

        yield put(fetchClassesAction.success(list));
    } catch (err) {
        yield put(fetchClassesAction.failure('error:', err));
    }
}

// Function responsible for fetching new classes
function* fetchOneClass({ payload: { id, navigator } }) {
    try {
        const { errors, data: { getClass } } =
            yield call(client.query, fetchOneClassQuery(id));

        if (errors && errors.length > 0) {
            throw new Error(errors);
        }
        yield put(fetchOneClassAction.success(getClass));
    } catch (err) {
        yield put(fetchOneClassAction.failure('error:', err));
    }
}

function* updateClass({ payload: { id, participants } }) {
    try {
        const { errors, data: { updateClass: { changedClass} } } =
            yield call(client.mutate, updateClassMutation(id, participants));

        if (errors && errors.length > 0) {
            throw new Error(errors);
        }
        yield put(updateClassAction.success(changedClass));
    } catch (err) {
        yield put(updateClassAction.failure('error:', err));
    }
}

// Listeners exposition
export default function* classesSaga() {
    yield all([
        takeEvery(CREATE_CLASS.REQUEST, createClass),
        takeEvery(FETCH_CLASSES.REQUEST, fetchClasses),
        takeEvery(FETCH_ONE_CLASS.REQUEST, fetchOneClass),
        takeEvery(UPDATE_CLASS.REQUEST, updateClass)
    ]);
}
