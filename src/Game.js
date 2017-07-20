import React, { Component } from 'react';

import Square from './blocks/Square';
import Line from './blocks/Line';
import Ell from './blocks/Ell';
import Rell from './blocks/Rell';
import Ess from './blocks/Ess';
import Ress from './blocks/Ress';
import Tee from './blocks/Tee';

import './Game.css';
import {connect} from 'react-redux';

//Actions
import startGame from './state/actions/startGame';
import stopGame from './state/actions/stopGame';
import blockStop from './state/actions/blockStop';
import removeLines from './state/actions/removeLines';

import willCollide from './lib/willCollide';

import PropTypes from 'prop-types';

import {blockSize, gameWidth} from './dimensions';

class Game extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    blocks: PropTypes.array,
    collisionMap: PropTypes.object,
    score: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.start();
  }

  start() {
    this.props.dispatch(startGame());
  }

  render() {
    const block = this.props.blocks[0];
    if(!block) {
      return null;
    }
    let BlockType;
    switch (block) {
      case 'SQUARE' :
        BlockType = Square;
        break;
      case 'LINE' :
        BlockType = Line;
        break;
      case 'ELL' :
        BlockType = Ell;
        break;
      case 'RELL' :
        BlockType = Rell;
        break;
      case 'ESS' :
        BlockType = Ess;
        break;
      case 'RESS' :
        BlockType = Ress;
        break;
      case 'TEE' :
        BlockType = Tee;
        break;
      default:
        return null;
    }
    return (
      <div className="game">
        <BlockType
          key={this.props.score.numBlocks /* Uniquely identify block to force redraw */}
          blockId={this.props.score.numBlocks}
          onStopMoving={this.onBlockStop}
          collisionMap={this.props.collisionMap}
        />
        {
          Object.keys(this.props.collisionMap).map( (key, index) => {
            const split = key.split(',');
            const x = Number(split[0]);
            const y = Number(split[1]);
            return <div key={index} className={'cell ' + this.props.collisionMap[key]} style={{left:x * blockSize, top: y * blockSize}}></div>;
          })
        }
      </div>
    );
  }

  onBlockStop = (cells) => {
    //If the block is stopping somewhere that is already collided - then the game is over.
    if(willCollide(this.props.collisionMap, cells)) {
      this.props.dispatch(stopGame());
    } else {
      this.props.dispatch(blockStop(cells));
      //Check for full lines.
      const lines = [];
      Object.keys(this.props.collisionMap).forEach( (key) => {
        const split = key.split(',');
        const x = Number(split[0]);
        const y = Number(split[1]);
        const line = lines[y] || (lines[y] = []);
        line[x] = y;
      });
      const fullLines = lines.filter( line => line !== undefined && line.filter( cell => cell !== undefined).length === gameWidth);
      if(fullLines.length > 0) {
        const lineNumbers = fullLines.map( line => line[0] );
        lineNumbers.sort((a, b) => a - b);
        this.props.dispatch(removeLines(lineNumbers));
      }
    }
  }
}

export default connect((state, gameProps = {}) => {
  gameProps.score = state.score;
  gameProps.blocks = state.blocks;
  gameProps.collisionMap = state.collisionMap;
  return gameProps;
})(Game);


// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
