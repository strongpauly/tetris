
import React, { Component } from 'react';

import Square from './Square';
import Line from './Line';

import './Block.css';
import PropTypes from 'prop-types';

const blockSize = 25;

export default class Block extends Component {

  static propTypes = {
    type: PropTypes.string,
    onStopMoving: PropTypes.func,
    collisionGrid: PropTypes.array
  }

  constructor(props) {
    super(props);
    //TODO Change based on type prop.
    this.block = props.type === 'SQUARE' ? new Square() : new Line();
    this.state = {
      x: 5 - (Math.floor(this.block.width / 2)),
      y: 0,
      moving: true,
      rotated: false
    };
  }

  componentWillMount() {
    this.startMoving();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startMoving() {
    this.dropInterval = setInterval(this.drop, 1000);
    document.addEventListener('keydown', this.onKeyDown);
  }

  stopMoving() {
    clearInterval(this.dropInterval);
    document.removeEventListener('keydown', this.onKeyDown);
    if(this.props.onStopMoving !== undefined) {
      this.props.onStopMoving(this.block.getCoordinates(this.state.x, this.state.y));
    }

  }

  onKeyDown = (e) => {
    if(e.key === 'ArrowUp') {
      this.setState({rotated: !this.state.rotated});
    } else if(e.key === 'ArrowDown') {
      this.drop();
    } else if(e.key === 'ArrowLeft') {
      let x = this.state.x - 1;
      if(!this.willCollide(x, this.state.y)) {
        if(x < 0) {
          x = 0;
        }
        this.setState({
          x: x
        });
      }
    } else if(e.key === 'ArrowRight') {
      let x = this.state.x + 1;
      if(!this.willCollide(x, this.state.y)) {
        const maxWidth = 10 - this.block.width;
        if(x > maxWidth) {
          x = maxWidth;
        }
        this.setState({
          x: x
        });
      }
    } else if (e.code === 'Space'){
      let bottom = 20;
      while(bottom > 0 && this.willCollide(this.state.x, bottom - this.block.height)) {
        bottom--;
      }
      let y = bottom - this.block.height;
      this.setState({
        y: y
      });
      this.stopMoving();
    }
  }

  willCollide(x, y) {
    let projected = this.block.getCoordinates(x, y);
    return this.props.collisionGrid.some( (row, y) => row.some((full, x) => {
      return projected.some( cell => full && cell.x === x && cell.y === y);
    }));
  }

  drop = () => {
    let newY = this.state.y + 1;
    let moving = this.state.moving;
    if(this.willCollide(this.state.x, newY)) {
      newY = this.state.y;
      moving = false;
      this.stopMoving();
    } else if(newY === 20 - this.block.height) {
      this.stopMoving();
      moving = false;
    }
    this.setState({
      y: newY,
      moving: moving
    });
  }

  render() {
    return (<div className="block" style={{left: this.state.x * blockSize, top: this.state.y * blockSize}}>{this.block.render()}</div>);
  }
}
