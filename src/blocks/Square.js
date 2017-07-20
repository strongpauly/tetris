import Block from './Block';

const orientations = ['N'];

function getCoordinates(x, y) {
  return [{x, y}, {x, y: y + 1}, {x: x + 1, y}, {x: x+1, y: y+1}];
}

export default Block(getCoordinates, orientations, 'square');
