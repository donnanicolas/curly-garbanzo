// @flow
import _ from 'lodash';
import Rx from 'rxjs/Rx';
import { Graph, astar } from 'javascript-astar';
import { move } from '../actions/movement';

console.log(astar);

// const easystar = new EasyStar.js();
// easystar.enableDiagonals();
// easystar.setAcceptableTiles([0]);

// const findPath = (startX, startY, endX, endY, callback) => {
//   easystar.findPath(startX, startY, endX, endY, callback);
//   easystar.calculate();
// };

// const findPathObservable = Rx.Observable.bindCallback(findPath);

const moveEpic = (action$: any, { getState, dispatch }: any) =>
  action$.ofType('GOTO')
    .mergeMap(action => {
      const state = getState();

      const { x: fromX, y: fromY } = state.grid.current;
      const { x: toX, y: toY } = action.payload.to;
      const graph = new Graph(state.grid.grid, { diagonal: true });
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