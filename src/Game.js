import React, { Component } from 'react';
import Block from './blocks/Block';
import './Game.css';
import {connect} from 'react-redux';

//Actions
import startGame from './state/actions/startGame';
import blockStop from './state/actions/blockStop';


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
          this.props.blocks.map( (block, index) =>
            <Block key={index}
              type={block.type} x={block.x} y={block.y}
              current={index === this.props.blocks.length - 1}
              onStopMoving={this.onBlockStop}
              collisionGrid={this.props.collisionGrid}
            />
          )
        }
      </div>
    );
  }

  onBlockStop = (cells) => {
    this.props.dispatch(blockStop(cells));
  }
}

export default connect((state, gameProps = {}) => {
  gameProps.blocks = state.blocks;
  gameProps.collisionGrid = state.collisionGrid;
  return gameProps;
})(Game);


// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
