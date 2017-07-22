
import Block from './Block';

const orientations = ['N', 'E', 'S', 'W'];

function getCoordinates(x, y, orientation) {
  // eslint-disable-next-line default-case
  switch(orientation) {
    case 'N' :
      return [{x: x - 1, y}, {x: x - 1, y: y + 1}, {x: x - 1, y: y + 2}, {x: x, y: y + 2}];
    case 'E' :
      return [{x: x - 1, y}, {x: x - 1, y: y + 1}, {x: x, y}, {x: x + 1, y}];
    case 'S' :
      return [{x: x - 1, y}, {x: x, y}, {x: x, y: y + 1}, {x: x, y: y + 2}];
    case 'W' :
      return [{x: x - 1, y:y + 1}, {x: x, y: y + 1}, {x: x + 1, y: y + 1}, {x: x + 1, y: y}];
  }
}

export default Block(getCoordinates, orientations, 'ell');
