
import Block from './Block';

const orientations = ['N-S', 'E-W'];

function getCoordinates(x, y, orientation) {
  switch(orientation) {
    case 'N-S' :
      //  X
      // XX
      // X
      return [{x:x + 1, y}, {x, y: y + 1}, {x: x + 1, y: y + 1}, {x, y: y + 2}];
    case 'E-W' :
      // XX
      //  XX
      return [{x: x - 1, y: y}, {x: x, y: y}, {x: x, y: y + 1}, {x: x + 1, y: y + 1}];
    default :
      return [];
  }
}

export default Block(getCoordinates, orientations, 'ess');
