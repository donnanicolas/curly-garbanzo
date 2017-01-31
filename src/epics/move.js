// @flow
import _ from 'lodash';
import Rx from 'rxjs/Rx';
import { Graph, astar } from 'javascript-astar';
import { move } from '../actions/movement';

const moveEpic = (action$: any, { getState, dispatch }: any) =>
  action$.ofType('GOTO')
    .mergeMap(action => {
      const state = getState();

      const weightGrid = state.grid.grid.map(col => 
        col.map(tile => tile.weight)
      );

      const { x: fromX, y: fromY } = state.grid.current;
      const { x: toX, y: toY } = state.grid.goingTo;
      const graph = new Graph(weightGrid, { diagonal: true });
      const start = graph.grid[fromX][fromY];
      const end = graph.grid[toX][toY];
      const movements = astar.search(graph, start, end);

      return Rx.Observable.interval(1000 / 10)
        .take(movements.length)
        .map((_, i) => movements[i])
        .takeUntil(action$.ofType('GOTO'))
        .map(val => ({ x: val.x, y: val.y }))
        .map(val => move(val));
    })


export default moveEpic;