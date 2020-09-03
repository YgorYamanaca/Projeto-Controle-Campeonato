import { call, put, takeLatest, all} from 'redux-saga/effects';
import {addPlayerSuccess } from './actions';
import {removePlayerDataSuccess, editPlayerDataSuccess} from './actions';
import postPlayerData from '../../../services/postPlayerData'
import deletePlayerDate from '../../../services/deletePlayerDate'
import editPlayerData from '../../../services/editPlayerData'

function* addPlayer({playerInfo})
{
    const response = yield call(postPlayerData, playerInfo)
    if(response.status === 200)
    { 
        yield put(addPlayerSuccess(playerInfo))
    }
}

function* removePlayer({playerID})
{
    const response = yield call(deletePlayerDate, playerID)
    if(response.status === 200)
    { 
        yield put(removePlayerDataSuccess(playerID))
    }
}

function* editPlayer({player, name, tel, level, position, nick, birth})
{
    const response = yield call(editPlayerData, player, name, tel, level, position, nick, birth)
    if(response.status === 200)
    { 
        yield put(editPlayerDataSuccess(player, name, tel, level, position, nick, birth))
    }
}

export default all([
    takeLatest('ADD_PLAYER_REQUEST', addPlayer),
    takeLatest("REMOVE_PLAYER_DATA_REQUEST", removePlayer),
    takeLatest('EDIT_PLAYER_DATA_REQUEST', editPlayer)
])