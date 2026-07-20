import { useEffect, useState } from "react";
import {
  crearMitigacion,
  eliminarMitigacion,
  obtenerMitigaciones,
} from "../services/mitigacionesService";
import "./PlanesMitigacion.css";

const formularioInicial = {
  riesgo: "",
  descripcion: "",
  responsable: "",
  fecha_limite: "",
  estado: "PENDIENTE",
};

export default function PlanesMitigacion({ riesgos }) {
  const [planes, setPlanes] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarPlanes();
  }, []);

  async function cargarPlanes() {
    try {
      setError("");
      const datos = await obtenerMitigaciones();
      setPlanes(datos);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los planes de mitigación.");
    }
  }

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: name === "riesgo" ? Number(value) : value,
    }));
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();

    if (!formulario.riesgo) {
      setError("Selecciona el riesgo que será tratado.");
      return;
    }

    try {
      setGuardando(true);
      setError("");

      await crearMitigacion(formulario);

      setFormulario(formularioInicial);
      setMostrarFormulario(false);
      await cargarPlanes();
    } catch (err) {
      console.error(err);

      const detalle = err.response?.data;

      if (detalle && typeof detalle === "object") {
        const mensajes = Object.entries(detalle)
          .map(([campo, mensaje]) => `${campo}: ${mensaje}`)
          .join(" | ");

        setError(mensajes);
      } else {
        setError("No fue posible guardar el plan de mitigación.");
      }
    } finally {
      setGuardando(false);
    }
  }

  async function manejarEliminar(id) {
    const confirmar = window.confirm(
      "¿Estás seguro de eliminar este plan de mitigación?"
    );

    if (!confirmar) {
      return;
    }

    try {
      await eliminarMitigacion(id);
      await cargarPlanes();
    } catch (err) {
      console.error(err);
      setError("No fue posible eliminar el plan.");
    }
  }

  function obtenerNombreRiesgo(riesgoId) {
    const riesgo = riesgos.find(
      (elemento) => elemento.id === riesgoId
    );

    return riesgo?.nombre || `Riesgo #${riesgoId}`;
  }

  function traducirEstado(estado) {
    const estados = {
      PENDIENTE: "Pendiente",
      EN_PROGRESO: "En progreso",
      COMPLETADO: "Completado",
    };

    return estados[estado] || estado;
  }

  return (
    <section className="panel mitigation-panel">
      <div className="mitigation-heading">
        <div>
          <h2>Planes de mitigación</h2>
          <p>
            Acciones definidas para reducir la probabilidad o el impacto
            de los riesgos tecnológicos.
          </p>
        </div>

        <button
          className="primary-button"
          type="button"
          onClick={() => setMostrarFormulario((valor) => !valor)}
          disabled={riesgos.length === 0}
        >
          {mostrarFormulario ? "Cancelar" : "+ Nuevo plan"}
        </button>
      </div>

      {riesgos.length === 0 && (
        <div className="mitigation-notice">
          Primero debes registrar al menos un riesgo tecnológico.
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {mostrarFormulario && (
        <form className="mitigation-form" onSubmit={manejarEnvio}>
          <div className="form-field">
            <label htmlFor="mitigacion-riesgo">Riesgo asociado</label>

            <select
              id="mitigacion-riesgo"
              name="riesgo"
              value={formulario.riesgo}
              onChange={manejarCambio}
              required
            >
              <option value="">Selecciona un riesgo</option>

              {riesgos.map((riesgo) => (
                <option key={riesgo.id} value={riesgo.id}>
                  {riesgo.nombre} — {riesgo.nivel}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="mitigacion-responsable">
              Responsable
            </label>

            <input
              id="mitigacion-responsable"
              name="responsable"
              value={formulario.responsable}
              onChange={manejarCambio}
              placeholder="Ej. Administrador de seguridad"
              required
            />
          </div>

          <div className="form-field form-field-full">
            <label htmlFor="mitigacion-descripcion">
              Acción de mitigación
            </label>

            <textarea
              id="mitigacion-descripcion"
              name="descripcion"
              value={formulario.descripcion}
              onChange={manejarCambio}
              placeholder="Describe las acciones que se aplicarán para tratar el riesgo"
              rows="4"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="mitigacion-fecha">
              Fecha límite
            </label>

            <input
              id="mitigacion-fecha"
              name="fecha_limite"
              type="date"
              value={formulario.fecha_limite}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="mitigacion-estado">Estado</label>

            <select
              id="mitigacion-estado"
              name="estado"
              value={formulario.estado}
              onChange={manejarCambio}
            >
              <option value="PENDIENTE">Pendiente</option>
              <option value="EN_PROGRESO">En progreso</option>
              <option value="COMPLETADO">Completado</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              className="primary-button"
              type="submit"
              disabled={guardando}
            >
              {guardando ? "Guardando..." : "Guardar plan"}
            </button>
          </div>
        </form>
      )}

      {planes.length === 0 ? (
        <p className="empty-state">
          Todavía no existen planes de mitigación registrados.
        </p>
      ) : (
        <div className="table-container">
          <table className="risks-table">
            <thead>
              <tr>
                <th>Riesgo</th>
                <th>Plan de mitigación</th>
                <th>Responsable</th>
                <th>Fecha límite</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {planes.map((plan) => (
                <tr key={plan.id}>
                  <td>{obtenerNombreRiesgo(plan.riesgo)}</td>
                  <td className="mitigation-description">
                    {plan.descripcion}
                  </td>
                  <td>{plan.responsable}</td>
                  <td>{plan.fecha_limite}</td>
                  <td>
                    <span
                      className={`plan-status status-${plan.estado.toLowerCase()}`}
                    >
                      {traducirEstado(plan.estado)}
                    </span>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => manejarEliminar(plan.id)}
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
  );
}