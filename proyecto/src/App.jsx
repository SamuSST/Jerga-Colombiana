import { useState, useMemo, useRef } from "react";

const WORDS = [
  { word: "Parce", phonetic: "/par-se/", region: "Nacional", type: "sustantivo", def: "Amigo, compañero. Forma cariñosa de referirse a alguien de confianza.", example: "«Ey parce, ¿qué más?»" },
  { word: "Bacano", phonetic: "/ba-ká-no/", region: "Nacional", type: "adjetivo", def: "Algo o alguien genial, chévere, excelente. Expresión positiva muy usada.", example: "«Ese concierto estuvo muy bacano.»" },
  { word: "Chimba", phonetic: "/chim-ba/", region: "Medellín", type: "adjetivo/sust.", def: "Algo increíble, de muy buena calidad. También puede ser lo contrario según el contexto.", example: "«Esa película fue una chimba.»" },
  { word: "Parcero/a", phonetic: "/par-sé-ro/", region: "Nacional", type: "sustantivo", def: "Amigo cercano, persona de confianza. Variante formal de 'parce'.", example: "«Mi parcera me ayudó a estudiar.»" },
  { word: "Gonorrea", phonetic: "/go-no-rré-a/", region: "Medellín", type: "sustantivo", def: "Insulto fuerte o, paradójicamente, apelativo cariñoso entre amigos muy cercanos. Depende del tono.", example: "«Ese gonorrea me robó el tejo.»" },
  { word: "Berraco", phonetic: "/be-rrá-ko/", region: "Antioquia", type: "adjetivo", def: "Persona muy hábil, valiente o tenaz. Alguien que enfrenta los problemas sin quejarse.", example: "«Ese man es muy berraco para los negocios.»" },
  { word: "Tombos", phonetic: "/tóm-bos/", region: "Bogotá", type: "sustantivo pl.", def: "La policía. Término coloquial, a veces peyorativo.", example: "«Ahí vienen los tombos, agüevémonos.»" },
  { word: "Marica", phonetic: "/ma-rí-ka/", region: "Nacional", type: "interj./sust.", def: "Interjección de sorpresa o forma de llamar a un amigo. Su significado depende totalmente del contexto y tono.", example: "«¡Marica, no lo puedo creer!»" },
  { word: "Qué más", phonetic: "/ke más/", region: "Nacional", type: "expresión", def: "Saludo coloquial equivalente a '¿cómo estás?' o '¿qué hay de nuevo?'", example: "«Ey, ¿qué más pues?»" },
  { word: "Guayabo", phonetic: "/gua-yá-bo/", region: "Nacional", type: "sustantivo", def: "Resaca o malestar después de haber tomado alcohol. También puede ser tristeza por amor.", example: "«Hoy tengo un guayabo horrible.»" },
  { word: "Camello", phonetic: "/ka-mé-yo/", region: "Nacional", type: "sustantivo", def: "Trabajo, empleo o labor. A veces también se refiere a una tarea difícil.", example: "«Tengo que irme, que hay camello mañana.»" },
  { word: "Ñero/a", phonetic: "/ñé-ro/", region: "Bogotá", type: "sustantivo", def: "Persona de barrios populares, a veces con connotación peyorativa aunque también puede usarse con cariño.", example: "«Ese ñero sabe mucho de mecánica.»" },
  { word: "Mamera", phonetic: "/ma-mé-ra/", region: "Nacional", type: "sustantivo", def: "Algo aburrido, tedioso o fastidioso. Expresar que algo causa pereza o hastío.", example: "«Qué mamera este tráfico.»" },
  { word: "Pinta", phonetic: "/pín-ta/", region: "Nacional", type: "sustantivo", def: "Apariencia, ropa o forma de vestir de alguien. También el aspecto general.", example: "«Ese man tiene buena pinta.»" },
  { word: "Toche", phonetic: "/tó-che/", region: "Nacional", type: "adjetivo", def: "Algo o alguien torpe, feo, o que no funciona bien. También se usa para cosas rotas o mal hechas.", example: "«Me salió toche el trabajo, toca repetirlo.»" },
  { word: "Fresco/a", phonetic: "/frés-ko/", region: "Nacional", type: "adjetivo", def: "Estar tranquilo o sin problemas. También se usa para decirle a alguien que no se preocupe.", example: "«Fresco parce, yo lo pago.»" },
  { word: "Cucho/a", phonetic: "/kú-cho/", region: "Nacional", type: "sustantivo", def: "Papá, mamá, o persona mayor. Término cariñoso para los padres.", example: "«Mi cucho me prestó el carro.»" },
  { word: "Pola", phonetic: "/pó-la/", region: "Nacional", type: "sustantivo", def: "Cerveza. Término muy popular en todo el país.", example: "«¿Vamos por unas polas?»" },
  { word: "Agüevado", phonetic: "/a-güe-vá-do/", region: "Nacional", type: "adjetivo", def: "Triste, desanimado o sin energía. Alguien que está caído de ánimo.", example: "«¿Por qué estás tan agüevado hoy?»" },
  { word: "Mondá", phonetic: "/mon-dá/", region: "Medellín", type: "interj.", def: "Expresión de incredulidad o sorpresa. Equivale a '¡no me digas!' o '¡qué barbaridad!'", example: "«¡Mondá, ganamos el partido!»" },
  { word: "Dar papaya", phonetic: "/dar pa-pá-ya/", region: "Nacional", type: "expresión", def: "Descuidarse o ponerse en una situación vulnerable que otros pueden aprovechar.", example: "«No dé papaya dejando el bolso así.»" },
  { word: "Sapear", phonetic: "/sa-pe-ár/", region: "Nacional", type: "verbo", def: "Delatar, chismosear o contar los secretos de alguien. El que hace esto es un 'sapo'.", example: "«No me vaya a sapear con el profe.»" },
  { word: "Camellar", phonetic: "/ka-me-yár/", region: "Nacional", type: "verbo", def: "Trabajar duro. Derivado de 'camello' (trabajo).", example: "«Hay que camellar duro pa' salir adelante.»" },
  { word: "Rumba", phonetic: "/rúm-ba/", region: "Nacional", type: "sustantivo", def: "Fiesta, celebración o salida nocturna a bailar y divertirse.", example: "«¿A qué horas es la rumba?»" },
  { word: "Picada", phonetic: "/pi-ká-da/", region: "Nacional", type: "sustantivo", def: "Pequeño restaurante o puesto callejero donde se sirve comida económica y sabrosa.", example: "«Vamos a esa picada que tiene unas arepas ricas.»" },
  { word: "Jincho", phonetic: "/yín-cho/", region: "Cali", type: "adjetivo", def: "Borracho, en estado de ebriedad. Alguien que tomó demasiado.", example: "«Llegó todo jincho a la casa.»" },
  { word: "Salpicón", phonetic: "/sal-pi-kón/", region: "Cali", type: "sustantivo", def: "Bebida refrescante típica de Cali hecha con frutas picadas, agua, azúcar y hielo.", example: "«En el calor nada mejor que un salpicón.»" },
  { word: "Quiubo", phonetic: "/kiú-bo/", region: "Nacional", type: "expresión", def: "Contracción de '¿qué hubo?'. Saludo coloquial equivalente a '¿qué pasó?' o '¿cómo estás?'", example: "«¡Quiubo llave, cuánto tiempo!»" },
  { word: "Llave", phonetic: "/yá-ve/", region: "Cali", type: "sustantivo", def: "Amigo muy cercano. Proviene de la idea de que un amigo es 'la llave' para abrirte puertas.", example: "«Ese es mi llave del alma.»" },
  { word: "Galleta", phonetic: "/ga-yé-ta/", region: "Nacional", type: "sustantivo", def: "Bofetada o golpe en la cara. También puede referirse a un insulto verbal fuerte.", example: "«Le pegó una galleta que lo tumbó.»" },
];

