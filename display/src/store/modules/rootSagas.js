import { all } from 'redux-saga/effects';
import playerData from  './playerData/sagas';
import teamsData from './teamsData/sagas';

export default function* rootSaga(){
    return yield all([
        playerData,
        teamsData
    ])
}