import React from 'react';
import ReactDOM from 'react-dom';
import Line from './Line';
import {mount} from 'enzyme';

/*eslint-env jest*/

describe('Block', () => {
  describe('Line', () => {
    it('can render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Line />, div);
    });

    function triggerKeyEvent(reactWrapper, event) {
      //Not the best way to do this, but couldn't find a good example about how to mock the window event.
      reactWrapper.instance().onKeyDown(event);
    }

    it('can drop to bottom', () => {
      const onStopMoving = jest.fn();
      const ell = mount(<Line collisionMap={{}} onStopMoving={onStopMoving}/>);
      triggerKeyEvent(ell, {code:'Space'});
      expect(onStopMoving).toHaveBeenCalledTimes(1);
      const expectedResult = [16, 17, 18, 19].map( y => ({y, x: 5, className:'line'}));
      expect(onStopMoving).toHaveBeenCalledWith(expectedResult);
    });
  });
});
