import React, { Component } from 'react';

import Square from './blocks/Square';
import Line from './blocks/Line';

import './Game.css';
import {connect} from 'react-redux';

//Actions
import startGame from './state/actions/startGame';
import stopGame from './state/actions/stopGame';
import blockStop from './state/actions/blockStop';

import willCollide from './lib/willCollide';

import PropTypes from 'prop-types';

class Game extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    blocks: PropTypes.array,
    collisionGrid: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.start();
  }

  start() {
    this.props.dispatch(startGame());
  }

  render() {
    return (
      <div className="game">
        {
          this.props.blocks.map( (block, index) => {
            let BlockType;
            switch (block.type) {
              case 'SQUARE' :
                BlockType = Square;
                break;
              default:
              case 'LINE' :
                BlockType = Line;
                break;
            }
            return <BlockType key={index}
              type={block.type} x={block.x} y={block.y}
              current={index === this.props.blocks.length - 1}
              onStopMoving={this.onBlockStop}
              collisionGrid={this.props.collisionGrid}
            />;
          })
        }
      </div>
    );
  }

  onBlockStop = (cells) => {
    //If the block is stopping somewhere that is already collided - then the game is over.
    if(willCollide(this.props.collisionGrid, cells)) {
      this.props.dispatch(stopGame());
    } else {
      this.props.dispatch(blockStop(cells));
    }

  }
}

export default connect((state, gameProps = {}) => {
  gameProps.blocks = state.blocks;
  gameProps.collisionGrid = state.collisionGrid;
  return gameProps;
})(Game);


// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
