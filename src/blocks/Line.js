
import Block from './Block';

const orientations = ['N-S', 'E-W'];

function getCoordinates(x, y, orientation) {
  return orientation === 'N-S' ?
    [{x, y}, {x, y: y + 1}, {x, y: y + 2}, {x, y: y + 3}] :
    //E-W
    [{x, y}, {x: x + 1, y}, {x:x + 2, y}, {x:x + 3, y}]
  ;
}


export default Block(getCoordinates, orientations, 'line');
