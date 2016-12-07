import R from 'ramda';
import React, { Component } from 'react';
import keymaster from 'keymaster';

import './App.css';

const step = 3;

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
    keymaster('up', move(0, -step));
    keymaster('right', move(step, 0));
    keymaster('down', move(0, step));
    keymaster('left', move(-step, 0));    
  }

  componentWillUnmount() {
    keymaster.unbind('down, up, left, right');
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
