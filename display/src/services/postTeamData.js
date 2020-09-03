import {serverIP, serverPort} from '../config/config.js'

export default async (teamData) => {
  const response = await fetch(`http://${serverIP}:${serverPort}/time`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(teamData)}).then(r =>  r.json().then(data => ({status: r.status, body: data})));
  return response;
}