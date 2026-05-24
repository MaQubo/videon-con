"use client";

import { useState } from "react";

const TOPICS = [
  "Aparece un auto rojo",
  "Alguien usa gafas oscuras",
  "Hay una escena en una playa",
  "Aparece una piscina",
  "Alguien rompe un objeto",
  "Alguien canta dentro de un auto",
  "Aparece fuego o llamas",
  "Se ve una motocicleta",
  "Alguien lleva chaqueta de cuero",
  "Hay una escena bajo la lluvia",
  "Aparece una televisión dentro del videoclip",
  "Alguien mira por una ventana",
  "Aparece una estatua",
  "Hay humo o niebla artificial",
  "Alguien usa sombrero",
  "Aparece un perro",
  "Hay una fiesta o discoteca",
  "Aparece dinero",
  "Alguien está llorando",
  "Se ve una escalera",
];

function randomTopic(used) {
  const available = TOPICS.filter((_, i) => !used.includes(i));
  if (available.length === 0) return { topic: "No quedan tópicos nuevos", index: -1 };
  const index = TOPICS.findIndex(t => t === available[Math.floor(Math.random() * available.length)]);
  return { topic: TOPICS[index], index };
}

export default function Home() {
  const [names, setNames] = useState(["Jugador 1", "Jugador 2"]);
  const [players, setPlayers] = useState([]);
  const [started, setStarted] = useState(false);
  const [turn, setTurn] = useState(0);
  const [topic, setTopic] = useState("");
  const [used, setUsed] = useState([]);
  const [winner, setWinner] = useState(null);

  function addPlayer() {
    if (names.length < 10) setNames([...names, `Jugador ${names.length + 1}`]);
  }

  function removePlayer(i) {
    if (names.length > 2) setNames(names.filter((_, index) => index !== i));
  }

  function startGame() {
    const clean = names.map((n, i) => n.trim() || `Jugador ${i + 1}`);
    setPlayers(clean.map(name => ({ name, alive: true })));
    const first = randomTopic([]);
    setTopic(first.topic);
    setUsed([first.index]);
    setStarted(true);
  }

  function nextAliveIndex(list, current) {
    for (let i = 1; i <= list.length; i++) {
      const next = (current + i) % list.length;
      if (list[next].alive) return next;
    }
    return current;
  }

  function newTopic() {
    const next = randomTopic(used);
    setTopic(next.topic);
    if (next.index !== -1) setUsed([...used, next.index]);
  }

  function success() {
    setTurn(nextAliveIndex(players, turn));
  }

  function fail() {
    const updated = players.map((p, i) =>
      i === turn ? { ...p, alive: false } : p
    );

    const alive = updated.filter(p => p.alive);

    setPlayers(updated);

    if (alive.length === 1) {
      setWinner(alive[0].name);
      return;
    }

    setTurn(nextAliveIndex(updated, turn));
    newTopic();
  }

  function reset() {
    setStarted(false);
    setPlayers([]);
    setTurn(0);
    setWinner(null);
    setTopic("");
    setUsed([]);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0f172a", color: "white", fontFamily: "Arial", padding: 40 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontSize: 64, fontWeight: "bold" }}>VIDEOS CON...</h1>

        {!started && (
          <div style={{ background: "#1e293b", padding: 30, borderRadius: 24 }}>
            <h2>Participantes</h2>

            {names.map((name, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <input
                  value={name}
                  onChange={e => {
                    const copy = [...names];
                    copy[i] = e.target.value;
                    setNames(copy);
                  }}
                  style={{ flex: 1, padding: 15, borderRadius: 12, fontSize: 18 }}
                />
                <button onClick={() => removePlayer(i)} style={{ padding: 15, borderRadius: 12 }}>
                  Quitar
                </button>
              </div>
            ))}

            <button onClick={addPlayer} style={{ padding: 18, borderRadius: 14, marginRight: 10 }}>
              Agregar jugador
            </button>

            <button onClick={startGame} style={{ padding: 18, borderRadius: 14, background: "#7c3aed", color: "white", fontWeight: "bold" }}>
              Empezar partida
            </button>
          </div>
        )}

        {started && !winner && (
          <div style={{ background: "#1e293b", padding: 30, borderRadius: 24 }}>
            <h2>Turno de:</h2>
            <h3 style={{ fontSize: 44 }}>{players[turn]?.name}</h3>

            <div style={{ background: "white", color: "black", borderRadius: 20, padding: 30, marginBottom: 25 }}>
              <p>Tópico actual</p>
              <h2 style={{ fontSize: 40 }}>{topic}</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 15 }}>
              <button onClick={success} style={{ padding: 22, borderRadius: 16, background: "green", color: "white", fontSize: 20 }}>
                Cumplió
              </button>
              <button onClick={fail} style={{ padding: 22, borderRadius: 16, background: "red", color: "white", fontSize: 20 }}>
                Falló
              </button>
              <button onClick={newTopic} style={{ padding: 22, borderRadius: 16, background: "#7c3aed", color: "white", fontSize: 20 }}>
                Nuevo tópico
              </button>
            </div>

            <h2 style={{ marginTop: 30 }}>Jugadores</h2>
            {players.map((p, i) => (
              <div key={i} style={{ opacity: p.alive ? 1 : 0.4, fontSize: 22 }}>
                {p.alive ? "🟢" : "🔴"} {p.name}
              </div>
            ))}

            <button onClick={reset} style={{ marginTop: 30, padding: 15, borderRadius: 12 }}>
              Reiniciar
            </button>
          </div>
        )}

        {winner && (
          <div style={{ background: "#facc15", color: "black", padding: 40, borderRadius: 24, textAlign: "center" }}>
            <h2>🏆 Ganador</h2>
            <h1 style={{ fontSize: 60 }}>{winner}</h1>
            <button onClick={reset} style={{ padding: 18, borderRadius: 14 }}>
              Nueva partida
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
