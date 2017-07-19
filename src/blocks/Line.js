
import React, { Component } from 'react';
import './Line.css';

export default class Line extends Component {

  get width() {
    return 1;
  }

  get height() {
    return 4;
  }

  getCoordinates(x, y) {
    return [{x, y}, {x, y: y + 1}, {x, y: y + 2}, {x, y: y+3}];
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
