import {
    Alert
}
    from 'react-native';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { RNS3 } from 'react-native-aws3';
import { AsyncStorage } from 'react-native';
// Actions
import {
    LOGIN_USER,
    loginUser as loginUserAction,
    CREATE_USER,
    createUser as createUserAction,
    UPDATE_USER,
    updateUser as updateUserAction,
    GET_USER_BY_ID,
    getUserById as getUserByIdAction,
    EDIT_USER,
    editUser as editUserAction,
    FETCH_ALL_USERS,
    fetchAllUsers as fetchAllUsersAction,
} from '../actions/userActions';

// GraphQL Methods
import { 
    getUserQuery,
    fetchAllUsersQuery
} from '../graphql/queries/userQueries';

import {
    loginUserMutation,
    createUserMutation,
    updateUserMutation
} from '../graphql/mutations/userMutations';

// Other
import client from '../apolloClient';

import { AWS_OPTIONS } from '../variables';
import { awsResponseLocationParser, validateForm } from '../helpers';

import { changeAppRoot } from '../actions/initAC'
import * as navStates from '../constants/NavState'
import screens from '../constants/Screens'
import { Dark_Blue } from '../colors';

function* loginUser({ payload: { username, password, dispatch } }) {
    try {
        const {
            errors,
            data: { loginUser: { token, changedEdge: {node} } },
        } = yield call(client.mutate, loginUserMutation(username, password));
        if (errors && errors.length > 0) {
            throw new Error({ msg: 'login error', err: errors });
        }
        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('userId', node.id);
        dispatch(changeAppRoot(navStates.NAV_ROOT_MAIN))
    } catch (err) {
        console.log("auth.saga login error", err)
        Alert.alert('Error','Your username or password is incorrect.',
                [{text: 'Ok', onPress: () => {}}]
        );
    }
}

function* createUser({ payload: { user } }) {
    try {
        let avatarUrl = ''
        const { data: { createUser: { changedUser } }, errors } =
        yield call(client.mutate, createUserMutation(user));
        if (errors && errors.length > 0) {
            throw new Error(errors);
        }
        yield put(createUserAction.success({
            ...changedUser,
        }));
        AsyncStorage.setItem('userId', changedUser.id);
        const navigator = user.navigator
        navigator.push({
            screen: screens.CREATEPROFILE,
            title: "Create Profile",
            navigatorStyle: {
                navBarTextColor: '#ffffff',
                navBarBackgroundColor: Dark_Blue,
                navBarButtonColor: '#ffffff', 
            }
        })
    } catch (err) {
        console.log("create user saga error", err)   
        Alert.alert('Error','Your email is already exist.',
                [{text: 'Ok', onPress: () => {}}]
        );
    }
}

function* updateUser({ payload: { user } }) {
    try {
        if (user.avatar !== "http://kodeinfo.com/admin_assets/assets/img/avatars/default-avatar.jpg") {
            let avatarUrl = ""
            const resp = yield RNS3.put({
                uri: user.avatar,
                type: 'img/png',
                name: `${user.id}.png`,
            }, AWS_OPTIONS);

            if (resp.status !== 201) {
                throw new Error(resp.text);
            }
            avatarUrl = awsResponseLocationParser(resp.text);
            let size = 100
            user.avatar = avatarUrl.replace('images%2F', `resized/${size}%2F`)
            const { data: { updateUser: { changedUser } }, errors } =
            yield call(client.mutate, updateUserMutation(user));

            if (errors && errors.length > 0) {
                throw new Error(errors);
            }
            
            yield put(updateUserAction.success({
                ...changedUser,
            }));
            AsyncStorage.setItem('createdProfile', "created");
            const dispatch = user.dispatch
            setTimeout(function(){ dispatch(changeAppRoot(navStates.NAV_ROOT_MAIN)) }, 1000);
        }else {
            const { data: { updateUser: { changedUser } }, errors } =
            yield call(client.mutate, updateUserMutation(user));

            if (errors && errors.length > 0) {
                throw new Error(errors);
            }
            
            yield put(updateUserAction.success({
                ...changedUser,
            }));
            AsyncStorage.setItem('createdProfile', "created");
            const dispatch = user.dispatch
            setTimeout(function(){ dispatch(changeAppRoot(navStates.NAV_ROOT_MAIN)) }, 1000);
        }
    } catch (err) {
        console.log("updateUser saga error", err)
    }
}


function* getUserById({ payload: { id } }) {
    try {
        const { errors, data: { getUser } } =
            yield call(client.query, getUserQuery(id));

        if (errors && errors.length > 0) {
            throw new Error(errors);
        }
        yield put(getUserByIdAction.success(getUser));
    } catch (err) {
        console.log("getUserById saga error", err)
        yield put(getUserByIdAction.failure('error:', err));
    }
}

function* editUser({ payload: { user } }) {
    console.log(client.subscribe)
    try {
        if (user.avatar !== "http://kodeinfo.com/admin_assets/assets/img/avatars/default-avatar.jpg") {
            let avatarUrl = ""
            const resp = yield RNS3.put({
                uri: user.avatar,
                type: 'img/png',
                name: `${user.id}.png`,
            }, AWS_OPTIONS);

            if (resp.status !== 201) {
                throw new Error(resp.text);
            }
            avatarUrl = awsResponseLocationParser(resp.text);
            let size = 100
            user.avatar = avatarUrl.replace('images%2F', `resized/${size}%2F`)
            const { data: { updateUser: { changedUser } }, errors } =
            yield call(client.mutate, updateUserMutation(user));

            if (errors && errors.length > 0) {
                throw new Error(errors);
            }
            
            yield put(editUserAction.success({
                ...changedUser,
            }));
            let navigator = user.dispatch
            navigator.pop()
        }else {
            const { data: { updateUser: { changedUser } }, errors } =
            yield call(client.mutate, updateUserMutation(user));

            if (errors && errors.length > 0) {
                throw new Error(errors);
            }
            
            yield put(editUserAction.success({
                ...changedUser,
            }));
            let navigator = user.dispatch
            navigator.pop()
        }
    } catch (err) {
        console.log("editUser saga error", err)
    }
}

function* fetchAllUsers({ payload: { page } }) {
    try {
        const { errors, data: { viewer:  { allUsers: { edges } } } } =
        yield call(client.query, fetchAllUsersQuery(page));

        if (errors && errors.length > 0) {
            throw new Error(errors);
        }
        
        yield put(fetchAllUsersAction.success({
            ...edges,
        }));
    } catch (err) {
        console.log("fetchAllUsers saga error", err)
    }
}

// Listeners exposition
export default function* userSaga() {
    yield all([
        takeEvery(LOGIN_USER.REQUEST, loginUser),
        takeEvery(CREATE_USER.REQUEST, createUser),
        takeEvery(UPDATE_USER.REQUEST, updateUser),
        takeEvery(GET_USER_BY_ID.REQUEST, getUserById),
        takeEvery(EDIT_USER.REQUEST, editUser),
        takeEvery(FETCH_ALL_USERS.REQUEST,  fetchAllUsers)
    ]);
}
