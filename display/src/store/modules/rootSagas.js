import { all } from 'redux-saga/effects';
import playerData from  './playerData/sagas';

export default function* rootSaga(){
    return yield all([
        playerData,
    ])
}