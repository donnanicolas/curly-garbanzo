// @flow
import _ from 'lodash';
import { handleActions } from 'redux-actions';

// export type UI = {
//     showUnauthenticatedMessage: boolean,
//     loading: boolean,
//     error: boolean
// }

type Payload = {
    x: number,
    y: number,
}

type Action = {
    type: string,
    payload: Payload,
}

const startingStatus = { x: 10, y: 10 };
export default handleActions({
    MOVE: (state, action: Action) => {
        // const { x, y } = action.payload;
        const x = _.clamp(action.payload.x, 0, 96);
        const y = _.clamp(action.payload.y, 0, 96);

        return { ...state, x, y };
    },
}, startingStatus);
