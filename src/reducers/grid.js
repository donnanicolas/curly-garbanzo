// @flow
import type { Grid, Position, Direction, Action } from '../types.js';

import _ from 'lodash';
import R from 'ramda';
import { handleActions } from 'redux-actions';

type State = {
    grid: Grid,
    current: Position,
    goingTo?: Position,
    interact?: boolean,
    direction: Direction,
    npc?: boolean,
};

type Payload = {
    to: Position,
};

type GridAction = Action<Payload, null>;

const current: Position = { x: 0, y: 0 } 

const emptyTile = { weight: 1 };
const blockedTile = { weight: 0 };

const NPC = {
    id: 3,
    direction: { x: 1, y: 1 },
};

const mainTile = Object.assign({}, { hasMain: true });
const npcTile = Object.assign({}, { content: NPC, weight: 0, npc: true });

const grid = [
    [mainTile, emptyTile, emptyTile, emptyTile, emptyTile, blockedTile, emptyTile],
    [emptyTile, emptyTile, emptyTile, emptyTile, emptyTile, blockedTile, blockedTile],
    [emptyTile, emptyTile, emptyTile, emptyTile, emptyTile, emptyTile, emptyTile],
    [emptyTile, emptyTile, emptyTile, npcTile, emptyTile, emptyTile, emptyTile],
    [emptyTile, emptyTile, emptyTile, emptyTile, emptyTile, emptyTile, emptyTile],
    [emptyTile, emptyTile, emptyTile, emptyTile, emptyTile, emptyTile, emptyTile],
    [emptyTile, emptyTile, emptyTile, emptyTile, emptyTile, emptyTile, emptyTile],
];

const bigIfNotZero: (a: number) => number = R.ifElse(
    R.equals(0),
    R.always(100000),
    R.identity
)

const getActualTo = (grid: Grid, current: Position, to: Position) => {
    const gridTo = grid[to.x][to.y];

    if (!gridTo.content) {
        return to;
    }

    const xDiff = bigIfNotZero(current.x - to.x);
    const yDiff = bigIfNotZero(current.y - to.y);
    return Math.abs(xDiff) < Math.abs(yDiff)
        ? Object.assign({}, to, { x: to.x + Math.sign(xDiff) })
        : Object.assign({}, to, { y: to.y + Math.sign(yDiff) })
}

const moveTo = (state: State, action: GridAction): { grid: Grid, to: Position, interact: boolean, direction: Direction } => {
    const { current, grid } = _.clone(state);
    const { to } = action.payload;

    grid[current.x][current.y] = emptyTile;
    const xDiff = current.x - to.x;
    const yDiff = current.y - to.y;

    const actualTo = getActualTo(grid, current, to);

    grid[actualTo.x][actualTo.y] = mainTile;
    return { grid, to: actualTo, interact: !_.isEqual(to, actualTo), direction: { x: xDiff, y: yDiff} };
}

const startingStatus: State = { grid, current, direction: { x: 1, y: 1 } };
export default handleActions({
    MOVE: (state: State, action: GridAction) => {
        const { grid, to, interact, direction } = moveTo(state, action);
        const goingTo = !_.isEqual(state.goingTo, to)
            ? state.goingTo
            : null;
        return Object.assign({}, state, { grid, current: to, goingTo, interact, direction });
    },
    GOTO: (state: State, action: GridAction) => {
        const { to } = action.payload;
        const val = state.grid[to.x][to.y];
        if (val.npc) {
            const actualTo = getActualTo(state.grid, state.current, to);
            return Object.assign({}, state, { goingTo: actualTo })
        }
        return val.weight !== 0
            ? Object.assign({}, state, { goingTo: action.payload.to })
            : state;
    },
}, startingStatus);
