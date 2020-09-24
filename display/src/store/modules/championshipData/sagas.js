import { call, put, takeLatest, all} from 'redux-saga/effects';
import {addChampionshipSuccess, editChampionShipSuccess, removeChampionshipDataSuccess} from './actions';
import postChampionshipData from '../../../services/postChampionshipData';
import editChampionshipData from  '../../../services/editChampionshipData';
import deleteChampionshipdata from '../../../services/deleteChampionshipData';

function* addChampionship({championshipInfo})
{
    const response = yield call(postChampionshipData, championshipInfo)
    console.log(response)
    if(response.status === 200)
    {
        yield put(addChampionshipSuccess(response.body))
    }
}

function* editChampionship({row, nome, inicio, fim})
{
    const response = yield call(editChampionshipData, row, nome, inicio, fim)
    if(response.status === 200)
    { 
        yield put(editChampionShipSuccess(response.body))
    }
}

function* removeChampionship({championshipInfosID})
{
    const response = yield call(deleteChampionshipdata, championshipInfosID)
    if(response.status === 200)
    { 
        yield put(removeChampionshipDataSuccess(championshipInfosID))
    }
}

export default all([
    takeLatest('ADD_CHAMPIONSHIP_REQUEST', addChampionship),
    takeLatest('EDIT_CHAMPIONSHIP_REQUEST', editChampionship),
    takeLatest('REMOVE_CHAMPIONSHIP_DATA_REQUEST', removeChampionship)
])