"use client";

import { useMemo, useState } from "react";

const TOPICS = [
  { id: 1, text: "aparezca un auto rojo", category: "Objeto", difficulty: "Medio" },
  { id: 2, text: "alguien use gafas oscuras", category: "Vestimenta", difficulty: "Fácil" },
  { id: 3, text: "haya una escena en una playa", category: "Lugar", difficulty: "Fácil" },
  { id: 4, text: "alguien cante dentro de un auto", category: "Situación", difficulty: "Difícil" },
  { id: 5, text: "aparezca una piscina", category: "Lugar", difficulty: "Medio" },
  { id: 6, text: "alguien rompa un objeto", category: "Acción", difficulty: "Medio" },
  { id: 7, text: "aparezca una motocicleta", category: "Objeto", difficulty: "Medio" },
  { id: 8, text: "haya fuego o llamas", category: "Visual", difficulty: "Difícil" },
  { id: 9, text: "alguien lleve una chaqueta de cuero", category: "Vestimenta", difficulty: "Medio" },
  { id: 10, text: "aparezca una televisión dentro del videoclip", category: "Objeto", difficulty: "Difícil" },
  { id: 11, text: "haya una escena bajo la lluvia", category: "Clima", difficulty: "Medio" },
  { id: 12, text: "alguien mire por una ventana", category: "Acción", difficulty: "Medio" },
  { id: 13, text: "aparezca una estatua", category: "Objeto", difficulty: "Difícil" },
  { id: 14, text: "haya humo o niebla artificial", category: "Visual", difficulty: "Medio" },
  { id: 15, text: "alguien use sombrero", category: "Vestimenta", difficulty: "Medio" },
  { id: 16, text: "aparezca un perro", category: "Animal", difficulty: "Difícil" },
  { id: 17, text: "haya una fiesta o discoteca", category: "Situación", difficulty: "Fácil" },
  { id: 18, text: "aparezca dinero", category: "Objeto", difficulty: "Medio" },
  { id: 19, text: "alguien esté llorando", category: "Emoción", difficulty: "Medio" },
  { id: 20, text: "se vea una escalera", category: "Objeto", difficulty: "Medio" },
  { id: 21, text: "aparezca una cama", category: "Objeto", difficulty: "Fácil" },
  { id: 22, text: "alguien esté sentado en el piso", category: "Acción", difficulty: "Medio" },
  { id: 23, text: "aparezca un espejo", category: "Objeto", difficulty: "Medio" },
  { id: 24, text: "alguien use guantes", category: "Vestimenta", difficulty: "Difícil" },
  { id: 25, text: "aparezca una máscara", category: "Objeto", difficulty: "Difícil" },
  { id: 26, text: "haya una escena en un baño", category: "Lugar", difficulty: "Difícil" },
  { id: 27, text: "aparezca una iglesia", category: "Lugar", difficulty: "Difícil" },
  { id: 28, text: "se vea una ciudad desde arriba", category: "Lugar", difficulty: "Medio" },
  { id: 29, text: "alguien corra por la calle", category: "Acción", difficulty: "Medio" },
  { id: 30, text: "aparezca una bandera", category: "Objeto", difficulty: "Difícil" },
  { id: 31, text: "alguien use ropa completamente blanca", category: "Vestimenta", difficulty: "Medio" },
  { id: 32, text: "alguien use ropa completamente negra", category: "Vestimenta", difficulty: "Fácil" },
  { id: 33, text: "aparezca una copa o vaso de alcohol", category: "Objeto", difficulty: "Medio" },
  { id: 34, text: "haya una escena en un hotel", category: "Lugar", difficulty: "Difícil" },
  { id: 35, text: "aparezca una limusina", category: "Objeto", difficulty: "Difícil" },
  { id: 36, text: "alguien baile en grupo", category: "Acción", difficulty: "Fácil" },
  { id: 37, text: "aparezca una puerta roja", category: "Objeto", difficulty: "Difícil" },
  { id: 38, text: "haya una escena en una azotea", category: "Lugar", difficulty: "Medio" },
  { id: 39, text: "alguien esté dentro de una bañera", category: "Situación", difficulty: "Difícil" },
  { id: 40, text: "aparezca una cancha deportiva", category: "Lugar", difficulty: "Difícil" },
  { id: 41, text: "haya luces de neón", category: "Visual", difficulty: "Medio" },
  { id: 42, text: "alguien esté en una habitación roja", category: "Lugar", difficulty: "Difícil" },
  { id: 43, text: "aparezca una bicicleta", category: "Objeto", difficulty: "Difícil" },
  { id: 44, text: "alguien use una cadena o collar grande", category: "Vestimenta", difficulty: "Fácil" },
  { id: 45, text: "aparezca un avión o aeropuerto", category: "Lugar", difficulty: "Difícil" },
  { id: 46, text: "alguien caiga al suelo", category: "Acción", difficulty: "Difícil" },
  { id: 47, text: "aparezca una cámara filmando dentro del video", category: "Meta", difficulty: "Difícil" },
  { id: 48, text: "haya una escena con velas", category: "Objeto", difficulty: "Medio" },
  { id: 49, text: "alguien toque un instrumento musical", category: "Acción", difficulty: "Fácil" },
  { id: 50, text: "aparezca una serpiente o animal exótico", category: "Animal", difficulty: "Extremo" },
  { id: 51, text: "haya una escena en el desierto", category: "Lugar", difficulty: "Difícil" },
  { id: 52, text: "aparezca una pantalla gigante", category: "Objeto", difficulty: "Medio" },
  { id: 53, text: "alguien esté esposado", category: "Situación", difficulty: "Extremo" },
  { id: 54, text: "aparezca un ascensor", category: "Lugar", difficulty: "Difícil" },
  { id: 55, text: "haya una pelea o discusión", category: "Situación", difficulty: "Medio" },
  { id: 56, text: "alguien tire algo al suelo", category: "Acción", difficulty: "Medio" },
  { id: 57, text: "aparezca una corona", category: "Objeto", difficulty: "Difícil" },
  { id: 58, text: "haya una escena en blanco y negro", category: "Visual", difficulty: "Medio" },
  { id: 59, text: "alguien se mire en un espejo", category: "Acción", difficulty: "Medio" },
  { id: 60, text: "aparezca una botella rota", category: "Objeto", difficulty: "Difícil" },
  { id: 61, text: "alguien esté sentado en una silla elegante", category: "Objeto", difficulty: "Medio" },
  { id: 62, text: "haya confeti o papeles cayendo", category: "Visual", difficulty: "Medio" },
  { id: 63, text: "aparezcan rosas o flores", category: "Objeto", difficulty: "Medio" },
  { id: 64, text: "alguien use lentes transparentes", category: "Vestimenta", difficulty: "Difícil" },
  { id: 65, text: "haya una escena en una carretera", category: "Lugar", difficulty: "Medio" },
  { id: 66, text: "aparezca un taxi", category: "Objeto", difficulty: "Difícil" },
  { id: 67, text: "alguien esté comiendo", category: "Acción", difficulty: "Difícil" },
  { id: 68, text: "aparezca una maleta", category: "Objeto", difficulty: "Difícil" },
  { id: 69, text: "haya una escena con nieve", category: "Clima", difficulty: "Difícil" },
  { id: 70, text: "alguien use una máscara de animal", category: "Vestimenta", difficulty: "Extremo" },
  { id: 71, text: "aparezca un reloj grande", category: "Objeto", difficulty: "Difícil" },
  { id: 72, text: "haya una escena en una cocina", category: "Lugar", difficulty: "Difícil" },
  { id: 73, text: "alguien esté dentro de una jaula", category: "Situación", difficulty: "Extremo" },
  { id: 74, text: "aparezca una silla de ruedas", category: "Objeto", difficulty: "Extremo" },
  { id: 75, text: "haya una persecución", category: "Situación", difficulty: "Difícil" },
  { id: 76, text: "alguien esté en una piscina sin nadar", category: "Situación", difficulty: "Medio" },
  { id: 77, text: "aparezca una pintura o cuadro", category: "Objeto", difficulty: "Difícil" },
  { id: 78, text: "haya una escena en una mansión", category: "Lugar", difficulty: "Medio" },
  { id: 79, text: "alguien use botas llamativas", category: "Vestimenta", difficulty: "Difícil" },
  { id: 80, text: "haya una luz roja dominante", category: "Visual", difficulty: "Medio" },
  { id: 81, text: "aparezca una mesa llena de comida", category: "Objeto", difficulty: "Medio" },
  { id: 82, text: "alguien esté manejando de noche", category: "Situación", difficulty: "Medio" },
  { id: 83, text: "aparezca una guitarra eléctrica", category: "Objeto", difficulty: "Medio" },
  { id: 84, text: "alguien esté en una cama sin dormir", category: "Situación", difficulty: "Medio" },
  { id: 85, text: "aparezca una casa abandonada", category: "Lugar", difficulty: "Difícil" },
  { id: 86, text: "haya una escena con muchas personas bailando", category: "Acción", difficulty: "Fácil" },
  { id: 87, text: "aparezca una habitación completamente blanca", category: "Lugar", difficulty: "Medio" },
  { id: 88, text: "aparezca una habitación completamente oscura", category: "Lugar", difficulty: "Medio" },
  { id: 89, text: "alguien use maquillaje muy llamativo", category: "Vestimenta", difficulty: "Medio" },
  { id: 90, text: "aparezca un micrófono de pie", category: "Objeto", difficulty: "Fácil" },
  { id: 91, text: "haya una escena en un escenario", category: "Lugar", difficulty: "Fácil" },
  { id: 92, text: "aparezca público o audiencia", category: "Personas", difficulty: "Fácil" },
  { id: 93, text: "alguien esté en un sofá", category: "Situación", difficulty: "Medio" },
  { id: 94, text: "aparezca una lámpara encendida", category: "Objeto", difficulty: "Medio" },
  { id: 95, text: "alguien esté usando audífonos", category: "Objeto", difficulty: "Medio" },
  { id: 96, text: "haya una escena dentro de un club nocturno", category: "Lugar", difficulty: "Fácil" },
  { id: 97, text: "alguien esté caminando solo por la calle", category: "Acción", difficulty: "Medio" },
  { id: 98, text: "aparezca una señal de tránsito", category: "Objeto", difficulty: "Difícil" },
  { id: 99, text: "aparezca una pared con grafiti", category: "Lugar", difficulty: "Medio" },
  { id: 100, text: "alguien use una gorra", category: "Vestimenta", difficulty: "Fácil" },
  { id: 101, text: "aparezca un puente", category: "Lugar", difficulty: "Difícil" },
  { id: 102, text: "haya una escena en un tren o estación de tren", category: "Lugar", difficulty: "Difícil" },
  { id: 103, text: "aparezca un barco o yate", category: "Objeto", difficulty: "Difícil" },
  { id: 104, text: "alguien esté saltando", category: "Acción", difficulty: "Medio" },
  { id: 105, text: "aparezca una persona con paraguas", category: "Objeto", difficulty: "Difícil" },
  { id: 106, text: "haya una escena con relámpagos o tormenta", category: "Clima", difficulty: "Difícil" },
  { id: 107, text: "aparezca una fogata", category: "Visual", difficulty: "Difícil" },
  { id: 108, text: "alguien esté pintando o dibujando", category: "Acción", difficulty: "Extremo" },
  { id: 109, text: "aparezca un teléfono antiguo", category: "Objeto", difficulty: "Extremo" },
  { id: 110, text: "alguien esté usando un teléfono celular", category: "Objeto", difficulty: "Fácil" },
  { id: 111, text: "haya una escena en una escuela o salón de clases", category: "Lugar", difficulty: "Difícil" },
  { id: 112, text: "aparezca una biblioteca o estantería de libros", category: "Lugar", difficulty: "Difícil" },
  { id: 113, text: "alguien esté fumando", category: "Acción", difficulty: "Medio" },
  { id: 114, text: "aparezca una mesa de billar", category: "Objeto", difficulty: "Difícil" },
  { id: 115, text: "haya una escena con luces parpadeantes", category: "Visual", difficulty: "Medio" },
  { id: 116, text: "alguien esté usando traje formal", category: "Vestimenta", difficulty: "Medio" },
  { id: 117, text: "alguien use vestido rojo", category: "Vestimenta", difficulty: "Difícil" },
  { id: 118, text: "aparezca una ventana rota", category: "Objeto", difficulty: "Difícil" },
  { id: 119, text: "haya una escena dentro de un supermercado o tienda", category: "Lugar", difficulty: "Extremo" },
  { id: 120, text: "aparezca un maniquí", category: "Objeto", difficulty: "Extremo" },
  { id: 121, text: "alguien esté acostado en el suelo", category: "Situación", difficulty: "Difícil" },
  { id: 122, text: "aparezca una escalera mecánica", category: "Objeto", difficulty: "Extremo" },
  { id: 123, text: "haya una escena en un túnel", category: "Lugar", difficulty: "Difícil" },
  { id: 124, text: "aparezca una motocicleta en movimiento", category: "Objeto", difficulty: "Medio" },
  { id: 125, text: "alguien esté rodeado de muchas luces", category: "Visual", difficulty: "Medio" },
  { id: 126, text: "aparezca un piano", category: "Objeto", difficulty: "Medio" },
  { id: 127, text: "alguien toque batería", category: "Acción", difficulty: "Medio" },
  { id: 128, text: "aparezca una piscina vacía", category: "Lugar", difficulty: "Extremo" },
  { id: 129, text: "haya una escena en cámara lenta muy evidente", category: "Visual", difficulty: "Medio" },
  { id: 130, text: "aparezca una persona con el pelo teñido de color llamativo", category: "Persona", difficulty: "Medio" },
  { id: 131, text: "alguien esté usando uniforme", category: "Vestimenta", difficulty: "Difícil" },
  { id: 132, text: "aparezca una ambulancia, patrulla o vehículo de emergencia", category: "Objeto", difficulty: "Extremo" },
  { id: 133, text: "haya una escena en un hospital", category: "Lugar", difficulty: "Extremo" },
  { id: 134, text: "aparezca una tumba o cementerio", category: "Lugar", difficulty: "Extremo" },
  { id: 135, text: "alguien esté rezando", category: "Acción", difficulty: "Difícil" },
  { id: 136, text: "aparezca una cruz religiosa", category: "Objeto", difficulty: "Difícil" },
  { id: 137, text: "haya una escena en un restaurante", category: "Lugar", difficulty: "Difícil" },
  { id: 138, text: "aparezca una hamburguesa, pizza u otra comida reconocible", category: "Objeto", difficulty: "Difícil" },
  { id: 139, text: "alguien esté brindando con otra persona", category: "Acción", difficulty: "Medio" },
  { id: 140, text: "aparezca un espejo con luces alrededor", category: "Objeto", difficulty: "Difícil" },
  { id: 141, text: "haya una escena en un camerino", category: "Lugar", difficulty: "Extremo" },
  { id: 142, text: "aparezca una persona maquillándose", category: "Acción", difficulty: "Difícil" },
  { id: 143, text: "alguien esté usando una peluca", category: "Vestimenta", difficulty: "Difícil" },
  { id: 144, text: "aparezca un globo o varios globos", category: "Objeto", difficulty: "Difícil" },
  { id: 145, text: "haya una escena con agua salpicando", category: "Visual", difficulty: "Medio" },
  { id: 146, text: "alguien esté nadando", category: "Acción", difficulty: "Difícil" },
  { id: 147, text: "aparezca una cascada o fuente de agua", category: "Lugar", difficulty: "Difícil" },
  { id: 148, text: "haya una escena en un parque", category: "Lugar", difficulty: "Medio" },
  { id: 149, text: "aparezca una rueda de la fortuna o feria", category: "Lugar", difficulty: "Extremo" },
  { id: 150, text: "alguien esté montando a caballo", category: "Acción", difficulty: "Extremo" },
  { id: 151, text: "aparezca un caballo", category: "Animal", difficulty: "Difícil" },
  { id: 152, text: "aparezca una persona con alas o disfraz fantástico", category: "Vestimenta", difficulty: "Extremo" },
  { id: 153, text: "haya una escena con explosión visual o pirotecnia", category: "Visual", difficulty: "Difícil" },
  { id: 154, text: "aparezca un auto de lujo", category: "Objeto", difficulty: "Medio" },
  { id: 155, text: "alguien esté cantando frente a un espejo", category: "Situación", difficulty: "Difícil" },
  { id: 156, text: "aparezca una calle mojada", category: "Lugar", difficulty: "Medio" },
  { id: 157, text: "haya una escena con sombra muy marcada", category: "Visual", difficulty: "Medio" },
  { id: 158, text: "aparezca una persona detrás de una reja", category: "Situación", difficulty: "Difícil" },
  { id: 159, text: "alguien esté usando una bufanda", category: "Vestimenta", difficulty: "Extremo" },
  { id: 160, text: "aparezca una escena con muchas pantallas o monitores", category: "Objeto", difficulty: "Difícil" }
];

