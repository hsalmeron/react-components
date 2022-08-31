import { action, requestAction, createRequestTypes } from './helpers';

// Actions
export const UPDATE_SIGNUP_FIELD = 'signUp/UPDATE_FORM_FIELD';
export const INITIALIZE_SIGNUP_FORM = 'signUp/INITIALIZE_FORM';
export const SET_ACTIVE_USER = 'user/SET_ACTIVE';

// Async actions
export const CREATE_USER = createRequestTypes('signUp/CREATE_USER');
export const UPDATE_USER = createRequestTypes('profileEdit/UPDATE_USER');
export const FETCH_ME = createRequestTypes('profile/FETCH_ME');
export const GET_USER_BY_ID = createRequestTypes('profile/GET_USER_BY_ID');
export const EDIT_USER = createRequestTypes('profileEdit/EDIT_USER');
export const LOGIN_USER = createRequestTypes('logIn/LOGIN_USER');
export const FETCH_ALL_USERS = createRequestTypes('user/FETCH_ALL_USERS');

// Action helpers
export const updateSignUpField = (name, value) => action(UPDATE_SIGNUP_FIELD, { name, value });
export const initializeSignUpForm = (form) => action(INITIALIZE_SIGNUP_FORM, { form });
export const setActiveUser = (user) => action(SET_ACTIVE_USER, { user });

// Async action helpers
export const createUser = requestAction(CREATE_USER, ['user']);
export const updateUser = requestAction(UPDATE_USER, ['user']);
export const fetchMe = requestAction(FETCH_ME, ['id']);
export const getUserById = requestAction(GET_USER_BY_ID, ['id']);
export const editUser = requestAction(EDIT_USER, ['user']);
export const loginUser = requestAction(LOGIN_USER, ['username', 'password', 'dispatch']);
export const fetchAllUsers = requestAction(FETCH_ALL_USERS, ['page']);