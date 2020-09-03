import produce from 'immer';
const initialState = [];
export default function teamsData(state = initialState, action)
{
    switch (action.type) {
        case 'ADD_TEAM_SUCCESS':
            return produce(state, draft => {
                draft.push(action.teamInfo)
            })
        case 'ADD_TEAMS_DATA':
            return action.teamsInfo
        case 'REMOVE_TEAM_DATA_SUCCESS':
            return produce(state, draft => {
                return draft.filter(team=> team.id_time !== action.teamID)
            })
        case 'EDIT_TEAM_SUCCESS':
            return produce(state, draft => {
                let index = state.findIndex(element => element.id_time === action.team.id_time);
                if(action.name || action.nivel)
                {
                    draft[index].nome = action.name? action.name :action.team.nome
                    draft[index].nivel = action.nivel? action.nivel.value :action.team.nivel
                }
            })
        default:
            return state;
    }
}