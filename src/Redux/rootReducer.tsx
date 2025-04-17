import { combineReducers } from 'redux';
import exampleReducer from './slices/exampleSlice';

const rootReducer = combineReducers({
  example: exampleReducer,
});

export default rootReducer;
