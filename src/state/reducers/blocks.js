
const blockTypes = ['SQUARE', 'LINE', 'ELL', 'ESS', 'RELL', 'RESS'];

function createBlock() {
  return blockTypes[Math.floor(Math.random() * blockTypes.length)];
}

export default function(blocks=[], action) {
  if(action.type === 'START') {
    //Current and next to be shown.
    blocks = [createBlock(), createBlock()];
  } else if (action.type === 'BLOCK_STOP') {
    //Remove the first one and add a new one.
    blocks = blocks.slice(1).concat(createBlock());
  }
  return blocks;
}
