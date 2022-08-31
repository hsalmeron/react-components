import { call, put, takeEvery, all } from 'redux-saga/effects';
import { RNS3 } from 'react-native-aws3';

// Actions
import {
    CREATE_FORUM,
    createForum as createForumAction,
    FETCH_ALL_FORUM,
    fetchAllForums as fetchAllForumsAction,
    FETCH_ONE_FORUM,
    fetchOneForum as fetchOneForumAction,
    CREATE_ANSWER,
    createAnswer as createAnswerAction,
} from '../actions/forumActions';

import {
    createForumMutation,
    updateForumMutation
} from '../graphql/mutations/forumMutations';

import {
  getAllForumQuery,
  fetchOneForumQuery
} from '../graphql/queries/forumQueries';

// Other
import client from '../apolloClient';
import screens from '../constants/Screens'
import { Dark_Blue } from '../colors';

// Function responsible for creating new member
function* createForum({ payload: { forum } }) {
    try {
        const { data: { createForum: { changedForum } }, errors } =
        yield call(client.mutate, createForumMutation(forum));
        if (errors && errors.length > 0) {
            throw new Error(errors);
        }
        yield put(createForumAction.success(changedForum));
    } catch (err) {
        console.log("createforum saga error", err)   
        yield put(createForumAction.failure('error:', err));
    }
}

// Function responsible for fetching new members
function* fetchAllForums({ payload: { page } }) {
    try {
        const { errors, data: { viewer:  { allForums: { edges } } } } =
            yield call(client.query, getAllForumQuery(page));

        if (errors && errors.length > 0) {
            throw new Error(errors);
        }
        const list = edges.map((e) => ({
          ...e.node,
        }));
        yield put(fetchAllForumsAction.success(list));
    } catch (err) {
        console.log("fetchForum saga error", err)
        yield put(fetchAllForumsAction.failure('error:', err));
    }
}

function* fetchOneForum({ payload: { id, navigator } }) {
    try {
        const { errors, data: { getForum } } =
            yield call(client.query, fetchOneForumQuery(id));

        if (errors && errors.length > 0) {
            throw new Error(errors);
        }
        yield put(fetchOneForumAction.success(getForum));
        navigator.showModal({
            title: "Forum Questions",
            screen: screens.FORUMQUESTIONS,
            navigatorStyle: {
                navBarTextColor: '#ffffff',
                navBarBackgroundColor: Dark_Blue,
                navBarButtonColor: '#ffffff', 
            },
            animationType: 'none'
        })
    } catch (err) {
        console.log("fetchForum saga error", err)
        yield put(fetchOneForumAction.failure('error:', err));
    }
}

function* createAnswer({ payload: { id, answer } }) {
    try {
         const { errors, data: { updateForum: { changedForum} } } =
            yield call(client.mutate, updateForumMutation(id, answer));

        if (errors && errors.length > 0) {
            throw new Error(errors);
        }
        yield put(createAnswerAction.success(changedForum));
    } catch (err) {
        console.log("createforum saga error", err)   
        yield put(createAnswerAction.failure('error:', err));
    }
}

// Listeners exposition
export default function* forumSaga() {
    yield all([
        takeEvery(CREATE_FORUM.REQUEST, createForum),
        takeEvery(FETCH_ALL_FORUM.REQUEST, fetchAllForums),
        takeEvery(FETCH_ONE_FORUM.REQUEST, fetchOneForum),
        takeEvery(CREATE_ANSWER.REQUEST, createAnswer)
    ]);
}
