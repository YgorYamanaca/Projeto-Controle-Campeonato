import { call, put, takeLatest, all} from 'redux-saga/effects';
import {addChampionshipSuccess, editChampionShipSuccess} from './actions';
import postChampionshipData from '../../../services/postChampionshipData';
import editChampionshipData from  '../../../services/editChampionshipData';
function* addChampionship({championshipInfo})
{
    const response = yield call(postChampionshipData, championshipInfo)
    if(response.status === 200)
    { 
        yield put(addChampionshipSuccess(response.body))
    }
}

function* editChampionship({row, nome, inicio, fim})
{
    const response = yield call(editChampionshipData, row, nome, inicio, fim)
    console.log(response)
    if(response.status === 200)
    { 
        yield put(editChampionShipSuccess(response.body))
    }
}

export default all([
    takeLatest('ADD_CHAMPIONSHIP_REQUEST', addChampionship),
    takeLatest('EDIT_CHAMPIONSHIP_REQUEST', editChampionship)
])