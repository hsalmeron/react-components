import { Record, List } from 'immutable';

import * as Actions from '../actions/newsActions';
import * as Models from '../models';

const initialState = new (Record({
	addNews: new (Record({
		form: new Models.News(),
    	pending: false,
	}))(),
	newNews: new (Record({
		newslist: new List([]),
		pending: false,
	}))()
}))()

export default function newsReducer(state = initialState, action) {
	if (!(state instanceof Record)) return initialState.merge(state);
	switch (action.type) {
		// Async action listeners
		case Actions.CREATE_NEWS.REQUEST: {
			return state.setIn(['addNews', 'pending'], true);
		}

		case Actions.CREATE_NEWS.SUCCESS: {
			return state
				.setIn(['addNews', 'form'], new Models.Class())
        		.setIn(['addNews', 'pending'], false);
		}

		case Actions.CREATE_NEWS.FAILURE: {
			return state.setIn(['addNews', 'pending'], false);
		}

		case Actions.FETCH_NEWS.REQUEST: {
			return state.setIn(['newNews', 'pending'], true);
		}

		case Actions.FETCH_NEWS.SUCCESS: {
			const newNews = action.payload;
			return state
				.setIn(['newNews', 'newslist'], newNews)
				.setIn(['newNews', 'pending'], false);
		}

		case Actions.FETCH_NEWS.FAILURE: {
			return state.setIn(['newNews', 'pending'], false);
		}

		default:
        	return state
  	}
}
