

export default function(map={}, action) {
  if(action.type === 'START') {
    //Initialise with a new object.
    map = {};
  } else if (action.type === 'BLOCK_STOP') {
    map = Object.assign({}, map, action.payload.reduce((newMap, cell) => {
      newMap[cell.x + ',' + cell.y] = cell.className;
      return newMap;
    }, {}));
  }
  return map;
}
