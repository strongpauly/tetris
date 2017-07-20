
const defaultScore = {
  numBlocks: 0,
  numLines: 0,
  level: 1
};

export default function(score=null, action) {
  if(action.type === 'START') {
    score = Object.assign({}, defaultScore);
  } else if (action.type === 'BLOCK_STOP') {
    score = Object.assign({}, {numBlocks: score.numBlocks + 1});
  } else if (action.type === 'REMOVE_LINES') {
    score = Object.assign({}, {numLines: score.numLines + action.payload.length});
  }
  return score;
}
