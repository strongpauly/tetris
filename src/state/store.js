import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers/';
import { createLogger } from 'redux-logger';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    // ...options
  });

  middlewares.push(logger);
}

export default createStore(reducers, applyMiddleware(...middlewares));
