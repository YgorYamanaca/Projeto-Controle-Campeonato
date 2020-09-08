import {serverIP, serverPort} from '../config/config.js'

export default async (team, name, nivel) => {
  console.log(team.nome, name)
  console.log("body", name? name : team.nome, nivel? nivel.value : team.nivel)
  const response = await fetch(`http://${serverIP}:${serverPort}/time/`,{
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({id_time:team.id_time, nome:name? name : team.nome, nivel:nivel? nivel.value : team.nivel})}).then(r =>  r.json().then(data => ({status: r.status, body: data})));
  return response;
}