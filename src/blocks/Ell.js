
import React, { Component } from 'react';
import './Ell.css';
import Block from './Block';
import PropTypes from 'prop-types';

class Ell extends Component {

  static orientations = ['N', 'E', 'S', 'W'];

  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    orientation: PropTypes.string
  }

  static getCoordinates(x, y, orientation) {
    //TODO: Make these right!
    switch(orientation) {
      case 'N' :
        return [{x, y}, {x, y: y + 1}, {x, y: y + 2}, {x: x + 1, y: y + 2}];
      case 'E' :
        return [{x, y}, {x, y: y + 1}, {x, y: y + 2}, {x: x + 1, y: y + 2}];
      case 'S' :
        return [{x, y}, {x, y: y + 1}, {x, y: y + 2}, {x: x + 1, y: y + 2}];
      case 'W' :
        return [{x, y}, {x, y: y + 1}, {x, y: y + 2}, {x: x + 1, y: y + 2}];
    }
  }

  render() {
    return (
      <div className={ 'ell ' + this.props.orientation}>
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
