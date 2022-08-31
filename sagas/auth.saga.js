import { call, put, takeEvery, all } from 'redux-saga/effects';

import {
    LOGIN_USER_WITH_DIGITS,
    loginUserWithDigits as loginUserWithDigitsAction,
} from '../actions/authActions';
import { setActiveUser, initializeSignUpForm } from '../actions/userActions';

import { changeAppRoot } from '../actions/initAC'
import * as navStates from '../constants/NavState'

// GraphQL methods
import {
    loginUserWithDigitsMutation,
} from '../graphql/mutations/authMutations';

// Other
import client from '../apolloClient';
import { DEFAULT_ERROR_MESSAGE } from '../variables';

// Function responsible for logging user with Digits
function* loginUserWithDigits({ payload: { apiUrl, credentials, dispatch } }) {
    try {
        const {
            errors,
            data: { loginUserWithDigits: { token, user } },
        } = yield call(client.mutate, loginUserWithDigitsMutation(apiUrl, credentials));
        if (errors && errors.length > 0) {
            throw new Error({ msg: 'Digits login error', err: errors });
        }
        yield put(loginUserWithDigitsAction.success({ token: token }));
        const { isRegistered, avatar,  ...userData } = user;
        if (isRegistered) {
            yield put(initializeSignUpForm({ id: user.id }));
            dispatch(changeAppRoot(navStates.NAV_ROOT_MAIN))
        } else {
            yield put(initializeSignUpForm({ id: user.id }));
            dispatch(changeAppRoot(navStates.NAV_ROOT_CREATEPROFILE))
        }
    } catch (err) {
        yield put(loginUserWithDigitsAction.failure(err));
    }
}

// Listeners exposition
export default function* authSaga() {
    yield all([
        takeEvery(LOGIN_USER_WITH_DIGITS.REQUEST, loginUserWithDigits),
    ]);
}