const REGION_COLORS = {
  Nacional:  { bg: "#FEF3C7", text: "#92400E" },
  Medellín:  { bg: "#D1FAE5", text: "#065F46" },
  Bogotá:    { bg: "#DBEAFE", text: "#1E40AF" },
  Cali:      { bg: "#FCE7F3", text: "#9D174D" },
  Antioquia: { bg: "#EDE9FE", text: "#5B21B6" },
};

const ALL_REGIONS = ["Todas", ...Object.keys(REGION_COLORS)];

function getTodayIndex() {
  const origin = new Date("2024-01-01");
  const diff = Math.floor((new Date() - origin) / 86400000);
  return Math.abs(diff) % WORDS.length;
}

function RegionBadge({ region, small }) {
  const c = REGION_COLORS[region] || { bg: "#F3F4F6", text: "#374151" };
  return (
    <span style={{
      fontSize: small ? 10 : 11,
      fontWeight: 700,
      padding: "3px 9px",
      borderRadius: 20,
      background: c.bg,
      color: c.text,
      letterSpacing: 0.3,
      whiteSpace: "nowrap",
    }}>
      {region}
    </span>
  );
}

function HeroCard({ word, dayIndex, onPrev, onNext }) {
  return (
    <div style={{
      background: "#003087",
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 16,
      boxShadow: "0 8px 28px rgba(0,48,135,0.22)",
    }}>
      <div style={{ display: "flex", height: 6 }}>
        <div style={{ flex: 2, background: "#F5C842" }} />
        <div style={{ flex: 1, background: "#003087" }} />
        <div style={{ flex: 1, background: "#CE1126" }} />
      </div>
      <div style={{ padding: "20px 20px 22px" }}>
        <p style={{ fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.4)", margin: "0 0 4px", fontWeight: 600 }}>
          PALABRA DEL DÍA
        </p>
        <h1 style={{ fontSize: 38, fontWeight: 800, color: "#fff", margin: "0 0 3px", lineHeight: 1.1, fontFamily: "Georgia, serif" }}>
          {word.word}
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", fontStyle: "italic", margin: "0 0 14px" }}>
          {word.phonetic}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          <RegionBadge region={word.region} />
          <span style={{
            fontSize: 11, fontWeight: 500, padding: "3px 9px", borderRadius: 20,
            background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)",
            border: "0.5px solid rgba(255,255,255,0.2)",
          }}>
            {word.type}
          </span>
        </div>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.88)", lineHeight: 1.65, margin: "0 0 12px" }}>
          {word.def}
        </p>
        <p style={{
          fontSize: 13, color: "rgba(255,255,255,0.48)", fontStyle: "italic", lineHeight: 1.55,
          borderLeft: "3px solid #F5C842", paddingLeft: 12, margin: "0 0 20px",
        }}>
          {word.example}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onPrev} style={{
            flex: 1, padding: "10px 0", background: "rgba(255,255,255,0.1)",
            border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 10,
            color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer",
          }}>← Anterior</button>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", minWidth: 50, textAlign: "center" }}>
            {dayIndex + 1}/{WORDS.length}
          </span>
          <button onClick={onNext} style={{
            flex: 1, padding: "10px 0", background: "rgba(255,255,255,0.1)",
            border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 10,
            color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer",
          }}>Siguiente →</button>
        </div>
      </div>
    </div>
  );
}

