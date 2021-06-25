import React, { FormEvent, useEffect, useState } from "react";
import { api } from "../../services/api";

import "./styles.css";

interface IEvents {
  nomeevento: string;
  local: string;
  diasemana: string;
  horario: string;
  id: string;
}

function Home() {
  const [nomeevento, setName_event] = useState("");
  const [local, setLocal] = useState("");
  const [diasemana, setDia_semana] = useState("");
  const [horario, setHorario] = useState("");
  const [events, setEvents] = useState([])

  async function getEvents() {
    const { data } = await api.get("/events");
    setEvents(data)
  }
  useEffect(() => {
    getEvents();
  }, []);


  async function sendData(event: FormEvent) {
    event.preventDefault();


    await api.post("/events", {
      nomeevento: nomeevento,
      local: local,
      diasemana: diasemana,
      horario: horario
    });

    setName_event("")
    setLocal("")
    setDia_semana("")
    setHorario("")
    getEvents()
  }

  async function handleDelete(id: string) {
    await api.delete(`/events/${id}`);

    getEvents();
  }


  return (

    <div className="page">
      <form className="cadastro" onSubmit={sendData}>
        <label>Nome:</label>
        <input
          name="nome_event"
          placeholder="Digite o nome do evento"
          type="text"
          value={nomeevento}
          onChange={(event) => setName_event(event.target.value)}
        />
        <label>Local:</label>
        <input
          name="local"
          type="text"
          placeholder="Digite o local do evento"
          value={local}
          onChange={(event) => setLocal(event.target.value)}
        />
        <label>Dia da Semana:</label>
        <input
          name="dia_semana"
          type="text"
          placeholder="Digite o dia da Semana"
          value={diasemana}
          onChange={(event) => setDia_semana(event.target.value)}
        />
        <label>Horario:</label>
        <input
          name="horario"
          type="text"
          placeholder="Digite o horario"
          value={horario}
          onChange={(event) => setHorario(event.target.value)}
        />


        <button
          type="submit"
        >
          Enviar

        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Evento</th>
            <th>Local</th>
            <th>Dia Semana</th>
            <th>Horario</th>
            <th colSpan={3}>Ações</th>
          </tr>
        </thead>

        <tbody>
          {events.map((events: IEvents) => (
            <tr key={events.id}>
              <td>{events.nomeevento}</td>
              <td>{events.local}</td>
              <td>{events.diasemana}</td>
              <td>{events.horario}</td>
              <td>
                <button >Like</button>
              </td>
              <td>
                <button>Deslike</button>
              </td>
              <td>
                <button
                  className="Excluir"
                  onClick={() => handleDelete(events.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { Home };
