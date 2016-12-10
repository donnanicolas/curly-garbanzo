import R from 'ramda';
import React, { Component } from 'react';

import keyManager from './libs/keyManager';

import './App.css';

const step = 3;
let keyListener;

type Props = {
  x: number,
  y: number,
  onMove: (x: number, y: number) => any,
};

class App extends Component {
  props: Props

  componentDidMount() {
    const move = (xStep, yStep) => () => {
      const { x, y, onMove } = this.props;
      onMove(x + xStep, y + yStep);
    }

    keyListener = keyManager({
      up: move(0, -step),
      down: move(0, step),
      right: move(step, 0),
      left: move(-step, 0),
      upLeft: move(-step, -step),
      upRight: move(step, -step),
      downLeft: move(-step, step),
      downRight: move(step, step)
    });
  }

  componentWillUnmount() {
    keyListener.unsubscribe();
  }

  render() {
    const { x, y } = this.props;
    return (
      <div className="App">
        <div className="App-dot" style={{ top: y, left: x }}></div>
      </div>
    )

  }
}

export default App;
