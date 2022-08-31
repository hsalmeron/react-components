'use strict'
import * as _ from 'lodash'
import * as types from '../constants/actionsTypes'
import * as navStates from '../constants/NavState'

export function changeAppRoot (root, force = false) {
  return {
    type: types.ROOT_CHANGED,
    root: root,
    force
  }
}

export function appInitialized () {
  return function * (dispatch, getState) {
    dispatch(changeAppRoot(navStates.NAV_ROOT_LOGIN))
  }
}

export function changeRootMain () {
  return function * (dispatch, getState) {
    dispatch(changeAppRoot(navStates.NAV_ROOT_MAIN))
  }
}
