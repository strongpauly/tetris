
import React, { Component } from 'react';
import './Square.css';

export default class Square extends Component {

  get width() {
    return 2;
  }

  get height() {
    return 2;
  }

  getCoordinates(x, y) {
    return [{x, y}, {x, y: y + 1}, {x: x + 1, y}, {x: x+1, y: y+1}];
  }

  render() {
    return (
      <div className="square">
        <div className="row">
          <div className="cell">
          </div>
          <div className="cell">
          </div>
        </div>
        <div className="row">
          <div className="cell">
          </div>
          <div className="cell">
          </div>
        </div>
      </div>
    );
  }
}
