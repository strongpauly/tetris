import collisionMap from './collisionMap';

import startGame from '../actions/startGame';
import blockStop from '../actions/blockStop';
import removeLines from '../actions/removeLines';

/*eslint-env jest*/

describe('collisionMap', () => {
  it('creates a new map on start', () => {
    let map = collisionMap(undefined, startGame());
    expect(map != null).toEqual(true);
    expect(typeof map).toEqual('object');
    expect(Object.keys(map).length).toEqual(0);
  });

  it('stores cell information when a block stops', () => {
    let map = collisionMap(undefined, startGame());
    map = collisionMap(map, blockStop([{x:0, y:0, className:'test'}]));
    expect(Object.keys(map).length).toEqual(1);
    Object.keys(map).forEach(key => {
      expect(key).toEqual('0,0');
      expect(map[key]).toEqual('test');
    });
  });

  it('will remove cells when a line is removed', () => {
    let map = collisionMap(undefined, startGame());
    map = collisionMap(map, blockStop([{x:0, y:0, className:'test'}, {x:1, y:0, className:'test'}, {x:2, y:0, className:'test'}]));
    expect(Object.keys(map).length).toEqual(3);
    Object.keys(map).forEach(key => {
      expect(map[key]).toEqual('test');
    });
    map = collisionMap(map, removeLines([0]));
    expect(Object.keys(map).length).toEqual(0);
  });

  it('will remove cells when multiple lines are removed', () => {
    let map = collisionMap(undefined, startGame());
    map = collisionMap(map, blockStop([{x:0, y:1, className:'test'}, {x:1, y:1, className:'test'}, {x:2, y:1, className:'test'}]));
    expect(Object.keys(map).length).toEqual(3);
    Object.keys(map).forEach(key => {
      expect(map[key]).toEqual('test');
    });
    map = collisionMap(map, blockStop([{x:0, y:0, className:'test'}, {x:1, y:0, className:'test'}, {x:2, y:0, className:'test'}]));
    expect(Object.keys(map).length).toEqual(6);
    Object.keys(map).forEach(key => {
      expect(map[key]).toEqual('test');
    });
    map = collisionMap(map, removeLines([0, 1]));
    expect(Object.keys(map).length).toEqual(0);
  });

  it('will move cells down when a line is removed below it', () => {
    let map = collisionMap(undefined, startGame());
    map = collisionMap(map, blockStop([{x:0, y:0, className:'test'}]));
    expect(Object.keys(map).length).toEqual(1);
    map = collisionMap(map, blockStop([{x:0, y:1, className:'test'}]));
    expect(Object.keys(map).length).toEqual(2);
    map = collisionMap(map, removeLines([1]));
    expect(Object.keys(map).length).toEqual(1);
    expect(map).toEqual({'0,1' : 'test'});
  });

  it('will move cells down when multiple lines are removed below it', () => {
    let map = collisionMap(undefined, startGame());
    map = collisionMap(map, blockStop([{x:0, y:0, className:'test'}, {x:0, y:1, className:'test'}, {x:0, y:2, className:'test'}]));
    expect(Object.keys(map).length).toEqual(3);
    map = collisionMap(map, removeLines([1, 2]));
    expect(Object.keys(map).length).toEqual(1);
    expect(map).toEqual({'0,2' : 'test'});
  });
});
