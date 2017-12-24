
import React, { Component } from 'react';

import './Block.css';
import PropTypes from 'prop-types';

import willCollide from '../lib/willCollide';

import {blockSize, gameWidth, gameHeight} from '../dimensions';

export default function(getCoordinates, orientations, cellClassName) {
  return class Block extends Component {

    static propTypes = {
      blockId: PropTypes.number,
      onStopMoving: PropTypes.func,
      collisionMap: PropTypes.object,
      level: PropTypes.number,
      moving: PropTypes.bool
    }

    constructor(props) {
      super(props);
      let orientation = orientations[0];
      this.state = {
        x: 5 - (Math.floor(this.getBounds(getCoordinates(0, 5, orientation)).width / 2)),
        y: 0,
        moving: this.props.moving,
        orientation: orientation,
        animated: PropTypes.bool
      };
    }

    componentWillMount() {
      if(this.state.moving) {
        this.startMoving();
      }
    }

    componentWillUnmount() {
      this.tidy();
    }

    startMoving() {
      this.dropInterval = setInterval(this.drop, 1100 - this.props.level * 100);
      document.addEventListener('keydown', this.onKeyDown);
    }

    tidy() {
      if(this.dropInterval !== undefined) {
        clearInterval(this.dropInterval);
        delete this.dropInterval;
      }
      document.removeEventListener('keydown', this.onKeyDown);
    }

    stopMoving(x, y) {
      this.tidy();
      if(this.props.onStopMoving !== undefined) {
        this.props.onStopMoving(getCoordinates(x, y, this.state.orientation).map(coord => ({x: coord.x, y: coord.y, className: cellClassName})));
      }
    }

    onKeyDown = (e) => {
      if(e.key === 'ArrowUp') {
        this.rotate();
      } else if(e.key === 'ArrowDown') {
        this.drop();
      } else if(e.key === 'ArrowLeft') {
        this.moveLeft();
      } else if(e.key === 'ArrowRight') {
        this.moveRight();
      } else if (e.code === 'Space'){
        this.place();
      }
    }

    willCollide(cells) {
      return willCollide(this.props.collisionMap, cells);
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

    rotate() {
      let newOrientation = orientations[(orientations.indexOf(this.state.orientation) + 1) % orientations.length];
      let blockCoords = getCoordinates(this.state.x, this.state.y, newOrientation);
      let bounds = this.getBounds(blockCoords);
      const newState = {orientation: newOrientation, animated:true};
      if(bounds.minX < 0) {
        blockCoords = getCoordinates(-bounds.minX, this.state.y, newOrientation);
        newState.x = -bounds.minX;
        newState.animated = false;
        bounds = this.getBounds(blockCoords, bounds);
      }
      const maxX = gameWidth - 1;
      if(bounds.maxX > maxX) {
        blockCoords = getCoordinates(newState.x = this.state.x - (bounds.maxX - maxX), this.state.y, newOrientation);
        newState.animated = false;
        bounds = this.getBounds(blockCoords);
      }
      if(!this.willCollide(blockCoords) && bounds.minX >= 0 && bounds.maxX <= maxX) {
        this.setState(newState);
      }
    }

    place() {
      this.tidy();
      let moving = this.state.moving;
      while(moving) {
        moving = this.drop();
      }
    }

    drop = () => {
      let newY = this.state.y + 1;
      let moving = this.state.moving;
      let blockCoords = getCoordinates(this.state.x, newY, this.state.orientation);
      let bounds = this.getBounds(blockCoords);
      if(this.willCollide(blockCoords)) {
        newY = this.state.y;
        moving = false;
        this.stopMoving(this.state.x, newY);
      } else if(bounds.maxY === gameHeight) {
        this.stopMoving(this.state.x, newY - 1);
        moving = false;
      }
      if(moving) {
        this.setState({
          y: newY,
          moving: moving,
          animated: true
        });
      }
      return moving;
    }

    getCollideY() {
      let collideY = this.state.y + 1;
      let blockCoords = getCoordinates(this.state.x, collideY, this.state.orientation);
      let bounds = this.getBounds(blockCoords);
      while (!this.willCollide(blockCoords) && bounds.maxY < gameHeight) {
        collideY++;
        blockCoords = getCoordinates(this.state.x, collideY, this.state.orientation);
        bounds = this.getBounds(blockCoords);
      }
      return collideY - 1;
    }

    moveLeft () {
      let x = this.state.x - 1;
      let blockCoords = getCoordinates(x, this.state.y, this.state.orientation);
      if(!this.willCollide(blockCoords) && this.getBounds(blockCoords).minX >= 0) {
        this.setState({
          x: x,
          animated: true
        });
      }
    }

    moveRight() {
      let x = this.state.x + 1;
      let blockCoords = getCoordinates(x, this.state.y, this.state.orientation);
      if(!this.willCollide(blockCoords) && this.getBounds(blockCoords).maxX < gameWidth) {
        this.setState({
          x: x,
          animated: true
        });
      }
    }

    render() {
      const style = {};
      const className = 'block' + (this.state.animated ? ' animated' : '');
      const coords = getCoordinates(0, 0, this.state.orientation);
      const elements = [];
      if (this.state.moving) {
        style.left = this.state.x * blockSize;
        style.top = this.state.y * blockSize;
        const collideY = this.getCollideY();
        elements.push(<div key="shadow" className="shadow" style={{left: style.left, top: (collideY * blockSize)}}>
        {
          coords.map( (coord, index) =>
            <div key={index} className={'cell'} style={{left:coord.x * blockSize, top: coord.y * blockSize}}/>
          )
        }
        </div>);
      }
      elements.push(<div key="block" className={className} style={style}>{
        coords.map( (coord, index) =>
          <div key={index} className={'cell ' + cellClassName} style={{left:coord.x * blockSize, top: coord.y * blockSize}}/>
        )
      }
      </div>)
      return <div>{elements}</div>
    }
  };
}
