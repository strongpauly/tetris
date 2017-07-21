
import Block from './Block';

const orientations = ['N-S', 'E-W'];

function getCoordinates(x, y, orientation) {
  // eslint-disable-next-line default-case
  switch(orientation) {
    case 'N-S' :
      // X
      // XX
      //  X
      return [{x:x, y}, {x, y: y + 1}, {x: x + 1, y: y + 1}, {x: x + 1, y: y + 2}];
    case 'E-W' :
      //  XX
      // XX
      return [{x, y: y + 1}, {x: x + 1, y: y}, {x: x + 1, y: y + 1}, {x: x + 2, y: y}];
  }
}

export default Block(getCoordinates, orientations, 'ress');
