
import React, { Component } from 'react';
import './Square.css';

export default class Square extends Component {
  static Width = 2;
  static Height = 2;

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
