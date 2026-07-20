import "./MapaRiesgos.css";

const niveles = {
  BAJO: "Bajo",
  MEDIO: "Medio",
  ALTO: "Alto",
  CRITICO: "Crítico",
};

function obtenerClaseNivel(impacto, probabilidad) {
  const puntaje = impacto * probabilidad;

  if (puntaje <= 5) {
    return "map-low";
  }

  if (puntaje <= 10) {
    return "map-medium";
  }

  if (puntaje <= 15) {
    return "map-high";
  }

  return "map-critical";
}

export default function MapaRiesgos({ riesgos }) {
  const impactos = [1, 2, 3, 4, 5];
  const probabilidades = [5, 4, 3, 2, 1];

  function riesgosPorCelda(impacto, probabilidad) {
    return riesgos.filter(
      (riesgo) =>
        Number(riesgo.impacto) === impacto &&
        Number(riesgo.probabilidad) === probabilidad
    );
  }

  return (
    <section className="panel risk-map-panel">
      <div className="risk-map-heading">
        <div>
          <h2>Mapa de Riesgos TI</h2>
          <p>
            Distribución de los riesgos según su impacto y probabilidad
            de ocurrencia.
          </p>
        </div>

        <div className="risk-map-legend">
          <span className="legend-item">
            <span className="legend-color map-low" />
            Bajo
          </span>

          <span className="legend-item">
            <span className="legend-color map-medium" />
            Medio
          </span>

          <span className="legend-item">
            <span className="legend-color map-high" />
            Alto
          </span>

          <span className="legend-item">
            <span className="legend-color map-critical" />
            Crítico
          </span>
        </div>
      </div>

      <div className="risk-map-layout">
        <div className="probability-title">
          Probabilidad
        </div>

        <div className="risk-map-grid">
          <div className="map-corner-cell" />

          {impactos.map((impacto) => (
            <div
              key={`header-${impacto}`}
              className="map-axis-header"
            >
              {impacto}
            </div>
          ))}

          {probabilidades.map((probabilidad) => (
            <>
              <div
                key={`prob-${probabilidad}`}
                className="map-axis-header"
              >
                {probabilidad}
              </div>

              {impactos.map((impacto) => {
                const riesgosCelda = riesgosPorCelda(
                  impacto,
                  probabilidad
                );

                return (
                  <div
                    key={`${impacto}-${probabilidad}`}
                    className={`map-cell ${obtenerClaseNivel(
                      impacto,
                      probabilidad
                    )}`}
                  >
                    <span className="cell-score">
                      {impacto * probabilidad}
                    </span>

                    <div className="risk-markers">
                      {riesgosCelda.map((riesgo) => (
                        <div
                          key={riesgo.id}
                          className="risk-marker"
                          title={`${riesgo.nombre} | ${niveles[riesgo.nivel] || riesgo.nivel}`}
                        >
                          R{riesgo.id}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          ))}
        </div>

        <div className="impact-title">
          Impacto
        </div>
      </div>

      {riesgos.length === 0 ? (
        <p className="empty-state risk-map-empty">
          Registra riesgos para visualizarlos dentro del mapa.
        </p>
      ) : (
        <div className="risk-map-detail">
          <h3>Riesgos representados</h3>

          <div className="risk-map-list">
            {riesgos.map((riesgo) => (
              <div key={riesgo.id} className="risk-map-list-item">
                <span className="risk-code">R{riesgo.id}</span>

                <div>
                  <strong>{riesgo.nombre}</strong>

                  <p>
                    Impacto {riesgo.impacto} · Probabilidad{" "}
                    {riesgo.probabilidad} · Puntaje{" "}
                    {riesgo.impacto * riesgo.probabilidad} ·{" "}
                    {niveles[riesgo.nivel] || riesgo.nivel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}