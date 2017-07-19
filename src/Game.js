import React, { Component } from 'react';
import Block from './blocks/Block';
import './Game.css';
import {connect} from 'react-redux';
import startGame from './state/actions/startGame';
import PropTypes from 'prop-types';

class Game extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    blocks: PropTypes.array
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
            <Block key={index} type={block.type} x={block.x} y={block.y} current={index === this.props.blocks.length - 1}/>
          )
        }
      </div>
    );
  }
}

export default connect((state, gameProps = {}) => {
  gameProps.blocks = state.blocks;
  return gameProps;
})(Game);


// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
