import { Record } from 'immutable';

import * as Actions from '../actions/authActions';
import { UPDATE_SIGNUP_FIELD } from '../actions/userActions';

const initialState = new (Record({
  token: '',
  isAuthPending: false
}));

export default function authReducer(state = initialState, action) {
	if (!(state instanceof Record)) 
		return initialState.merge(state);

	switch (action.type) {
		case UPDATE_SIGNUP_FIELD: {
			const { name, value } = action.payload;
			return state;
		}

		// Async action listeners
		case Actions.LOGIN_USER_WITH_DIGITS.REQUEST: {
			return state.set('isAuthPending', true);
		}

		case Actions.LOGIN_USER_WITH_DIGITS.SUCCESS: {
			const { token } = action.payload;
			return state.set('token', token).set('isAuthPending', false);
		}

		case Actions.LOGIN_USER_WITH_DIGITS.FAILURE: {
			return state.set('isAuthPending', false);
		}
  }

  return state;
}
