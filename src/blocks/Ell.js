
import React, { Component } from 'react';
import './Ell.css';
import Block from './Block';
import PropTypes from 'prop-types';

class Ell extends Component {

  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number
  }

  static getCoordinates(x, y) {
    return [{x, y}, {x, y: y + 1}, {x, y: y + 2}, {x: x + 1, y: y + 2}];
  }

  render() {
    return (
      <div className="ell">
        <div className="cell"/>
        <div className="cell"/>
        <div className="row">
          <div className="cell"/>
          <div className="cell"/>
        </div>
      </div>
    );
  }
}

export default Block(Ell);
