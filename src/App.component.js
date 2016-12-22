// @flow
import _ from 'lodash';
import React, { Component } from 'react';

import './App.css';
import walking from './walking.gif';
import npc3 from './npc-3.gif';

type Props = {
  grid: [[number]],
  interact?: boolean,
  current: { x: number, y: number },
  degree: number,
  onMove: (to: any) => any,
};

class App extends Component {
  props: Props

  timerSub: any

  componentDidMount() {
    // const move = (xStep, yStep) => {
    //   const { x, y, onMove } = this.props;
    //   onMove(x + xStep, y + yStep);
    // }

    // const filterArrow = e => /Arrow[Down|Up|Left|Right]/.test(e.key)
    // const mapToMoveArgs = e => {
    //   const r = R.always;
    //     const toMoveArgs =  R.cond([
    //       [R.equals('ArrowDown'), r([0, 1])],
    //       [R.equals('ArrowUp'), r([0, -1])],
    //       [R.equals('ArrowLeft'), r([-1, 0])],
    //       [R.equals('ArrowRight'), r([1, 0])],
    //     ])
    //     return toMoveArgs(e.key);
    // };

    // const keyDowns = Rx.Observable.fromEvent(document, 'keydown')
    //   .filter(filterArrow)
    //   .map(mapToMoveArgs);


    // const keyUps = Rx.Observable.fromEvent(document, 'keyup')
    //   .filter(filterArrow)
    //   .map(mapToMoveArgs)
    //   .map(([x, y]) => [-x, -y]);
    
    // // keyUps.subscribe(console.log)

    // const timer = Rx.Observable.interval(1000 / fps);

    // this.timerSub = timer
    //   .merge(keyUps)
    //   .merge(keyDowns)
    //   .scan(([x, y], e) => {
    //     if (!_.isArray(e)) {
    //       return [x, y];
    //     }
    //     const [xStep, yStep] = e;
    //     return [
    //       _.clamp(x + xStep, -1, 1),
    //       _.clamp(y + yStep, -1, 1),
    //     ];
    //   }, [0, 0])
    //   .map(([x, y]) => [x * step, y * step])
    //   .subscribe((args) => move(...args));
  }

  componentWillUnmount() {
    this.timerSub.unsubscribe();
  }

  render() {
    const width = 73.54;
    const height = 36.77;
    const { grid, current, onMove,interact, degree } = this.props;
    const top = current.y * height/2 + current.x * height/2 - 5;
    const left = current.y * width/2 - current.x * width/2 + 232;
    const transform = `rotateX(60deg) rotateY(0deg) rotateZ(${degree}deg)`;

    return (
      <div className="App">
        <div className="App-grid">
          { grid.map((row, i) =>
            <div className="App-grid-row" key={i}>
              { row.map((col, j) =>
                <div key={`${i}-${j}`} className={`App-grid-col App-grid-${col}`} onClick={() => onMove({ x: i, y: j})} >
                  {col > 2 && <img src={npc3} alt={`npc-${col}`}/> }
                </div> 
              )}
            </div>
          )}
        </div>
        <img src={walking} alt="walking" className="App-img-walking"
          style={{ top, left, transform }}/>
        { interact && <span>Hello</span> }
      </div>
    )
  }
}
export default App;
