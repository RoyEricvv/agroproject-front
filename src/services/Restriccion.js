import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "restriccion";

//Servicio que devuelve todos las restricciones de un insumo
export async function getAllRestricciones(insumoId) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + insumoId + "/all")
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

//Servicio que crea una restriccion
export async function createRestriccion(restriccion) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, restriccion)
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

//Servicio que actualiza una restriccion
export async function updateRestriccion(restriccion) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/update", restriccion)
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

//Servicio que elimina una restriccion
export async function deleteRestriccion(restriccion) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/delete", restriccion)
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
