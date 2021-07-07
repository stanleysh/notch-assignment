import { combineReducers } from 'redux';
import orders from './orders';

// If any other reducers/states are created, we can combine them here
export default combineReducers({
  orders,
});