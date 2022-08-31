import { Record, List, Set } from 'immutable';

import * as Actions from '../actions/userActions';

import * as Models from '../models';

const initialState = new (Record({
	signUp: new (Record({
		form: new Models.SignUpForm(),
		pending: false,
	})),
	getUser: new (Record({
		getUserInfo: new Models.User(),
		getUserPending: false,
	})),
	myprofile: new (Record({
		detailInfo: new Models.SignUpForm(),
		pending: false,
	})),
	updateprofile: new (Record({
		updatePending: false
	})),
	fetchAllUsers: new (Record({
		allUsers: new List([]),
		pending: false
	}))
}));

export default function userReducer(state = initialState, action) {
  if (!(state instanceof Record)) return initialState.merge(state);

  	switch (action.type) {
		case Actions.INITIALIZE_SIGNUP_FORM: {
			const { form } = action.payload;
			return state.setIn(['signUp', 'form'], new Models.SignUpForm(form));
		}

		case Actions.SET_ACTIVE_USER: {
			const { user } = action.payload;
			return state.set('loggedUser',
				new Models.User({
					...user,
				})
			);
		}

		case Actions.LOGIN_USER.REQUEST: {
			return state.setIn(['myprofile', 'pending'], true);
		}

		case Actions.LOGIN_USER.SUCCESS: {
			return state
				.setIn(['myprofile', 'detailInfo'], action.payload)
				.setIn(['myprofile', 'pending'], false)
		}

		case Actions.CREATE_USER.REQUEST: {
		  	return state.setIn(['signUp', 'pending'], true);
		}

		case Actions.CREATE_USER.SUCCESS: {
			const {	avatar } = action.payload;
			return state
				.setIn(['signUp', 'form'], action.payload)
				.setIn(['signUp', 'pending'], false);
		}

		case Actions.UPDATE_USER.REQUEST: {
			return state.setIn(['updateprofile', 'updatePending'], true);
		}

		case Actions.UPDATE_USER.SUCCESS: {
			const myprofile = action.payload
			return state
				.setIn(['updateprofile', 'updatePending'], false);
		}

		case Actions.GET_USER_BY_ID.REQUEST: {
			return state.setIn(['getUser', 'getUserPending'], true);
		}

		case Actions.GET_USER_BY_ID.SUCCESS: {
			return state
				.setIn(['getUser', 'getUserInfo'], action.payload)
				.setIn(['getUser', 'getUserPending'], true);
		}

		case Actions.GET_USER_BY_ID.FAILURE: {
			return state.setIn(['getUser', 'getUserPending'], false);
		}

		case Actions.EDIT_USER.REQUEST: {
			return state.setIn(['updateprofile', 'updatePending'], true);
		}

		case Actions.EDIT_USER.SUCCESS: {
			const myprofile = action.payload
			return state
				.setIn(['updateprofile', 'updatePending'], false);
		}
		
		case Actions.FETCH_ALL_USERS.REQUEST: {
			return state
				.setIn(['fetchAllUsers', 'pending'], true);
		}

		case Actions.FETCH_ALL_USERS.SUCCESS: {
			return state
				.setIn(['fetchAllUsers', 'allUsers'], action.payload)
				.setIn(['fetchAllUsers', 'pending'], true);
		}

		case Actions.FETCH_ALL_USERS.FAILURE: {
			return state.setIn(['fetchAllUsers', 'pending'], false);
		}
	}
  	
  	return state;
}
