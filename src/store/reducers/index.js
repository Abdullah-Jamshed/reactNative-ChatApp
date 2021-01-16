import {combineReducers} from 'redux';
import homeReducer from './homeReducer';
import chatReducer from './chatReducer';

export default combineReducers({
  homeReducer,
  chatReducer,
});
