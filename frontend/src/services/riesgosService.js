import api from "./api";

export const obtenerRiesgos = async () => {
    const response = await api.get("/riesgos/");
    return response.data;
};

export const crearRiesgo = async (datos) => {
    const response = await api.post("/riesgos/", datos);
    return response.data;
};

export const eliminarRiesgo = async (id) => {
    await api.delete(`/riesgos/${id}/`);
};

export const actualizarRiesgo = async (id, datos) => {
    const response = await api.put(`/riesgos/${id}/`, datos);
    return response.data;
};