import { Record, List } from 'immutable';

import * as Actions from '../actions/forumActions';
import * as Models from '../models';

const initialState = new (Record({
	createForum: new (Record({
		pending: false,
	})),
	allForums: new (Record({
		list: new Models.Forum,
		pending: false,
	})),
	oneForum: new (Record({
		detail: new Models.Forum,
		pending: false,
	})),
	createAnswer: new (Record({
		pending: false,
	}))
}))()

export default function forumReducer(state = initialState, action) {
	if (!(state instanceof Record)) return initialState.merge(state);
	switch (action.type) {
		// Async action listeners
		case Actions.CREATE_FORUM.REQUEST: {
			return state.setIn(['createForum', 'pending'], true);
		}

		case Actions.CREATE_FORUM.SUCCESS: {
			return state
				.setIn(['createForum', 'pending'], false);
		}

		case Actions.CREATE_FORUM.FAILURE: {
			return state.setIn(['createForum', 'pending'], false);
		}

		case Actions.FETCH_ALL_FORUM.REQUEST: {
			return state.setIn(['allForums', 'pending'], true);
		}

		case Actions.FETCH_ALL_FORUM.SUCCESS: {
			const allForum = action.payload;
			return state
				.setIn(['allForums', 'list'], allForum)
				.setIn(['allForums', 'pending'], false);
		}

		case Actions.FETCH_ALL_FORUM.FAILURE: {
			return state.setIn(['allForums', 'pending'], false);
		}

		case Actions.FETCH_ONE_FORUM.REQUEST: {
			return state.setIn(['oneForum', 'pending'], true);
		}

		case Actions.FETCH_ONE_FORUM.SUCCESS: {
			const data = action.payload;
			return state
				.setIn(['oneForum', 'detail'], data)
				.setIn(['oneForum', 'pending'], false);
		}

		case Actions.FETCH_ONE_FORUM.FAILURE: {
			return state.setIn(['oneForum', 'pending'], false);
		}

		case Actions.CREATE_ANSWER.REQUEST: {
			return state.setIn(['createAnswer', 'pending'], true);
		}

		case Actions.CREATE_ANSWER.SUCCESS: {
			return state
				.setIn(['createAnswer', 'pending'], false);
		}

		case Actions.CREATE_ANSWER.FAILURE: {
			return state.setIn(['createAnswer', 'pending'], false);
		}

		default:
        	return state
  	}
}
