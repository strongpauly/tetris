
import React, { Component } from 'react';
import './Line.css';
import Block from './Block';
import PropTypes from 'prop-types';

class Line extends Component {

  static orientations = ['N-S', 'E-W']

  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    orientation: PropTypes.string
  }

  static getCoordinates(x, y, orientation) {
    return orientation === 'N-S' ?
      [{x, y}, {x, y: y + 1}, {x, y: y + 2}, {x, y: y + 3}] :
      //E-W
      [{x, y}, {x: x + 1, y}, {x:x + 2, y}, {x:x + 3, y}]
    ;
  }

  render() {
    return (
      <div className={ 'line ' + this.props.orientation}>
        <div className="cell">
        </div>
        <div className="cell">
        </div>
        <div className="cell">
        </div>
        <div className="cell">
        </div>
      </div>
    );
  }
}

export default Block(Line);
