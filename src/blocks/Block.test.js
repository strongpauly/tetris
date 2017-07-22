import React from 'react';
import ReactDOM from 'react-dom';

import Ell from './Ell';
import Ess from './Ess';
import Line from './Line';
import Rell from './Rell';
import Ress from './Ress';
import Square from './Square';
import Tee from './Tee';

import {mount, shallow} from 'enzyme';

import {blockSize} from '../dimensions';

import toJson from 'enzyme-to-json';

/*eslint-env jest*/

describe('Block', () => {

  function triggerKeyEvent(reactWrapper, event) {
    //Not the best way to do this, but couldn't find a good example about how to mock the window event.
    reactWrapper.instance().onKeyDown(event);
  }

  it('can move left to bounds', () => {
    const ell = shallow(<Line collisionMap={{}} onStopMoving={jest.fn()} moving={true}/>);
    expect(ell.find('.block').prop('style')).toEqual({left: 5 * blockSize, top: 0});
    triggerKeyEvent(ell, {key:'ArrowLeft'});
    expect(ell.find('.block').prop('style')).toEqual({left: 4 * blockSize, top: 0});
    triggerKeyEvent(ell, {key:'ArrowLeft'});
    expect(ell.find('.block').prop('style')).toEqual({left: 3 * blockSize, top: 0});
    triggerKeyEvent(ell, {key:'ArrowLeft'});
    expect(ell.find('.block').prop('style')).toEqual({left: 2 * blockSize, top: 0});
    triggerKeyEvent(ell, {key:'ArrowLeft'});
    expect(ell.find('.block').prop('style')).toEqual({left: 1 * blockSize, top: 0});
    triggerKeyEvent(ell, {key:'ArrowLeft'});
    expect(ell.find('.block').prop('style')).toEqual({left: 0, top: 0});
    triggerKeyEvent(ell, {key:'ArrowLeft'});
    expect(ell.find('.block').prop('style')).toEqual({left: 0, top: 0});
  });

  it('can move right to bounds', () => {
    const ell = shallow(<Line collisionMap={{}} onStopMoving={jest.fn()} moving={true}/>);
    expect(ell.find('.block').prop('style')).toEqual({left: 5 * blockSize, top: 0});
    triggerKeyEvent(ell, {key:'ArrowRight'});
    expect(ell.find('.block').prop('style')).toEqual({left: 6 * blockSize, top: 0});
    triggerKeyEvent(ell, {key:'ArrowRight'});
    expect(ell.find('.block').prop('style')).toEqual({left: 7 * blockSize, top: 0});
    triggerKeyEvent(ell, {key:'ArrowRight'});
    expect(ell.find('.block').prop('style')).toEqual({left: 8 * blockSize, top: 0});
    triggerKeyEvent(ell, {key:'ArrowRight'});
    expect(ell.find('.block').prop('style')).toEqual({left: 9 * blockSize, top: 0});
    triggerKeyEvent(ell, {key:'ArrowRight'});
    expect(ell.find('.block').prop('style')).toEqual({left: 9 * blockSize, top: 0});
  });

  it('can move down', () => {
    const ell = shallow(<Line collisionMap={{}} onStopMoving={jest.fn()} moving={true}/>);
    expect(ell.find('.block').prop('style')).toEqual({left: 5 * blockSize, top: 0});
    triggerKeyEvent(ell, {key:'ArrowDown'});
    expect(ell.find('.block').prop('style')).toEqual({left: 5 * blockSize, top: 1 * blockSize});
  });

  it('can drop to bottom', () => {
    const onStopMoving = jest.fn();
    const ell = mount(<Line collisionMap={{}} onStopMoving={onStopMoving} moving={true}/>);
    triggerKeyEvent(ell, {code:'Space'});
    expect(onStopMoving).toHaveBeenCalledTimes(1);
    const expectedResult = [16, 17, 18, 19].map( y => ({y, x: 5, className:'line'}));
    expect(onStopMoving).toHaveBeenCalledWith(expectedResult);
  });

  it('can drop to bottom without a stop moving listener', () => {
    const ell = mount(<Line collisionMap={{}} moving={true}/>);
    expect(() => {
      triggerKeyEvent(ell, {code:'Space'});
    }).not.toThrow();
  });

  it('can rotate at the far right', () => {
    const ell = shallow(<Line collisionMap={{}} onStopMoving={jest.fn()} moving={true}/>);
    expect(ell.state('orientation')).toEqual('N-S');
    triggerKeyEvent(ell, {key:'ArrowRight'});
    triggerKeyEvent(ell, {key:'ArrowRight'});
    triggerKeyEvent(ell, {key:'ArrowRight'});
    triggerKeyEvent(ell, {key:'ArrowRight'});
    triggerKeyEvent(ell, {key:'ArrowUp'});
    expect(ell.state('orientation')).toEqual('E-W');
  });

  it('can rotate at the far left', () => {
    const ell = shallow(<Line collisionMap={{}} onStopMoving={jest.fn()} moving={true}/>);
    expect(ell.state('orientation')).toEqual('N-S');
    expect(ell.find('.animated')).toHaveLength(1);
    triggerKeyEvent(ell, {key:'ArrowLeft'});
    triggerKeyEvent(ell, {key:'ArrowLeft'});
    triggerKeyEvent(ell, {key:'ArrowLeft'});
    triggerKeyEvent(ell, {key:'ArrowLeft'});
    triggerKeyEvent(ell, {key:'ArrowLeft'});
    triggerKeyEvent(ell, {key:'ArrowUp'});
    expect(ell.state('orientation')).toEqual('E-W');
    //Don't animate this.
    expect(ell.find('.animated')).toHaveLength(0);
  });

  it('cannot rotate if it would collide', () => {
    //Line right next to starting position.
    const collisionMap = {
      '4,0' : 'line',
      '4,1' : 'line',
      '4,2' : 'line',
      '4,3' : 'line',
      '4,4' : 'line'
    };
    const ell = shallow(<Line collisionMap={collisionMap} onStopMoving={jest.fn()} moving={true}/>);
    expect(ell.state('orientation')).toEqual('N-S');
    triggerKeyEvent(ell, {key:'ArrowUp'});
    expect(ell.state('orientation')).toEqual('N-S');
  });

  it('will ignore other key events', () => {
    const ell = shallow(<Ess collisionMap={{}} onStopMoving={jest.fn()} moving={true}/>);
    const before = toJson(ell);
    triggerKeyEvent(ell, {key:'a'});
    expect(before).toEqual(toJson(ell));
  });

  describe('Ell', () => {
    it('can render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Ell />, div);
    });

    it('can rotate', () => {
      const ell = shallow(<Ell collisionMap={{}} onStopMoving={jest.fn()} moving={true}/>);
      expect(ell.state('orientation')).toEqual('N');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('E');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('S');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('W');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('N');
      expect(ell).toMatchSnapshot();
    });
  });

  describe('Ess', () => {
    it('can render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Ess />, div);
    });

    it('can rotate', () => {
      const ell = shallow(<Ess collisionMap={{}} onStopMoving={jest.fn()} moving={true}/>);
      expect(ell.state('orientation')).toEqual('N-S');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('E-W');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('N-S');
      expect(ell).toMatchSnapshot();
    });
  });

  describe('Line', () => {
    it('can render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Line />, div);
    });

    it('can rotate', () => {
      const ell = shallow(<Line collisionMap={{}} onStopMoving={jest.fn()} moving={true}/>);
      expect(ell.state('orientation')).toEqual('N-S');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('E-W');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('N-S');
      expect(ell).toMatchSnapshot();
    });
  });

  describe('Rell', () => {
    it('can render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Rell />, div);
    });

    it('can rotate', () => {
      const ell = shallow(<Rell collisionMap={{}} onStopMoving={jest.fn()} moving={true}/>);
      expect(ell.state('orientation')).toEqual('N');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('E');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('S');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('W');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('N');
      expect(ell).toMatchSnapshot();
    });
  });

  describe('Ress', () => {
    it('can render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Ress />, div);
    });

    it('can rotate', () => {
      const ell = shallow(<Ress collisionMap={{}} onStopMoving={jest.fn()} moving={true}/>);
      expect(ell.state('orientation')).toEqual('N-S');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('E-W');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('N-S');
      expect(ell).toMatchSnapshot();
    });
  });

  describe('Square', () => {
    it('can render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Square />, div);
    });
  });

  describe('Tee', () => {
    it('can render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Tee />, div);
    });

    it('can rotate', () => {
      const ell = shallow(<Tee collisionMap={{}} onStopMoving={jest.fn()} moving={true}/>);
      expect(ell.state('orientation')).toEqual('N');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('E');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('S');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('W');
      expect(ell).toMatchSnapshot();
      triggerKeyEvent(ell, {key:'ArrowUp'});
      expect(ell.state('orientation')).toEqual('N');
      expect(ell).toMatchSnapshot();
    });
  });

});
