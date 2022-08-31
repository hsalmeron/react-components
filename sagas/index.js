import { fork, all } from 'redux-saga/effects';
import user from './user.saga';
import auth from './auth.saga';
import classes from './classes.saga';
import forum from './forum.saga';
import news from './news.saga';
import deals from './deals.saga';
import profile from './profile.saga';

export default function* rootSaga() {
    yield all([
        fork(user),
        fork(auth),
        fork(classes),
        fork(forum),
        fork(news),
        fork(deals),
        fork(profile)
    ]);
}
