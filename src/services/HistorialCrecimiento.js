import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "historialCrecimiento";

//Servicio que devuelve todo el historial de crecimiento de un animal
export async function getAllHistorialCrecimiento(animalID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + animalID + "/all")
    .then(function(response) {
      console.log(response);
      // handle success
      responseData = response;
    })
    .catch(function(error) {
      // handle error
      console.log(error.response);
      responseData = error.response;
    });
  return responseData;
}

//Servicio que devuelve el utlimo historial de crecimiento de un animal
export async function getOneHistorialCrecimiento(animalID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + animalID)
    .then(function(response) {
      console.log(response);
      // handle success
      responseData = response;
    })
    .catch(function(error) {
      // handle error
      console.log(error.response);
      responseData = error.response;
    });
  return responseData;
}

//Servicio que crea un historial de crecimiento de un animal
export async function createHistorialCrecimiento(historialCrecimiento) {
  var responseData;
  console.log(historialCrecimiento);
  //Get con parámetro en el url
  await axios
    .post(url, historialCrecimiento)
    .then(function(response) {
      console.log(response);
      // handle success
      responseData = response;
    })
    .catch(function(error) {
      // handle error
      console.log(error.response);
      responseData = error.response;
    });
  return responseData;
}

//Servicio que actualiza un historial de crecimiento de un animal
export async function updateHistorialCrecimiento(historialCrecimiento) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/" + historialCrecimiento.id, historialCrecimiento)
    .then(function(response) {
      console.log(response);
      // handle success
      responseData = response;
    })
    .catch(function(error) {
      // handle error
      console.log(error.response);
      responseData = error.response;
    });
  return responseData;
}

//Servicio que elimina un historial de crecimiento de un animal
export async function deleteHistorialCrecimiento(historialCrecimientoId) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + historialCrecimientoId + "/delete")
    .then(function(response) {
      console.log(response);
      // handle success
      responseData = response;
    })
    .catch(function(error) {
      // handle error
      console.log(error.response);
      responseData = error.response;
    });
  return responseData;
}
