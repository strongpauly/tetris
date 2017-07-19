
import React, { Component } from 'react';
import './Line.css';
import Block from './Block';
import PropTypes from 'prop-types';

class Line extends Component {

  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number
  }

  static getCoordinates(x, y) {
    return [{x, y}, {x, y: y + 1}, {x, y: y + 2}, {x, y: y + 3}];
  }

  render() {
    return (
      <div className="line">
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
