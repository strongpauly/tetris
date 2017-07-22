
import Block from './Block';

const orientations = ['N', 'E', 'S', 'W'];

function getCoordinates(x, y, orientation) {
  // eslint-disable-next-line default-case
  switch(orientation) {
    //  X
    //  X
    // XX
    case 'N' :
      return [{x: x, y: y}, {x : x, y: y + 1}, {x: x - 1, y: y + 2}, {x: x, y: y + 2}];
    // X
    // XXX
    case 'E' :
      return [{x: x-1, y}, {x: x-1, y: y + 1}, {x: x, y: y+1}, {x: x + 1, y: y + 1}];
    // XX
    // X
    // X
    case 'S' :
      return [{x: x - 1, y: y - 1}, {x: x, y: y - 1}, {x: x - 1, y: y}, {x: x - 1, y: y + 1}];
    // XXX
    //   X
    case 'W' :
      return [{x: x-1, y:y}, {x: x, y: y}, {x: x + 1, y: y}, {x: x + 1, y: y + 1}];
  }
}

export default Block(getCoordinates, orientations, 'rell');
