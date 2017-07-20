
import Block from './Block';

const orientations = ['N-S', 'E-W'];

function getCoordinates(x, y, orientation) {
  return orientation === 'N-S' ?
    [{x, y}, {x, y: y + 1}, {x, y: y + 2}, {x, y: y + 3}] :
    //E-W
    [{x: x - 1, y: y + 1}, {x: x, y: y + 1}, {x:x + 1, y: y + 1}, {x:x + 2, y: y + 1}]
  ;
}


export default Block(getCoordinates, orientations, 'line');
