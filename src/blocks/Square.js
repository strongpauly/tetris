
import React, { Component } from 'react';
import './Square.css';
import Block from './Block';
import PropTypes from 'prop-types';

export default Block(class Square extends Component {

  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number
  }

  static get width() {
    return 2;
  }

  static get height() {
    return 2;
  }

  static getCoordinates(x, y) {
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
});
