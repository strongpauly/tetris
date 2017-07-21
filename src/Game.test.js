import React from 'react';
import ReactDOM from 'react-dom';
import {Game} from './Game';

import {shallow, mount} from 'enzyme';

import startGame from './state/actions/startGame';
import blockStop from './state/actions/blockStop';
import removeLines from './state/actions/removeLines';
import stopGame from './state/actions/stopGame';

import scoreReducer from './state/reducers/score';
import collisionMapReducer from './state/reducers/collisionMap';

import {gameHeight} from './dimensions';

/*eslint-env jest*/

describe('<Game>', () => {


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Game dispatch={jest.fn()}/>, div);
  });

  it('renders a block', () => {
    const wrapper = shallow(<Game dispatch={jest.fn()} blocks={['SQUARE', 'LINE']} score={{}} collisionMap={{}}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders all block types', () => {
    expect(shallow(<Game dispatch={jest.fn()} blocks={['SQUARE', 'LINE']} score={{}} collisionMap={{}}/>)).toMatchSnapshot();
    expect(shallow(<Game dispatch={jest.fn()} blocks={['LINE', 'LINE']} score={{}} collisionMap={{}}/>)).toMatchSnapshot();
    expect(shallow(<Game dispatch={jest.fn()} blocks={['ELL', 'LINE']} score={{}} collisionMap={{}}/>)).toMatchSnapshot();
    expect(shallow(<Game dispatch={jest.fn()} blocks={['ESS', 'LINE']} score={{}} collisionMap={{}}/>)).toMatchSnapshot();
    expect(shallow(<Game dispatch={jest.fn()} blocks={['TEE', 'LINE']} score={{}} collisionMap={{}}/>)).toMatchSnapshot();
    expect(shallow(<Game dispatch={jest.fn()} blocks={['RELL', 'LINE']} score={{}} collisionMap={{}}/>)).toMatchSnapshot();
    expect(shallow(<Game dispatch={jest.fn()} blocks={['RESS', 'LINE']} score={{}} collisionMap={{}}/>)).toMatchSnapshot();
  });

  it('will move blocks to the bottom', () => {
    jest.useFakeTimers();
    const dispatch = jest.fn();
    const collisionMap = {};
    const wrapper = mount(<Game dispatch={dispatch} blocks={['LINE', 'LINE']} score={scoreReducer(undefined, startGame())} collisionMap={collisionMap}/>);
    expect(wrapper).toMatchSnapshot();
    expect(dispatch).toHaveBeenLastCalledWith(startGame());
    for(let i=0; i< 17; i++) {
      jest.runTimersToTime(1000);
    }
    expect(wrapper).toMatchSnapshot();
    const blocks = new Array(4).fill('line').map( (className, index) => ({className, x: 5, y: 16 + index}));
    expect(dispatch).toHaveBeenLastCalledWith(blockStop(blocks));
  });

  it('will remove lines', () => {
    jest.useFakeTimers();
    const dispatch = jest.fn((action) => {
      if(action.type === 'BLOCK_STOP') {
        //Replicate what redux would have done?
        wrapper.setProps({collisionMap: collisionMapReducer(collisionMap, action)});
      }
    });
    //Create a grid ready for a line to fall into.
    const collisionMap = {};
    for(let x = 0; x < 5; x ++) {
      for (let y = 16; y < 20; y ++) {
        collisionMap[x + ',' + y] = 'line';
      }
    }
    for(let x = 6; x < 10; x ++) {
      for (let y = 16; y < 20; y ++) {
        collisionMap[x + ',' + y] = 'line';
      }
    }
    const wrapper = mount(<Game dispatch={dispatch} blocks={['LINE', 'LINE']} score={scoreReducer(undefined, startGame())} collisionMap={collisionMap}/>);
    expect(wrapper).toMatchSnapshot();
    expect(dispatch).toHaveBeenLastCalledWith(startGame());
    for(let i=0; i< 17; i++) {
      jest.runTimersToTime(1000);
    }
    expect(wrapper).toMatchSnapshot();
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenLastCalledWith(removeLines([16,17,18,19]));
  });

  it('can be lost', () => {
    jest.useFakeTimers();
    let collisionMap = collisionMapReducer(undefined, startGame());
    let score = scoreReducer(undefined, startGame());
    //Constantly provide lines.
    const blocks = ['LINE', 'LINE'];
    const dispatch = jest.fn((action) => {
      if(action.type === 'BLOCK_STOP') {
        //Replicate what redux would have done?
        collisionMap = collisionMapReducer(collisionMap, action);
        score = scoreReducer(score, action);
        wrapper.setProps({collisionMap, score});
      }
    });
    const wrapper = mount(<Game dispatch={dispatch} blocks={blocks} score={score} collisionMap={collisionMap}/>);
    expect(wrapper).toMatchSnapshot();
    expect(dispatch).toHaveBeenLastCalledWith(startGame());

    function dropBlock() {
      for(let i=0; i <= gameHeight - ((score.numBlocks + 1) * 4); i++) {
        jest.runTimersToTime(1000);
      }
    }
    dropBlock();
    expect(wrapper).toMatchSnapshot();
    expect(dispatch).toHaveBeenCalledTimes(2);
    dropBlock();
    expect(wrapper).toMatchSnapshot();
    expect(dispatch).toHaveBeenCalledTimes(3);
    dropBlock();
    expect(wrapper).toMatchSnapshot();
    expect(dispatch).toHaveBeenCalledTimes(4);
    dropBlock();
    expect(wrapper).toMatchSnapshot();
    expect(dispatch).toHaveBeenCalledTimes(5);
    dropBlock();
    expect(wrapper).toMatchSnapshot();
    expect(dispatch).toHaveBeenCalledTimes(6);
    jest.runTimersToTime(1000);
    expect(dispatch).toHaveBeenCalledTimes(7);
    expect(dispatch).toHaveBeenCalledWith(stopGame());
  });
});
