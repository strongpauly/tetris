
const blockTypes = ['SQUARE', 'LINE', 'ELL', 'ESS', 'RELL', 'RESS'];

function createBlock() {
  return {
    type: blockTypes[Math.floor(Math.random() * blockTypes.length)],
    y: 0
  };
}

export default function(blocks=[], action) {
  if(action.type === 'START') {
    blocks = [createBlock()];
  } else if (action.type === 'BLOCK_STOP') {
    blocks = blocks.concat(createBlock());
  }
  return blocks;
}
