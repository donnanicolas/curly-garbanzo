// @flow
import _ from 'lodash';
import R from 'ramda';
import React, { Component } from 'react';
import Rx from 'rxjs';

import './App.css';

const step = 2;
const fps = 60;

type Props = {
  x: number,
  y: number,
  onMove: (x: number, y: number) => any,
};

class App extends Component {
  props: Props

  timerSub: any

  componentDidMount() {
    const move = (xStep, yStep) => {
      const { x, y, onMove } = this.props;
      onMove(x + xStep, y + yStep);
    }

    const filterArrow = e => /Arrow[Down|Up|Left|Right]/.test(e.key)
    const mapToMoveArgs = e => {
      const r = R.always;
        const toMoveArgs =  R.cond([
          [R.equals('ArrowDown'), r([0, 1])],
          [R.equals('ArrowUp'), r([0, -1])],
          [R.equals('ArrowLeft'), r([-1, 0])],
          [R.equals('ArrowRight'), r([1, 0])],
        ])
        return toMoveArgs(e.key);
    };

    const keyDowns = Rx.Observable.fromEvent(document, 'keydown')
      .filter(filterArrow)
      .map(mapToMoveArgs);


    const keyUps = Rx.Observable.fromEvent(document, 'keyup')
      .filter(filterArrow)
      .map(mapToMoveArgs)
      .map(([x, y]) => [-x, -y]);
    
    // keyUps.subscribe(console.log)

    const timer = Rx.Observable.interval(1000 / fps);

    this.timerSub = timer
      .merge(keyUps)
      .merge(keyDowns)
      .scan(([x, y], e) => {
        if (!_.isArray(e)) {
          return [x, y];
        }
        const [xStep, yStep] = e;
        return [
          _.clamp(x + xStep, -1, 1),
          _.clamp(y + yStep, -1, 1),
        ];
      }, [0, 0])
      .map(([x, y]) => [x * step, y * step])
      .subscribe((args) => move(...args));
  }

  componentWillUnmount() {
    this.timerSub.unsubscribe();
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
