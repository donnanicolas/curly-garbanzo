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
    degree: number
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

const zeroToOne = z => z === 0 ? 1 : 0;
const onlyPos = n => n > 0 ? n : 0;
const onlyNeg = n => n < 0 ? n : 0;

const moveTo = (state: State, action: Action): { grid: Grid, to: Position, interact: boolean, degree: number } => {
    const { current, grid } = _.clone(state);
    const { to } = action.payload;

    grid[current.x][current.y] = 1
    const xDiff = current.x - to.x;
    const yDiff = current.y - to.y;

    console.log(xDiff, yDiff);
    const degree = 0
        + xDiff * -45
        + yDiff * -45
        - zeroToOne(xDiff) * onlyPos(yDiff) * 90 
        - zeroToOne(yDiff) * onlyNeg(xDiff) * 90
        + onlyNeg(xDiff) * onlyPos(yDiff) * 180; 

    const actualTo = getActualTo(grid, current, to);

    grid[actualTo.x][actualTo.y] = 2;
    return { grid, to: actualTo, interact: !_.isEqual(to, actualTo), degree };
}

const startingStatus = { grid, current, goingTo: null, degree: 45 };
export default handleActions({
    MOVE: (state: State, action: Action) => {
        const { grid, to, interact, degree } = moveTo(state, action);
        const goingTo = !_.isEqual(state.goingTo, to)
            ? state.goingTo
            : null;
        return Object.assign({}, state, { grid, current: to, goingTo, interact, degree });
    },
    GOTO: (state: State, action: Action) => {
        const { to } = action.payload;
        const val = state.grid[to.x][to.y];
        return val !== 0
            ? Object.assign({}, state, { goingTo: action.payload.to })
            : state;
    },
}, startingStatus);
