
import {gameWidth, gameHeight} from '../../dimensions';

export const defaultMap = {};

export default function(map={}, action) {
  if(action.type === 'START') {
    //Initialise with a new object.
    map = defaultMap;
  } else if (action.type === 'BLOCK_STOP') {
    map = Object.assign({}, map, action.payload.reduce((newMap, cell) => {
      newMap[cell.x + ',' + cell.y] = cell.className;
      return newMap;
    }, {}));
  } else if (action.type === 'REMOVE_LINES') {
    map = Object.keys(map).reduce((newMap, key) => {
      const split = key.split(',');
      const x = Number(split[0]);
      const y = Number(split[1]);
      if(action.payload.indexOf(y) === -1) {
        newMap[x + ',' + (y + action.payload.reduce((total, lineNumber) => total + (lineNumber > y ? 1 : 0), 0))] = map[key];
      }
      return newMap;
    }, {});
  } else if (action.type === 'STOP') {
    map = new Array(gameHeight).fill(new Array(gameWidth)).reduce((newMap, row, y) => {
      row.fill();
      row.forEach((nada, x) => {
        newMap[x + ',' + y] = '';
      });
      return newMap;
    }, {});
  }
  return map;
}
