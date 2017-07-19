
import React, { Component } from 'react';
import Square from './Square';
import './Block.css';

const blockSize = 25;

export default class Block extends Component {

  constructor(props) {
    super(props);
    //TODO Change based on type prop.
    this.BlockType = Square;
    this.state = {
      x: 125 - (this.BlockType.Width / 2) * blockSize,
      y: 0,
      moving: true
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
  }

  onKeyDown = (e) => {
    if(e.key === 'ArrowUp') {
      this.rotate();
    } else if(e.key === 'ArrowDown') {
      this.setState({
        y: (blockSize * 20) - (this.BlockType.Height * blockSize)
      });
      this.stopMoving();
    } else if(e.key === 'ArrowLeft') {
      let x = this.state.x - blockSize;
      if(x < 0) {
        x = 0;
      }
      this.setState({
        x: x
      });
    } else if(e.key === 'ArrowRight') {
      let x = this.state.x + blockSize;
      const maxWidth = (blockSize * 10) - ((this.BlockType.Width) * blockSize);
      if(x > maxWidth) {
        x = maxWidth;
      }
      this.setState({
        x: x
      });
    }
  }

  drop = () => {
    const newY = this.state.y + blockSize;
    let moving = this.state.moving;
    if(newY >= (blockSize * 20) - (this.BlockType.Height * blockSize)) { //TODO: Change this to collision detection.
      this.stopMoving();
      moving = false;
    }
    this.setState({
      y: newY,
      moving: moving
    });
  }

  rotate() {

  }

  render() {
    return (<div className="block" style={{left: this.state.x, top: this.state.y}}><this.BlockType /></div>);
  }
}
