import {serverIP, serverPort} from '../config/config.js'

export default async (ChampionshipID) => {
  const response = await fetch(`http://${serverIP}:${serverPort}/campeonato`,{
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({id_campeonato:ChampionshipID})}).then(r =>  r.json().then(data => ({status: r.status, body: data})));
    console.log(response)
    return response;
}