import { combineReducers } from 'redux'

import position from './position'

// export type State = {
//     auth: Auth,
//     ui: UI
// }

const gameApp = combineReducers({
    position,
});

export default gameApp;
