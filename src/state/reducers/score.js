
const defaultScore = {
  numBlocks: 0,
  numLines: 0,
  level: 1,
  score: 0
};

export default function(score=null, action) {
  if(action.type === 'START') {
    score = Object.assign({}, defaultScore);
  } else if (action.type === 'BLOCK_STOP') {
    score = Object.assign({}, score, {numBlocks: score.numBlocks + 1});
  } else if (action.type === 'REMOVE_LINES') {
    const numLines = score.numLines + action.payload.length;
    const level = Math.ceil(numLines / 10);
    score = Object.assign({}, score, {numLines: numLines, level: level, score: score.score + action.payload.length * level});
  }
  return score;
}
