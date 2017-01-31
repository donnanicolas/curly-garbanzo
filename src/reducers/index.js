import { combineReducers } from 'redux';

import grid from './grid';

const gameApp = combineReducers({
    grid,
});

export default gameApp;
