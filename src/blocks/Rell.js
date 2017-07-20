
import Block from './Block';

const orientations = ['N', 'E', 'S', 'W'];

function getCoordinates(x, y, orientation) {
  switch(orientation) {
    //  X
    //  X
    // XX
    case 'N' :
      return [{x: x + 1, y: y - 1}, {x : x + 1, y: y}, {x, y: y + 1}, {x: x + 1, y: y + 1}];
    // X
    // XXX
    case 'E' :
      return [{x: x-1, y}, {x: x-1, y: y + 1}, {x: x, y: y+1}, {x: x + 1, y: y + 1}];
    // XX
    // X
    // X
    case 'S' :
      return [{x, y: y - 1}, {x: x + 1, y: y - 1}, {x: x, y: y}, {x: x, y: y + 1}];
    // XXX
    //   X
    case 'W' :
      return [{x: x-1, y:y}, {x: x, y: y}, {x: x + 1, y: y}, {x: x + 1, y: y + 1}];
    default :
      return [];
  }
}

export default Block(getCoordinates, orientations, 'rell');
