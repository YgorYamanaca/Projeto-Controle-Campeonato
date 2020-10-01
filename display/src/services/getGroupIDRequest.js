import {serverIP, serverPort} from '../config/config.js'

export default async (ChampionshipID) => {
    const response = await fetch(`http://${serverIP}:${serverPort}/campeonato/${ChampionshipID}/grupos`,{
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    }).then(r =>  r.json().then(data => ({status: r.status, body: data})));
    return response.body;
}