import reducer from './score';

import startGame from '../actions/startGame';
import stopGame from '../actions/stopGame';
import removeLines from '../actions/removeLines';

/*eslint-env jest*/

describe('score', () => {
  it('creates a new score on start', () => {
    const score = reducer(undefined, startGame());
    expect(score != null).toEqual(true);
    expect(typeof score).toEqual('object');
    expect(score).toEqual({
      numBlocks: 0,
      numLines: 0,
      level: 1,
      score: 0,
      gameOver: false
    });
  });

  it('is updated when lines are removed', () => {
    let score = reducer(undefined, startGame());
    const theScore = score.score;
    score = reducer(score, removeLines([0,1,2]));
    expect(score.score).toEqual(theScore + 3);
  });

  it('raises level when 10 lines are removed', () => {
    let score = reducer(undefined, startGame());
    const level = score.score;
    score = reducer(score, removeLines([0,1,2,4,5,6,7,8,9]));
    expect(score.level).toEqual(level + 1);
  });

  it('sets game over when game is stopped.', () => {
    let score = reducer(undefined, startGame());
    expect(score).toEqual({
      numBlocks: 0,
      numLines: 0,
      level: 1,
      score: 0,
      gameOver: false
    });
    score = reducer(score, stopGame());
    expect(score).toEqual({
      numBlocks: 0,
      numLines: 0,
      level: 1,
      score: 0,
      gameOver: true
    });
  });
});