function WordCard({ word }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 14, padding: "13px 15px",
      border: "0.5px solid #EAECF0", marginBottom: 8,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 7 }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: "#111827", fontFamily: "Georgia, serif" }}>{word.word}</span>
        <RegionBadge region={word.region} small />
      </div>
      <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.55, margin: "0 0 6px" }}>{word.def}</p>
      <p style={{ fontSize: 12, color: "#9CA3AF", fontStyle: "italic", lineHeight: 1.45, margin: 0 }}>{word.example}</p>
    </div>
  );
}

export default function App() {
  const todayIdx = useMemo(() => getTodayIndex(), []);
  const [dayIndex, setDayIndex] = useState(todayIdx);
  const [activeRegion, setActiveRegion] = useState("Todas");
  const [search, setSearch] = useState("");
  const scrollRef = useRef(null);

  const heroWord = WORDS[dayIndex];

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return WORDS.filter(w => {
      const matchR = activeRegion === "Todas" || w.region === activeRegion;
      const matchS = !q || w.word.toLowerCase().includes(q) || w.def.toLowerCase().includes(q);
      return matchR && matchS;
    });
  }, [activeRegion, search]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#DDE0E8",
      display: "flex",
      justifyContent: "center",
      padding: "0",
    }}>
      {/* Phone shell */}
      <div style={{
        width: "100%",
        maxWidth: 430,
        minHeight: "100vh",
        background: "#F7F8FA",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 60px rgba(0,0,0,0.15)",
      }}>

        {/* Status bar */}
        <div style={{
          background: "#F7F8FA",
          padding: "14px 20px 6px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>9:41</span>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#6B7280" }}>●●●●</span>
            <span style={{ fontSize: 11, color: "#6B7280", marginLeft: 4 }}>WiFi</span>
            <span style={{ fontSize: 13, marginLeft: 4 }}>🔋</span>
          </div>
        </div>

        {/* Scrollable body */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "10px 16px 0" }}>

          {/* App header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ display: "flex", width: 30, height: 20, borderRadius: 3, overflow: "hidden", flexShrink: 0 }}>
              <div style={{ flex: 2, background: "#F5C842" }} />
              <div style={{ flex: 1, background: "#003087" }} />
              <div style={{ flex: 1, background: "#CE1126" }} />
            </div>
            <div>
              <h2 style={{ fontSize: 19, fontWeight: 700, color: "#111827", margin: 0, fontFamily: "Georgia, serif" }}>
                Jerga Colombiana
              </h2>
              <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0 }}>{WORDS.length} palabras y modismos</p>
            </div>
          </div>

          <HeroCard
            word={heroWord}
            dayIndex={dayIndex}
            onPrev={() => setDayIndex(i => (i - 1 + WORDS.length) % WORDS.length)}
            onNext={() => setDayIndex(i => (i + 1) % WORDS.length)}
          />

          {/* Search */}
          <div style={{ position: "relative", marginBottom: 12 }}>
            <span style={{
              position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
              color: "#9CA3AF", fontSize: 16, pointerEvents: "none",
            }}>⌕</span>
            <input
              type="text"
              placeholder="Buscar palabra o significado..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "11px 12px 11px 36px",
                border: "0.5px solid #E5E7EB", borderRadius: 12,
                fontSize: 14, color: "#111827", background: "#fff",
                outline: "none", boxSizing: "border-box",
              }}
            />
          </div>

          {/* Region filters */}
          <div style={{
            display: "flex", gap: 6, overflowX: "auto", marginBottom: 14,
            paddingBottom: 4,
            msOverflowStyle: "none", scrollbarWidth: "none",
          }}>
            {ALL_REGIONS.map(r => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                style={{
                  flexShrink: 0, fontSize: 12, padding: "6px 14px", borderRadius: 20,
                  cursor: "pointer",
                  border: "0.5px solid",
                  borderColor: activeRegion === r ? "#003087" : "#E5E7EB",
                  background: activeRegion === r ? "#003087" : "#fff",
                  color: activeRegion === r ? "#fff" : "#6B7280",
                  fontWeight: activeRegion === r ? 600 : 400,
                  transition: "all 0.15s",
                }}
              >{r}</button>
            ))}
          </div>

          <p style={{ fontSize: 10, letterSpacing: 1.5, color: "#9CA3AF", margin: "0 0 10px", fontWeight: 600 }}>
            {filtered.length} {filtered.length === 1 ? "PALABRA" : "PALABRAS"}
          </p>

          {filtered.length === 0
            ? <p style={{ textAlign: "center", padding: "3rem 0", color: "#9CA3AF", fontSize: 14 }}>
                No se encontraron resultados, parce.
              </p>
            : filtered.map(w => <WordCard key={w.word} word={w} />)
          }

          {/* Bottom padding so content clears nav bar */}
          <div style={{ height: 80 }} />
        </div>

        {/* Bottom nav */}
        <div style={{
          background: "rgba(247,248,250,0.97)",
          borderTop: "0.5px solid #EAECF0",
          display: "flex",
          justifyContent: "space-around",
          padding: "10px 0 18px",
          flexShrink: 0,
        }}>
          {[
            { icon: "📖", label: "Diccionario", active: true },
            { icon: "⭐", label: "Favoritos",   active: false },
            { icon: "🔀", label: "Al azar",     active: false },
          ].map(({ icon, label, active }) => (
            <button key={label} style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              padding: "0 20px",
            }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <span style={{ fontSize: 10, color: active ? "#003087" : "#9CA3AF", fontWeight: active ? 700 : 400 }}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}