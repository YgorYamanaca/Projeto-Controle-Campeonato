import produce from 'immer';
const initialState = {data:[], userMessage:{message:"", status:""}};
export default function teamsData(state = initialState, action)
{
    console.log(action);
        switch (action.type) {
        case 'ADD_TEAM_SUCCESS':
            return produce(state, draft => {
                draft.data.push(action.teamInfo)
            })
        case 'ADD_TEAMS_DATA':
            return produce(state, draft=> {
                draft.data = action.teamsInfo;
                draft.userMessage.status = "Success";
                draft.userMessage.message = "Dados recebidos com sucesso.";
           })

        case 'REMOVE_TEAM_DATA_SUCCESS':
            return produce(state, draft => {
                draft.data = draft.data.filter(team=> team.id_time !== action.teamID)
            })
        case 'EDIT_TEAM_SUCCESS':
            return produce(state, draft => {
                let index = state.data.findIndex(element => element.id_time === action.team.id_time);
                if(action.name || action.nivel)
                {
                    draft.data[index].nome = action.name? action.name :action.team.nome
                    draft.data[index].nivel = action.nivel? action.nivel.value :action.team.nivel
                }
            })
        default:
            return state;
    }
}