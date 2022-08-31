import { Record, List, Set } from 'immutable';

import * as Actions from '../actions/profileActions';

import * as Models from '../models';

const initialState = new (Record({
	myprofile: new (Record({
		detailInfo: new Models.SignUpForm(),
		pending: false,
	}))
}));

export default function profileReducer(state = initialState, action) {
  if (!(state instanceof Record)) return initialState.merge(state);

  switch (action.type) {
    // Async action listeners
    case Actions.FETCH_ME.REQUEST: {
      	return state.setIn(['myprofile', 'pending'], true);
    }

    case Actions.FETCH_ME.SUCCESS: {
			const myinfo = action.payload;
			return state
				.setIn(['myprofile', 'detailInfo'], myinfo)
				.setIn(['myprofile', 'pending'], false);
    }

		case Actions.FETCH_ME.FAILURE: {
			return state.setIn(['myprofile', 'pending'], false);
		}
  }

  return state;
}
