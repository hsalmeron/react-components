import { Record, List } from 'immutable';

import * as Actions from '../actions/dealsActions';
import * as Models from '../models';

const initialState = new (Record({
	addDeals: new (Record({
		form: new Models.Deals(),
    	pending: false,
	}))(),
	newDeals: new (Record({
		dealslist: new List([]),
		pending: false,
	}))()
}))()

export default function dealsReducer(state = initialState, action) {
	if (!(state instanceof Record)) return initialState.merge(state);
	switch (action.type) {
		// Async action listeners
		case Actions.CREATE_DEALS.REQUEST: {
			return state.setIn(['addDeals', 'pending'], true);
		}

		case Actions.CREATE_DEALS.SUCCESS: {
			return state
				.setIn(['addDeals', 'form'], new Models.Class())
        		.setIn(['addDeals', 'pending'], false);
		}

		case Actions.CREATE_DEALS.FAILURE: {
			return state.setIn(['addDeals', 'pending'], false);
		}

		case Actions.FETCH_DEALS.REQUEST: {
			return state.setIn(['newDeals', 'pending'], true);
		}

		case Actions.FETCH_DEALS.SUCCESS: {
			const newNotification = action.payload;
			return state
				.setIn(['newDeals', 'dealslist'], newNotification)
				.setIn(['newDeals', 'pending'], false);
		}

		case Actions.FETCH_DEALS.FAILURE: {
			return state.setIn(['newDeals', 'pending'], false);
		}

		default:
        	return state
  	}
}
