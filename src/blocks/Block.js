
import React, { Component } from 'react';

import './Block.css';
import PropTypes from 'prop-types';

import willCollide from '../lib/willCollide';

const blockSize = 25;

export default function(WrappedBlock) {
  return class Block extends Component {

    static propTypes = {
      type: PropTypes.string,
      onStopMoving: PropTypes.func,
      collisionGrid: PropTypes.array
    }

    constructor(props) {
      super(props);
      this.state = {
        x: 5 - (Math.floor(WrappedBlock.width / 2)),
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

    stopMoving(x, y) {
      clearInterval(this.dropInterval);
      document.removeEventListener('keydown', this.onKeyDown);
      if(this.props.onStopMoving !== undefined) {
        this.props.onStopMoving(WrappedBlock.getCoordinates(x, y));
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
          const maxWidth = 10 - WrappedBlock.width;
          if(x > maxWidth) {
            x = maxWidth;
          }
          this.setState({
            x: x
          });
        }
      } else if (e.code === 'Space'){
        let moving = this.state.moving;
        while(moving) {
          moving = this.drop();
        }
      }
    }

    willCollide(x, y) {
      return willCollide(this.props.collisionGrid, WrappedBlock.getCoordinates(x, y));
    }

    drop = () => {
      let newY = this.state.y + 1;
      let moving = this.state.moving;
      if(this.willCollide(this.state.x, newY)) {
        newY = this.state.y;
        moving = false;
        this.stopMoving(this.state.x, newY);
      } else if(newY === 20 - WrappedBlock.height) {
        this.stopMoving(this.state.x, newY);
        moving = false;
      }
      this.setState({
        y: newY,
        moving: moving
      });
      return moving;
    }

    render() {
      return (<div className="block" style={{left: this.state.x * blockSize, top: this.state.y * blockSize}}><WrappedBlock x={this.state.x} y={this.state.y}/></div>);
    }
  };
}
