import {serverIP, serverPort} from '../config/config.js'

export default async (row, nome, inicio, fim) => {
    let [dayI, monthI, yearI] = inicio.split("/");
    let [dayF, monthF, yearF] = fim.split("/");
    const response = await fetch(`http://${serverIP}:${serverPort}/campeonato/`,{
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
          id_campeonato:row.id_campeonato,
          nome:nome? nome : row.nome,
          dt_inicio:inicio? new Date(yearI, monthI - 1, dayI) : row.dt_inicio,
          dt_fim:fim? new Date(yearF, monthF - 1, dayF) : row.dt_fim
      })}).then(r =>  r.json().then(data => ({status: r.status, body: data})));
    return response;
  }