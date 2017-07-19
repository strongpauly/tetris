import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from './state/store';
import './App.css';
import Game from './Game';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Game />
        </div>
      </Provider>
    );
  }
}

export default App;
