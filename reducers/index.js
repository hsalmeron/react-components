import { combineReducers } from 'redux'
import app from './App'
import auth from './authReducer';
import user from './userReducer';
import classes from './classesReducer';
import forum from './forumReducer';
import news from './newsReducer';
import deals from './dealsReducer';
import profile from './profileReducer';
import toast from './toastReducer';
import ApolloClient from 'apollo-client';

const client = new ApolloClient();

export default combineReducers({
  app,
  auth,
  user,
  classes,
  forum,
  news,
  deals,
  profile,
  toast,
  apollo: client.reducer()
})
