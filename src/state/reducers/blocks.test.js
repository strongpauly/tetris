import reducer from './blocks';

import startGame from '../actions/startGame';
import blockStop from '../actions/blockStop';

/*eslint-env jest*/

describe('blocks', () => {
  it('of length two are created on start', () => {
    const blocks = reducer(undefined, startGame());
    expect(blocks != null).toEqual(true);
    expect(blocks.length).toEqual(2);
  });

  it('removes first item and adds a new one on blockStop', () => {
    let original = reducer(undefined, startGame());
    let newBlocks = reducer(original, blockStop([]));
    expect(newBlocks != null).toEqual(true);
    expect(newBlocks.length).toEqual(2);
    expect(original === newBlocks).toEqual(false);
    expect(original[1]).toEqual(newBlocks[0]);
  });

});
