// @flow
import { createActions } from 'redux-actions';

export const {
    move,
} = createActions({
    MOVE: (x: number, y: number) => ({ x, y }),
});
