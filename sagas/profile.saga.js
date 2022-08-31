import { call, put, takeEvery, all } from 'redux-saga/effects';
import { RNS3 } from 'react-native-aws3';

// Actions
import {
    FETCH_ME,
    fetchMe as fetchMeAction,
} from '../actions/profileActions';

// GraphQL Methods
import { getUserQuery } from '../graphql/queries/userQueries';

// Other
import client from '../apolloClient';

import { AWS_OPTIONS, DEFAULT_ERROR_MESSAGE } from '../variables';
import { awsResponseLocationParser, validateForm } from '../helpers';

import { changeAppRoot } from '../actions/initAC'
import * as navStates from '../constants/NavState'

// Function responsible for updating current user
function* fetchMe({ payload: { id } }) {
    try {
        const { errors, data: { getUser } } =
            yield call(client.query, getUserQuery(id));

        if (errors && errors.length > 0) {
            throw new Error(errors);
        }
        yield put(fetchMeAction.success(getUser));
    } catch (err) {
        console.log("profile saga error", err)
        yield put(fetchMeAction.failure('error:', err));
    }
}

// Listeners exposition
export default function* profileSaga() {
    yield all([
        takeEvery(FETCH_ME.REQUEST, fetchMe)
    ]);
}
