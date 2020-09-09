import { all } from 'redux-saga/effects';
import playerData from  './playerData/sagas';
import teamsData from './teamsData/sagas';
import championshipData from './championshipData/sagas';
export default function* rootSaga(){
    return yield all([
        playerData,
        teamsData,
        championshipData,
    ])
}