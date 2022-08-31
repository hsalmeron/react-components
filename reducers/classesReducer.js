import { Record, List } from 'immutable';

import * as Actions from '../actions/classesActions';
import * as Models from '../models';

const initialState = new (Record({
	addClass: new (Record({
		form: new Models.Class(),
    	pending: false,
	}))(),
	newClasses: new (Record({
		list: new List([]),
		pending: false,
	}))(),
	fetchOneClass: new (Record({
		classdetail: {},
		pending: false,
	}))(),
	updatedClass: new (Record({
		updatedClass: {},
		updatepending: false
	}))(),
}))()

export default function classesReducer(state = initialState, action) {
	if (!(state instanceof Record)) return initialState.merge(state);
	switch (action.type) {
		// Async action listeners
		case Actions.CREATE_CLASS.REQUEST: {
			return state.setIn(['addClass', 'pending'], true);
		}

		case Actions.CREATE_CLASS.SUCCESS: {
			return state
				.setIn(['addClass', 'form'], new Models.Class())
        		.setIn(['addClass', 'pending'], false);
		}

		case Actions.CREATE_CLASS.FAILURE: {
			return state.setIn(['addClass', 'pending'], false);
		}

		case Actions.FETCH_CLASSES.REQUEST: {
			return state.setIn(['newClasses', 'pending'], true);
		}

		case Actions.FETCH_CLASSES.SUCCESS: {
			const newClasses = action.payload;
			return state
				.setIn(['newClasses', 'list'], newClasses)
				.setIn(['newClasses', 'pending'], false);
		}

		case Actions.FETCH_CLASSES.FAILURE: {
			return state.setIn(['newClasses', 'pending'], false);
		}

		case Actions.FETCH_ONE_CLASS.REQUEST: {
			return state.setIn(['fetchOneClass', 'pending'], true);
		}

		case Actions.FETCH_ONE_CLASS.SUCCESS: {
			const oneClass = action.payload;
			return state
				.setIn(['fetchOneClass', 'classdetail'], oneClass)
				.setIn(['fetchOneClass', 'pending'], false);
		}

		case Actions.FETCH_ONE_CLASS.FAILURE: {
			return state.setIn(['fetchOneClass', 'pending'], false);
		}

		case Actions.UPDATE_CLASS.REQUEST: {
			return state
				.setIn(['updatedClass', 'updatepending'], true)
		}

		case Actions.UPDATE_CLASS.SUCCESS: {
			const changedClass = action.payload;
			return state
				.setIn(['updatedClass', 'updatedClass'], changedClass)
				.setIn(['updatedClass', 'updatepending'], false)
		}

		case Actions.UPDATE_CLASS.FAILURE: {
			return state
				.setIn(['updatedClass', 'updatepending'], false)
		}
		
		default:
        	return state
  	}
}
