import produce from 'immer';
const initialState = {data:[], userMessage:{message:"", status:""}};

export default function championshipData(state = initialState, action)
{
    console.log(action)
    switch (action.type) {
        case 'ADD_CHAMPIONSHIP_SUCCESS':
            return produce(state, draft => {
                draft.data.push(action.championshipInfo)
            })
        case 'ADD_MULTICHAMPIONSHIP': 
            return produce(state, draft => {
                draft.data = action.championshipInfos
                draft.userMessage.status = "Success";
                draft.userMessage.message = "Dados recebidos com sucesso.";
            })
        default:
            return state;
    }
}
