import React, { Component } from 'react';
import Game from './components/Game/index';

class App extends Component {
  render() {
      return <div>
          <h1>Fifteen</h1>
          <Game />
      </div>
  }
}

export default App;
