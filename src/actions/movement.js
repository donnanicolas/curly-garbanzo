// @flow
import { createActions } from 'redux-actions';

export const {
    move,
    goto,
    stop
} = createActions({
    MOVE: (to: any) => ({ to }),
    GOTO: (to: any) => ({ to }),
});
