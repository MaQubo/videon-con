export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          background: "#1e293b",
          borderRadius: "24px",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            fontWeight: "bold",
            marginBottom: "30px",
          }}
        >
          VIDEOS CON...
        </h1>

        <div
          style={{
            background: "white",
            color: "black",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "20px",
          }}
        >
          <p>Tópico actual</p>

          <h2
            style={{
              fontSize: "42px",
              fontWeight: "bold",
            }}
          >
            Aparece un auto rojo
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "15px",
          }}
        >
          <button
            style={{
              padding: "20px",
              borderRadius: "16px",
              border: "none",
              background: "green",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Cumplió
          </button>

          <button
            style={{
              padding: "20px",
              borderRadius: "16px",
              border: "none",
              background: "red",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Falló
          </button>

          <button
            style={{
              padding: "20px",
              borderRadius: "16px",
              border: "none",
              background: "#7c3aed",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Nuevo tópico
          </button>
        </div>
      </div>
    </main>
  );
}
