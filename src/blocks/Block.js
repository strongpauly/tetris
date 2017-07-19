
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
        x: 5 - (Math.floor(this.getBounds(WrappedBlock.getCoordinates(0, 5)).width / 2)),
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
        if(!this.willCollide(WrappedBlock.getCoordinates(x, this.state.y))) {
          if(x < 0) {
            x = 0;
          }
          this.setState({
            x: x
          });
        }
      } else if(e.key === 'ArrowRight') {
        let x = this.state.x + 1;
        let blockCoords = WrappedBlock.getCoordinates(x, this.state.y);
        if(!this.willCollide(blockCoords)) {
          const maxWidth = 9 - this.getBounds(blockCoords).width;
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

    willCollide(cells) {
      return willCollide(this.props.collisionGrid, cells);
    }

    getBounds(cells) {
      let bounds = cells.reduce( (bounds, coord) => {
        return {
          minX : Math.min(bounds.minX, coord.x),
          minY : Math.min(bounds.minY, coord.y),
          maxX : Math.max(bounds.maxX, coord.x),
          maxY : Math.max(bounds.maxY, coord.y)
        };
      }, {
        minX: Number.POSITIVE_INFINITY,
        minY: Number.POSITIVE_INFINITY,
        maxX: Number.NEGATIVE_INFINITY,
        maxY: Number.NEGATIVE_INFINITY,
      });
      bounds.height = bounds.maxY - bounds.minY;
      bounds.width = bounds.maxX - bounds.minX;
      return bounds;
    }

    drop = () => {
      let newY = this.state.y + 1;
      let moving = this.state.moving;
      let blockCoords = WrappedBlock.getCoordinates(this.state.x, newY);
      let height = this.getBounds(blockCoords).height;
      if(this.willCollide(blockCoords)) {
        newY = this.state.y;
        moving = false;
        this.stopMoving(this.state.x, newY);
      } else if(newY === 19 - height) {
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
      return (<div className="block" style={{left: this.state.x * blockSize, top: this.state.y * blockSize}}>
        <WrappedBlock x={this.state.x} y={this.state.y} rotated={this.state.rotated}/>
      </div>);
    }
  };
}
