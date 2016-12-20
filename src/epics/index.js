// @flow

import { combineEpics } from 'redux-observable';
import moveEpic from './move';

const epics = combineEpics(
    moveEpic
)

export default epics;