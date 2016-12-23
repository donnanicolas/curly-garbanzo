// @flow
import _ from 'lodash';
import R from 'ramda';
import { handleActions } from 'redux-actions';

type Grid = [[number]];

type Position = {
    x: number,
    y: number
}

type State = {
    grid: Grid,
    current: Position,
    goingTo?: Position,
    interact?: boolean,
    backgroundPosition: number
};

type Payload = {
    to: Position,
};

type Action = {
    payload: Payload,
};

const current: Position = { x: 0, y: 0 } 

const grid = [
    [2, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 3000, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
];

const bigIfNotZero: (a: number) => number = R.ifElse(
    R.equals(0),
    R.always(100000),
    R.identity
)

const getActualTo = (grid: Grid, current: Position, to: Position) => {
    const gridTo = grid[to.x][to.y];

    if (gridTo <= 2) {
        return to;
    }

    const xDiff = bigIfNotZero(current.x - to.x);
    const yDiff = bigIfNotZero(current.y - to.y);
    return Math.abs(xDiff) < Math.abs(yDiff)
        ? Object.assign({}, to, { x: to.x + Math.sign(xDiff) })
        : Object.assign({}, to, { y: to.y + Math.sign(yDiff) })
}

const moveTo = (state: State, action: Action): { grid: Grid, to: Position, interact: boolean, backgroundPosition: number } => {
    const { current, grid } = _.clone(state);
    const { to } = action.payload;

    grid[current.x][current.y] = 1
    const xDiff = current.x - to.x;
    const yDiff = current.y - to.y;

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
        // [R.T, a(0)],
    ])([xDiff, yDiff]);

    const actualTo = getActualTo(grid, current, to);

    grid[actualTo.x][actualTo.y] = 2;
    return { grid, to: actualTo, interact: !_.isEqual(to, actualTo), backgroundPosition };
}

const startingStatus = { grid, current, goingTo: null, backgroundPosition: 0 };
export default handleActions({
    MOVE: (state: State, action: Action) => {
        const { grid, to, interact, backgroundPosition } = moveTo(state, action);
        const goingTo = !_.isEqual(state.goingTo, to)
            ? state.goingTo
            : null;
        return Object.assign({}, state, { grid, current: to, goingTo, interact, backgroundPosition });
    },
    GOTO: (state: State, action: Action) => {
        const { to } = action.payload;
        const val = state.grid[to.x][to.y];
        return val !== 0
            ? Object.assign({}, state, { goingTo: action.payload.to })
            : state;
    },
}, startingStatus);
