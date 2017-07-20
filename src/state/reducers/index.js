import {combineReducers} from 'redux';
import score from './score';
import blocks from './blocks';
import collisionMap from './collisionMap';

export default combineReducers({
  score,
  blocks,
  collisionMap
});
