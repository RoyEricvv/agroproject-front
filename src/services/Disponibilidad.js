import axios from "axios";

const url = process.env.VUE_APP_API_URL + "disponibilidades";

// Servicio que devuelve todas las disponibilidades para un usuario
export async function getAllDisponibilidades(usuarioID) {
  var responseData;
  try {
    const response = await axios.get(url + "/" + usuarioID + "/all");
    responseData = response.data;
  } catch (error) {
    console.error(error.response);
    responseData = error.response.data;
  }
  return responseData;
}

// Servicio que crea una disponibilidad
export async function createDisponibilidad(disponibilidad) {
  var responseData;
  try {
    const response = await axios.post(url, disponibilidad);
    responseData = response.data;
  } catch (error) {
    console.error(error.response);
    responseData = error.response.data;
  }
  return responseData;
}

// Servicio que actualiza una disponibilidad
export async function updateDisponibilidad(disponibilidad) {
  var responseData;
  try {
    const response = await axios.post(url + "/update", disponibilidad);
    responseData = response.data;
  } catch (error) {
    console.error(error.response);
    responseData = error.response.data;
  }
  return responseData;
}

// Servicio que elimina una disponibilidad
export async function deleteDisponibilidad(disponibilidad) {
  var responseData;
  try {
    const response = await axios.post(url + "/delete", disponibilidad);
    responseData = response.data;
  } catch (error) {
    console.error(error.response);
    responseData = error.response.data;
  }
  return responseData;
}
