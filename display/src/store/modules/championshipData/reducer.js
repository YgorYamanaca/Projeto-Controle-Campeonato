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
        case 'EDIT_CHAMPIONSHIP_SUCCESS':
            return produce(state, draft => {
                let index = state.data.findIndex(element => element.id_campeonato === action.championShip.id_campeonato);
                draft.data[index].nome = action.championShip.nome
                draft.data[index].dt_inicio = action.championShip.dt_inicio
                draft.data[index].dt_fim = action.championShip.dt_fim
                
            })
        case 'REMOVE_CHAMPIONSHIP_DATA_REQUEST':
            return produce(state, draft => {
            draft.data = draft.data.filter(champ=> champ.id_campeonato !==action.championshipInfosID)
        })
        default:
            return state;
    }
}
