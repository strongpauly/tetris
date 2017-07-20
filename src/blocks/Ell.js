
import Block from './Block';

const orientations = ['N', 'E', 'S', 'W'];

function getCoordinates(x, y, orientation) {
  //TODO: Make these right!
  switch(orientation) {
    case 'N' :
      return [{x, y}, {x, y: y + 1}, {x, y: y + 2}, {x: x + 1, y: y + 2}];
    case 'E' :
      return [{x, y}, {x, y: y + 1}, {x, y: y + 2}, {x: x + 1, y: y + 2}];
    case 'S' :
      return [{x, y}, {x, y: y + 1}, {x, y: y + 2}, {x: x + 1, y: y + 2}];
    case 'W' :
      return [{x, y}, {x, y: y + 1}, {x, y: y + 2}, {x: x + 1, y: y + 2}];
    default :
      return [];
  }
}

export default Block(getCoordinates, orientations, 'ell');
