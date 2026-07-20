import api from "./api";

export async function obtenerMitigaciones() {
  const response = await api.get("/mitigaciones/");
  return response.data;
}

export async function crearMitigacion(datos) {
  const response = await api.post("/mitigaciones/", datos);
  return response.data;
}

export async function actualizarMitigacion(id, datos) {
  const response = await api.put(`/mitigaciones/${id}/`, datos);
  return response.data;
}

export async function eliminarMitigacion(id) {
  await api.delete(`/mitigaciones/${id}/`);
}