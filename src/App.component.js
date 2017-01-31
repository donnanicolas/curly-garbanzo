// @flow
import type { Grid, Position, Direction, Tile } from './types.js';

import _ from 'lodash';
import R from 'ramda';
import React, { Component } from 'react';

import './App.css';

type Props = {
  grid: Grid,
  interact?: boolean,
  current: Position,
  direction: Direction,
  onMove: (to: any) => any,
};

class App extends Component {
  props: Props

  render() {
    const width = 73.54;
    const height = 36.77;
    const { grid, current, onMove,interact, direction } = this.props;
    const top = current.y * height/2 + current.x * height/2 - 23;
    const left = current.y * width/2 - current.x * width/2 + 244;

    const equals = ([dstX, dstY]) => ([srcX, srcY]) => dstX === srcX && dstY === srcY;
    const a = R.always;

    const backgroundPosition = R.cond([
        [equals([0, -1]), a(30)],
        [equals([0, 1]), a(-95)],
        [equals([-1, 0]), a(-30)],
        [equals([1, 0]), a(95)],
        [equals([1, 1]), a(129)],
        [equals([-1, 1]), a(-65)],
        [equals([1, -1]), a(65)],
        [equals([-1, -1]), a(0)],
        [R.T, a(0)],
    ])([direction.x, direction.y]);

    const getTileId = (col: Tile) => {
      if (col.content) {
        return col.content.id;
      }
      return col.weight === 0
        ? 'blocked'
        : 'empty';
    };

    return (
      <div className="App">
        <div className="App-grid">
          { grid.map((row, i) =>
            <div className="App-grid-row" key={i}>
              { row.map((tile, j) =>
                <div key={`${i}-${j}`} className={`App-grid-col App-grid-${getTileId(tile)}`} onClick={() => onMove({ x: i, y: j})} >
                  {tile.content && <img src={`/images/npc-${tile.content.id}.gif`} alt={`npc-${tile.content.id}`}/> }
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
