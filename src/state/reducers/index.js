import {combineReducers} from 'redux';
import blocks from './blocks';
import collisionGrid from './collisionGrid';

export default combineReducers({
  blocks,
  collisionGrid
});
