// @flow
import _ from 'lodash';
import React, { Component } from 'react';

import './App.css';
import npc3 from './npc-3.gif';

type Props = {
  grid: [[number]],
  interact?: boolean,
  current: { x: number, y: number },
  backgroundPosition: number,
  onMove: (to: any) => any,
};

class App extends Component {
  props: Props

  render() {
    const width = 73.54;
    const height = 36.77;
    const { grid, current, onMove,interact, backgroundPosition } = this.props;
    const top = current.y * height/2 + current.x * height/2 - 23;
    const left = current.y * width/2 - current.x * width/2 + 244;

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
        <div className="App-img-walking"
          style={{ top, left, backgroundPosition }}
          ></div>
        { interact && <span>Hello</span> }
      </div>
    )
  }
}
        // <img src={walking} alt="walking" className="App-img-walking"
        //   style={{ top, left, transform }}/>
export default App;
