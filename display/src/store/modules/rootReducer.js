import { combineReducers } from 'redux';
import playerData from './playerData/reducer'
import teamsData from './teamsData/reducer'

export default combineReducers({
    playerData,
    teamsData
})