
const blockTypes = ['SQUARE', 'LINE', 'T', 'S'];

export default function(blocks=[], action) {
  if(action.type === 'START') {
    blocks = [{
      type: blockTypes[Math.floor(Math.random() * blockTypes.length)],
      y: 0
    }];
  }
  return blocks;
}