function getRandomTopic(usedIds) {
  const available = TOPICS.filter((topic) => !usedIds.includes(topic.id));
  const pool = available.length > 0 ? available : TOPICS;
  return pool[Math.floor(Math.random() * pool.length)];
}

function getDifficultyClass(difficulty) {
  if (difficulty === "Fácil") return "easy";
  if (difficulty === "Medio") return "medium";
  if (difficulty === "Difícil") return "hard";
  return "extreme";
}

export default function Home() {
  const [screen, setScreen] = useState("setup");
  const [names, setNames] = useState(["Jugador 1", "Jugador 2", "Jugador 3"]);
  const [players, setPlayers] = useState([]);
  const [turn, setTurn] = useState(0);
  const [topic, setTopic] = useState(null);
  const [usedTopics, setUsedTopics] = useState([]);
  const [history, setHistory] = useState([]);
  const [round, setRound] = useState(1);

  const alivePlayers = useMemo(() => players.filter((p) => p.alive), [players]);
  const eliminatedPlayers = useMemo(() => players.filter((p) => !p.alive), [players]);
  const currentPlayer = players[turn];
  const winner = alivePlayers.length === 1 && screen === "game" ? alivePlayers[0] : null;

  function addPlayer() {
    if (names.length >= 10) return;
    setNames([...names, `Jugador ${names.length + 1}`]);
  }

  function removePlayer(index) {
    if (names.length <= 2) return;
    setNames(names.filter((_, i) => i !== index));
  }

  function updateName(index, value) {
    const copy = [...names];
    copy[index] = value;
    setNames(copy);
  }

  function startGame() {
    const cleanNames = names.map((name, index) => name.trim() || `Jugador ${index + 1}`);
    const initialPlayers = cleanNames.map((name, index) => ({
      id: index + 1,
      name,
      alive: true,
      eliminatedAt: null,
    }));

    const firstTopic = getRandomTopic([]);

    setPlayers(initialPlayers);
    setTurn(0);
    setTopic(firstTopic);
    setUsedTopics([firstTopic.id]);
    setHistory([]);
    setRound(1);
    setScreen("game");
  }

  function playAgainSamePlayers() {
    const renewedPlayers = players.map((player, index) => ({
      ...player,
      id: index + 1,
      alive: true,
      eliminatedAt: null,
    }));

    const firstTopic = getRandomTopic([]);

    setPlayers(renewedPlayers);
    setTurn(0);
    setTopic(firstTopic);
    setUsedTopics([firstTopic.id]);
    setHistory([]);
    setRound(1);
    setScreen("game");
  }

  function nextAliveIndex(list, currentIndex) {
    for (let i = 1; i <= list.length; i++) {
      const next = (currentIndex + i) % list.length;
      if (list[next]?.alive) return next;
    }
    return currentIndex;
  }

  function changeTopic() {
    const next = getRandomTopic(usedTopics);
    const alreadyUsed = usedTopics.includes(next.id);

    setTopic(next);
    setUsedTopics(alreadyUsed ? [next.id] : [...usedTopics, next.id]);
  }

  function markSuccess() {
    if (!currentPlayer || winner) return;

    setHistory([
      {
        type: "success",
        text: `${currentPlayer.name} cumplió`,
        detail: `Videos con... ${topic?.text}`,
      },
      ...history,
    ].slice(0, 6));

    setTurn(nextAliveIndex(players, turn));
  }

  function markFail() {
    if (!currentPlayer || winner) return;

    const updated = players.map((player, index) => {
      if (index === turn) {
        return {
          ...player,
          alive: false,
          eliminatedAt: round,
        };
      }

      return player;
    });

    const aliveAfter = updated.filter((player) => player.alive);

    setPlayers(updated);

    setHistory([
      {
        type: "fail",
        text: `${currentPlayer.name} quedó eliminado`,
        detail: `Videos con... ${topic?.text}`,
      },
      ...history,
    ].slice(0, 6));

    if (aliveAfter.length <= 1) return;

    const nextTopic = getRandomTopic(usedTopics);
    const alreadyUsed = usedTopics.includes(nextTopic.id);

    setTopic(nextTopic);
    setUsedTopics(alreadyUsed ? [nextTopic.id] : [...usedTopics, nextTopic.id]);
    setTurn(nextAliveIndex(updated, turn));
    setRound(round + 1);
  }

  function resetGame() {
    setScreen("setup");
    setPlayers([]);
    setTurn(0);
    setTopic(null);
    setUsedTopics([]);
    setHistory([]);
    setRound(1);
  }

  return (
    <main className="app">
      <div className="backgroundGlow glowOne" />
      <div className="backgroundGlow glowTwo" />
      <div className="backgroundGrid" />

      {screen === "setup" && (
        <section className="setupPage">
          <div className="hero">
            <div className="brandBadge">🎬 Juego de videoclips</div>
            <h1>
              VIDEOS
              <span> CON...</span>
            </h1>
            <p>
              Sortea una consigna visual, busca un videoclip musical oficial y elimina a quien no logre encontrar un video que cumpla.
            </p>

            <div className="heroStats">
              <div>
                <strong>2–10</strong>
                <span>jugadores</span>
              </div>
              <div>
                <strong>{TOPICS.length}</strong>
                <span>tópicos</span>
              </div>
              <div>
                <strong>1</strong>
                <span>ganador</span>
              </div>
            </div>
          </div>

          <div className="setupCard">
            <div className="cardHeader">
              <div>
                <span className="eyebrow">Nueva partida</span>
                <h2>Participantes</h2>
              </div>
              <div className="playerCounter">{names.length}/10</div>
            </div>

            <div className="playersForm">
              {names.map((name, index) => (
                <div className="nameRow" key={index}>
                  <div className="nameNumber">{index + 1}</div>
                  <input
                    value={name}
                    onChange={(event) => updateName(index, event.target.value)}
                    placeholder={`Jugador ${index + 1}`}
                  />
                  <button onClick={() => removePlayer(index)} disabled={names.length <= 2}>
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="setupControls">
              <button className="secondaryButton" onClick={addPlayer} disabled={names.length >= 10}>
                + Agregar jugador
              </button>
            </div>

            <button className="startButton" onClick={startGame}>
              Empezar partida
            </button>
          </div>
        </section>
      )}

      {screen === "game" && !winner && topic && (
        <section className="gamePage">
          <header className="topBar">
            <div>
              <div className="smallLabel">VIDEOS CON...</div>
              <h2>Ronda {round}</h2>
            </div>

            <div className="topStats">
              <div>
                <span>Vivos</span>
                <strong>{alivePlayers.length}</strong>
              </div>
              <div>
                <span>Eliminados</span>
                <strong>{eliminatedPlayers.length}</strong>
              </div>
              <button onClick={resetGame}>Cambiar jugadores</button>
            </div>
          </header>

          <div className="gameLayout">
            <section className="mainPanel">
              <div className="turnCard">
                <div>
                  <span className="eyebrow">Turno actual</span>
                  <h1>{currentPlayer?.name}</h1>
                </div>
              </div>

              <div className="topicCard">
                <div className="topicMeta">
                  <span>{topic.category}</span>
                  <span className={getDifficultyClass(topic.difficulty)}>{topic.difficulty}</span>
                </div>

                <div className="topicPrefix">Busca un video musical oficial donde...</div>
                <h2>{topic.text}</h2>
              </div>

              <div className="actionGrid">
                <button className="successButton" onClick={markSuccess}>
                  <span>✓</span>
                  Cumplió
                </button>

                <button className="failButton" onClick={markFail}>
                  <span>✕</span>
                  Falló
                </button>

                <button className="newTopicButton" onClick={changeTopic}>
                  <span>↻</span>
                  Nuevo tópico
                </button>
              </div>
            </section>

            <aside className="sidePanel">
              <div className="sideCard">
                <div className="sideTitle">Jugadores</div>

                <div className="playersList">
                  {players.map((player, index) => (
                    <div
                      key={player.id}
                      className={[
                        "playerChip",
                        player.alive ? "alive" : "out",
                        index === turn && player.alive ? "current" : "",
                      ].join(" ")}
                    >
                      <div className="avatar">{player.name.slice(0, 1).toUpperCase()}</div>
                      <div>
                        <strong>{player.name}</strong>
                        <span>{player.alive ? "En juego" : `Eliminado en ronda ${player.eliminatedAt}`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sideCard">
                <div className="sideTitle">Historial</div>

                <div className="historyList">
                  {history.length === 0 && <p className="emptyHistory">Todavía no hay eventos.</p>}

                  {history.map((item, index) => (
                    <div className={`historyItem ${item.type}`} key={index}>
                      <strong>{item.text}</strong>
                      <span>{item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      )}

      {winner && (
        <section className="winnerPage">
          <div className="winnerCard">
            <div className="trophy">🏆</div>
            <span className="eyebrow">Tenemos ganador</span>
            <h1>{winner.name}</h1>
            <p>Sobrevivió a {round} ronda{round === 1 ? "" : "s"} y ganó la partida.</p>

            <div className="finalPlayers">
              {players.map((player) => (
                <div key={player.id} className={player.alive ? "finalWinner" : "finalOut"}>
                  <strong>{player.name}</strong>
                  <span>{player.alive ? "Ganador" : `Eliminado en ronda ${player.eliminatedAt}`}</span>
                </div>
              ))}
            </div>

            <div className="winnerActions">
              <button onClick={playAgainSamePlayers}>Jugar otra con los mismos</button>
              <button className="secondaryWinnerButton" onClick={resetGame}>Cambiar participantes</button>
            </div>
          </div>
        </section>
      )}

      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        button,
        input {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        button:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .app {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          color: white;
          background:
            radial-gradient(circle at top left, rgba(168, 85, 247, 0.28), transparent 34%),
            radial-gradient(circle at bottom right, rgba(34, 211, 238, 0.18), transparent 34%),
            #070816;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          padding: 32px;
        }

        .backgroundGrid {
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: radial-gradient(circle at center, black, transparent 70%);
        }

        .backgroundGlow {
          position: fixed;
          width: 360px;
          height: 360px;
          filter: blur(80px);
          opacity: 0.45;
          border-radius: 999px;
          pointer-events: none;
        }

        .glowOne {
          top: -120px;
          right: 8%;
          background: #7c3aed;
        }

        .glowTwo {
          bottom: -120px;
          left: 10%;
          background: #06b6d4;
        }

        .setupPage,
        .gamePage,
        .winnerPage {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          min-height: calc(100vh - 64px);
          margin: 0 auto;
        }

        .setupPage {
          display: grid;
          grid-template-columns: 1.1fr 520px;
          gap: 32px;
          align-items: center;
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(68px, 9vw, 132px);
          line-height: 0.86;
          letter-spacing: -7px;
          font-weight: 1000;
        }

        .hero h1 span {
          display: block;
          color: #a78bfa;
          text-shadow: 0 0 36px rgba(167, 139, 250, 0.45);
        }

        .hero p {
          max-width: 680px;
          margin: 28px 0;
          font-size: 21px;
          line-height: 1.55;
          color: #cbd5e1;
        }

        .brandBadge,
        .eyebrow,
        .smallLabel {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.08);
          color: #ddd6fe;
          border-radius: 999px;
          padding: 9px 14px;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .heroStats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          max-width: 620px;
        }

        .heroStats div,
        .setupCard,
        .mainPanel,
        .sideCard,
        .winnerCard {
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(15, 23, 42, 0.72);
          box-shadow: 0 24px 80px rgba(0,0,0,0.35);
          backdrop-filter: blur(22px);
        }

        .heroStats div {
          border-radius: 24px;
          padding: 22px;
        }

        .heroStats strong {
          display: block;
          font-size: 38px;
          line-height: 1;
        }

        .heroStats span {
          color: #94a3b8;
          font-weight: 700;
        }

        .setupCard {
          border-radius: 32px;
          padding: 28px;
        }

        .cardHeader {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
          margin-bottom: 22px;
        }

        .cardHeader h2 {
          margin: 12px 0 0;
          font-size: 34px;
        }

        .playerCounter {
          width: 72px;
          height: 72px;
          display: grid;
          place-items: center;
          border-radius: 22px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          font-size: 22px;
          font-weight: 1000;
        }

        .playersForm {
          display: grid;
          gap: 12px;
        }

        .nameRow {
          display: grid;
          grid-template-columns: 42px 1fr 48px;
          gap: 10px;
          align-items: center;
        }

        .nameNumber {
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: rgba(255,255,255,0.1);
          color: #c4b5fd;
          font-weight: 1000;
        }

        .nameRow input {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.12);
          outline: none;
          border-radius: 16px;
          padding: 16px;
          background: rgba(255,255,255,0.08);
          color: white;
          font-size: 17px;
          font-weight: 800;
        }

        .nameRow input:focus {
          border-color: #a78bfa;
          box-shadow: 0 0 0 4px rgba(167,139,250,0.16);
        }

        .nameRow button {
          height: 52px;
          border: none;
          border-radius: 16px;
          color: white;
          background: rgba(255,255,255,0.1);
          font-weight: 1000;
        }

        .setupControls {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin: 18px 0;
        }

        .secondaryButton,
        .startButton,
        .topStats button,
        .winnerCard button {
          border: none;
          border-radius: 18px;
          padding: 16px 18px;
          color: white;
          font-weight: 1000;
          transition: transform 0.16s ease, filter 0.16s ease;
        }

        .secondaryButton:hover,
        .startButton:hover,
        .topStats button:hover,
        .winnerCard button:hover,
        .actionGrid button:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
        }

        .secondaryButton {
          background: rgba(255,255,255,0.12);
        }

        .startButton {
          width: 100%;
          margin-top: 18px;
          padding: 22px;
          font-size: 19px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          box-shadow: 0 16px 40px rgba(124,58,237,0.4);
        }

        .topBar {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: center;
          margin-bottom: 24px;
        }

        .topBar h2 {
          margin: 12px 0 0;
          font-size: 42px;
        }

        .topStats {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .topStats div {
          min-width: 112px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 14px 18px;
        }

        .topStats span {
          display: block;
          color: #94a3b8;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .topStats strong {
          display: block;
          font-size: 28px;
        }

        .topStats button {
          background: rgba(255,255,255,0.12);
        }

        .gameLayout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
        }

        .mainPanel,
        .sideCard {
          border-radius: 32px;
          padding: 26px;
        }

        .turnCard {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
        }

        .turnCard h1 {
          margin: 12px 0 24px;
          font-size: clamp(52px, 7vw, 92px);
          line-height: 0.9;
          letter-spacing: -4px;
        }

        .topicCard {
          min-height: 330px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 32px;
          padding: 34px;
          color: #09090b;
          background:
            radial-gradient(circle at top right, rgba(124,58,237,0.22), transparent 34%),
            linear-gradient(135deg, #ffffff, #e2e8f0);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.5);
        }

        .topicMeta {
          display: flex;
          gap: 10px;
          margin-bottom: 26px;
        }

        .topicMeta span {
          border-radius: 999px;
          padding: 9px 13px;
          background: #e2e8f0;
          color: #334155;
          font-size: 13px;
          font-weight: 1000;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .topicMeta .easy {
          background: #dcfce7;
          color: #166534;
        }

        .topicMeta .medium {
          background: #fef3c7;
          color: #92400e;
        }

        .topicMeta .hard {
          background: #fee2e2;
          color: #991b1b;
        }

        .topicMeta .extreme {
          background: #111827;
          color: white;
        }

        .topicPrefix {
          color: #64748b;
          font-size: 18px;
          font-weight: 900;
          margin-bottom: 14px;
        }

        .topicCard h2 {
          margin: 0;
          font-size: clamp(42px, 5vw, 72px);
          line-height: 1;
          letter-spacing: -2.5px;
        }

        .actionGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 18px;
        }

        .actionGrid button {
          border: none;
          border-radius: 24px;
          min-height: 94px;
          color: white;
          font-size: 22px;
          font-weight: 1000;
          transition: transform 0.16s ease, filter 0.16s ease;
        }

        .actionGrid span {
          display: block;
          font-size: 28px;
          line-height: 1;
        }

        .successButton {
          background: linear-gradient(135deg, #16a34a, #22c55e);
        }

        .failButton {
          background: linear-gradient(135deg, #dc2626, #f97316);
        }

        .newTopicButton {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
        }

        .sidePanel {
          display: grid;
          gap: 18px;
          align-content: start;
        }

        .sideTitle {
          font-size: 22px;
          font-weight: 1000;
          margin-bottom: 16px;
        }

        .playersList,
        .historyList {
          display: grid;
          gap: 10px;
        }

        .playerChip {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 12px;
          align-items: center;
          padding: 12px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.07);
        }

        .playerChip.current {
          border-color: rgba(167,139,250,0.7);
          background: rgba(124,58,237,0.38);
          box-shadow: 0 0 34px rgba(124,58,237,0.22);
        }

        .playerChip.out {
          opacity: 0.42;
        }

        .avatar {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 16px;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          font-weight: 1000;
        }

        .playerChip strong,
        .playerChip span {
          display: block;
        }

        .playerChip span {
          color: #94a3b8;
          font-size: 13px;
          font-weight: 800;
          margin-top: 2px;
        }

        .historyItem {
          border-radius: 18px;
          padding: 14px;
          background: rgba(255,255,255,0.07);
          border-left: 4px solid #64748b;
        }

        .historyItem.success {
          border-left-color: #22c55e;
        }

        .historyItem.fail {
          border-left-color: #ef4444;
        }

        .historyItem strong,
        .historyItem span {
          display: block;
        }

        .historyItem span,
        .emptyHistory {
          color: #94a3b8;
          font-size: 13px;
          line-height: 1.35;
          margin-top: 4px;
        }

        .winnerPage {
          display: grid;
          place-items: center;
        }

        .winnerCard {
          width: min(820px, 100%);
          text-align: center;
          border-radius: 40px;
          padding: 44px;
        }

        .trophy {
          font-size: 92px;
          filter: drop-shadow(0 18px 30px rgba(250,204,21,0.3));
        }

        .winnerCard h1 {
          margin: 14px 0;
          font-size: clamp(62px, 9vw, 116px);
          line-height: 0.9;
          letter-spacing: -5px;
          color: #facc15;
        }

        .winnerCard p {
          margin: 0 auto 26px;
          color: #cbd5e1;
          font-size: 20px;
        }

        .finalPlayers {
          display: grid;
          gap: 10px;
          margin: 26px 0;
        }

        .finalWinner,
        .finalOut {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          border-radius: 18px;
          padding: 16px 18px;
          background: rgba(255,255,255,0.08);
        }

        .finalWinner {
          background: rgba(250,204,21,0.18);
          border: 1px solid rgba(250,204,21,0.4);
        }

        .finalOut {
          opacity: 0.55;
        }

        .winnerActions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 20px;
        }

        .winnerCard button {
          border: none;
          border-radius: 18px;
          color: white;
          font-weight: 1000;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          font-size: 18px;
          padding: 18px 28px;
        }

        .secondaryWinnerButton {
          background: rgba(255,255,255,0.12) !important;
        }

        @media (max-width: 980px) {
          .app {
            padding: 18px;
          }

          .setupPage,
          .gamePage,
          .winnerPage {
            min-height: calc(100vh - 36px);
          }

          .setupPage,
          .gameLayout {
            grid-template-columns: 1fr;
          }

          .hero h1 {
            letter-spacing: -4px;
          }

          .topBar,
          .turnCard {
            align-items: stretch;
            flex-direction: column;
          }

          .topStats,
          .actionGrid,
          .setupControls,
          .winnerActions {
            grid-template-columns: 1fr;
            display: grid;
          }
        }
      `}</style>
    </main>
  );
}
