
import Block from './Block';

const orientations = ['N', 'E', 'S', 'W'];

function getCoordinates(x, y, orientation) {
  // eslint-disable-next-line default-case
  switch(orientation) {
    //  X
    // XXX
    case 'N' :
      return [{x: x-1, y: y + 1}, {x: x, y: y + 1}, {x: x, y: y}, {x: x + 1, y: y + 1}];
    // X
    // XX
    // X
    case 'E' :
      return [{x: x, y:  y}, {x: x, y: y + 1}, {x: x + 1, y: y + 1}, {x: x, y: y + 2}];
    // XXX
    //  X
    case 'S' :
      return [{x: x - 1, y: y + 1}, {x: x, y: y + 1}, {x: x, y: y + 2}, {x: x + 1, y : y + 1}];
      //  X
      // XX
      //  X
    case 'W' :
      return [{x: x, y:  y}, {x: x, y: y + 1}, {x: x - 1, y: y + 1}, {x: x, y: y + 2}];
  }
}

export default Block(getCoordinates, orientations, 'tee');
