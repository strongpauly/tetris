
import React, { Component } from 'react';

import './Block.css';
import PropTypes from 'prop-types';

import willCollide from '../lib/willCollide';

const blockSize = 25;

export default function(getCoordinates, orientations, cellClassName) {
  return class Block extends Component {

    static propTypes = {
      type: PropTypes.string,
      onStopMoving: PropTypes.func,
      collisionGrid: PropTypes.array
    }

    constructor(props) {
      super(props);
      let orientation = orientations[0];
      this.state = {
        x: 5 - (Math.floor(this.getBounds(getCoordinates(0, 5, orientation)).width / 2)),
        y: 0,
        moving: true,
        orientation: orientation
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
        this.props.onStopMoving(getCoordinates(x, y, this.state.orientation));
      }
    }

    onKeyDown = (e) => {
      if(e.key === 'ArrowUp') {
        let newOrientation = orientations[(orientations.indexOf(this.state.orientation) + 1) % orientations.length];
        let blockCoords = getCoordinates(this.state.x, this.state.y, newOrientation);
        let bounds = this.getBounds(blockCoords);
        if(!this.willCollide(blockCoords) && bounds.minX > 0 && bounds.maxX < 9) {
          this.setState({orientation: newOrientation});
        }
      } else if(e.key === 'ArrowDown') {
        this.drop();
      } else if(e.key === 'ArrowLeft') {
        let x = this.state.x - 1;
        if(!this.willCollide(getCoordinates(x, this.state.y, this.state.orientation))) {
          if(x < 0) {
            x = 0;
          }
          this.setState({
            x: x
          });
        }
      } else if(e.key === 'ArrowRight') {
        let x = this.state.x + 1;
        let blockCoords = getCoordinates(x, this.state.y, this.state.orientation);
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
      let blockCoords = getCoordinates(this.state.x, newY, this.state.orientation);
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
      return (<div className="block" style={{left: this.state.x * blockSize, top: this.state.y * blockSize}}>{
        getCoordinates(0, 0, this.state.orientation).map( (coord, index) =>
          <div key={index} className={'cell ' + cellClassName} style={{left:coord.x * blockSize, top: coord.y * blockSize}}/>
        )
      }
      </div>);
    }
  };
}
