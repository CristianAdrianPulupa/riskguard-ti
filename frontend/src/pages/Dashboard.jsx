import { useEffect, useState } from "react";
import {
  crearRiesgo,
  eliminarRiesgo,
  obtenerRiesgos,
} from "../services/riesgosService";
import "./Dashboard.css";
import PlanesMitigacion from "../components/PlanesMitigacion";
import MapaRiesgos from "../components/MapaRiesgos";

const formularioInicial = {
  nombre: "",
  descripcion: "",
  categoria: "",
  activo_afectado: "",
  impacto: 1,
  probabilidad: 1,
  estado: "IDENTIFICADO",
  responsable: "",
};

export default function Dashboard() {
  const [riesgos, setRiesgos] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarRiesgos();
  }, []);

  async function cargarRiesgos() {
    try {
      setCargando(true);
      setError("");

      const datos = await obtenerRiesgos();
      setRiesgos(datos);
    } catch (err) {
      console.error(err);
      setError(
        "No se pudo conectar con el backend. Verifica que Django esté funcionando."
      );
    } finally {
      setCargando(false);
    }
  }

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((formularioAnterior) => ({
      ...formularioAnterior,
      [name]:
        name === "impacto" || name === "probabilidad"
          ? Number(value)
          : value,
    }));
  }

  async function manejarRegistro(evento) {
    evento.preventDefault();

    try {
      setGuardando(true);
      setError("");

      await crearRiesgo(formulario);

      setFormulario(formularioInicial);
      setMostrarFormulario(false);
      await cargarRiesgos();
    } catch (err) {
      console.error(err);

      const detalle = err.response?.data;

      if (detalle && typeof detalle === "object") {
        const mensajes = Object.entries(detalle)
          .map(([campo, mensaje]) => `${campo}: ${mensaje}`)
          .join(" | ");

        setError(mensajes);
      } else {
        setError("No fue posible registrar el riesgo.");
      }
    } finally {
      setGuardando(false);
    }
  }

  async function manejarEliminar(id) {
    const confirmar = window.confirm(
      "¿Estás seguro de eliminar este riesgo?"
    );

    if (!confirmar) {
      return;
    }

    try {
      await eliminarRiesgo(id);
      await cargarRiesgos();
    } catch (err) {
      console.error(err);
      setError("No fue posible eliminar el riesgo.");
    }
  }

  const totalRiesgos = riesgos.length;

  const totalCriticos = riesgos.filter(
    (riesgo) => riesgo.nivel === "CRITICO"
  ).length;

  const totalAltos = riesgos.filter(
    (riesgo) => riesgo.nivel === "ALTO"
  ).length;

  const totalMitigados = riesgos.filter(
    (riesgo) => riesgo.estado === "MITIGADO"
  ).length;

  return (
    <div className="dashboard">
      <header id="dashboard" className="header">
        <div>
          <h1>RiskGuard TI</h1>
          <p>Plataforma de Gestión de Riesgos Tecnológicos</p>
        </div>

        <button
          className="primary-button"
          type="button"
          onClick={() => setMostrarFormulario((estado) => !estado)}
        >
          {mostrarFormulario ? "Cancelar" : "+ Registrar riesgo"}
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      {mostrarFormulario && (
        <section className="panel form-panel">
          <h2>Registrar riesgo tecnológico</h2>

          <form className="risk-form" onSubmit={manejarRegistro}>
            <div className="form-field">
              <label htmlFor="nombre">Nombre del riesgo</label>
              <input
                id="nombre"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                placeholder="Ej. Acceso no autorizado"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="categoria">Categoría</label>
              <input
                id="categoria"
                name="categoria"
                value={formulario.categoria}
                onChange={manejarCambio}
                placeholder="Ej. Seguridad"
                required
              />
            </div>

            <div className="form-field form-field-full">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formulario.descripcion}
                onChange={manejarCambio}
                placeholder="Describe el riesgo identificado"
                rows="4"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="activo_afectado">Activo afectado</label>
              <input
                id="activo_afectado"
                name="activo_afectado"
                value={formulario.activo_afectado}
                onChange={manejarCambio}
                placeholder="Ej. Servidor principal"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="responsable">Responsable</label>
              <input
                id="responsable"
                name="responsable"
                value={formulario.responsable}
                onChange={manejarCambio}
                placeholder="Ej. Administrador TI"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="impacto">Impacto</label>
              <select
                id="impacto"
                name="impacto"
                value={formulario.impacto}
                onChange={manejarCambio}
              >
                <option value={1}>1 - Muy bajo</option>
                <option value={2}>2 - Bajo</option>
                <option value={3}>3 - Medio</option>
                <option value={4}>4 - Alto</option>
                <option value={5}>5 - Muy alto</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="probabilidad">Probabilidad</label>
              <select
                id="probabilidad"
                name="probabilidad"
                value={formulario.probabilidad}
                onChange={manejarCambio}
              >
                <option value={1}>1 - Muy baja</option>
                <option value={2}>2 - Baja</option>
                <option value={3}>3 - Media</option>
                <option value={4}>4 - Alta</option>
                <option value={5}>5 - Muy alta</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="estado">Estado</label>
              <select
                id="estado"
                name="estado"
                value={formulario.estado}
                onChange={manejarCambio}
              >
                <option value="IDENTIFICADO">Identificado</option>
                <option value="EN_TRATAMIENTO">En tratamiento</option>
                <option value="MITIGADO">Mitigado</option>
                <option value="ACEPTADO">Aceptado</option>
              </select>
            </div>

            <div className="form-actions">
              <button
                className="primary-button"
                type="submit"
                disabled={guardando}
              >
                {guardando ? "Guardando..." : "Guardar riesgo"}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="cards">
        <div className="card">
          <h2>Total riesgos</h2>
          <span>{totalRiesgos}</span>
        </div>

        <div className="card card-critical">
          <h2>Críticos</h2>
          <span>{totalCriticos}</span>
        </div>

        <div className="card card-high">
          <h2>Altos</h2>
          <span>{totalAltos}</span>
        </div>

        <div className="card card-success">
          <h2>Mitigados</h2>
          <span>{totalMitigados}</span>
        </div>
      </section>

      <div id="mapa-riesgos" className="dashboard-section-anchor">
  <MapaRiesgos riesgos={riesgos} />
</div>

      <section id="riesgos" className="panel risks-panel">
        <div className="panel-heading">
          <h2>Riesgos registrados</h2>

          <button
            type="button"
            className="secondary-button"
            onClick={cargarRiesgos}
          >
            Actualizar
          </button>
        </div>

        {cargando ? (
          <p className="empty-state">Cargando riesgos...</p>
        ) : riesgos.length === 0 ? (
          <p className="empty-state">
            Todavía no existen riesgos registrados.
          </p>
        ) : (
          <div className="table-container">
            <table className="risks-table">
              <thead>
                <tr>
                  <th>Riesgo</th>
                  <th>Categoría</th>
                  <th>Impacto</th>
                  <th>Probabilidad</th>
                  <th>Puntaje</th>
                  <th>Nivel</th>
                  <th>Estado</th>
                  <th>Responsable</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {riesgos.map((riesgo) => (
                  <tr key={riesgo.id}>
                    <td>{riesgo.nombre}</td>
                    <td>{riesgo.categoria}</td>
                    <td>{riesgo.impacto}</td>
                    <td>{riesgo.probabilidad}</td>
                    <td>{riesgo.impacto * riesgo.probabilidad}</td>

                    <td>
                      <span
                        className={`level-badge level-${riesgo.nivel.toLowerCase()}`}
                      >
                        {riesgo.nivel}
                      </span>
                    </td>

                    <td>{riesgo.estado.replaceAll("_", " ")}</td>
                    <td>{riesgo.responsable}</td>

                    <td>
                      <button
                        className="delete-button"
                        type="button"
                        onClick={() => manejarEliminar(riesgo.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div id="mitigaciones" className="dashboard-section-anchor">
  <PlanesMitigacion riesgos={riesgos} />
</div>
    </div>
  );
}