import {combineReducers, createStore} from 'redux';
import reducerComponent from './valueReducer';

const rootReducer = combineReducers({
  sessionActive : reducerComponent.userSessionReducer
});

const store = createStore(rootReducer);

export default store;