import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers/';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  // ...options
});

export default createStore(reducers, applyMiddleware(logger));
