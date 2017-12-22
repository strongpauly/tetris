import {combineReducers} from 'redux';
import score from './score';
import blocks from './blocks';
import collisionMap from './collisionMap';
import {sound} from './sound';

export default combineReducers({
  score,
  blocks,
  collisionMap,
  sound
});
