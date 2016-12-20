// @flow
import _ from 'lodash';
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
};

type Payload = {
    to: Position,
};

type Action = {
    payload: Payload,
};

const current: Position = { x: 0, y: 0 } 

const grid = [
    [2, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
];

const moveTo = (state: State, action: Action): Grid => {
    const { current, grid } = _.clone(state);
    const { to } = action.payload;
    grid[current.x][current.y] = 1;
    grid[to.x][to.y] = 2;
    return grid;
}

const startingStatus = { grid, current, goingTo: null };
export default handleActions({
    MOVE: (state: State, action: Action) => {
        const grid = moveTo(state, action);
        const { to } = action.payload;
        const goingTo = !_.isEqual(state.goingTo, to)
            ? state.goingTo
            : null;
        return Object.assign({}, state, { grid, current: to, goingTo });
    },
    GOTO: (state: State, action: Action) => {
        return Object.assign({}, state, { goingTo: action.payload.to });
    },
}, startingStatus);
