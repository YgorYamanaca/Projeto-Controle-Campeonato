import {serverIP, serverPort} from '../config/config.js'

export default async (championshipInfo) => {
  const response = await fetch(`http://${serverIP}:${serverPort}/campeonato`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(championshipInfo)}).then(r =>  r.json().then(data => ({status: r.status, body: data})));
    return response;
}