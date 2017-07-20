
import Block from './Block';

const orientations = ['N', 'E', 'S', 'W'];

function getCoordinates(x, y, orientation) {
  switch(orientation) {
    //  X
    // XXX
    case 'N' :
      return [{x, y: y + 1}, {x: x + 1, y: y + 1}, {x: x + 1, y: y}, {x: x + 2, y: y + 1}];
    // X
    // XX
    // X
    case 'E' :
      return [{x: x + 1, y:  y - 1}, {x: x + 1, y}, {x: x + 2, y}, {x: x + 1, y: y + 1}];
    // XXX
    //  X
    case 'S' :
      return [{x, y}, {x: x + 1, y}, {x: x + 1, y: y + 1}, {x: x + 2, y}];
      //  X
      // XX
      //  X
    case 'W' :
      return [{x: x + 1, y:  y - 1}, {x: x + 1, y}, {x: x, y}, {x: x + 1, y: y + 1}];
    default :
      return [];
  }
}

export default Block(getCoordinates, orientations, 'tee');
