import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "fuente";

//Servicio que devuelve todos las fuentes
export async function getAllFuentes() {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/all")
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

//Servicio que crea una fuente
export async function createFuente(fuente) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, fuente)
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

//Servicio que actualiza una fuente
export async function updateFuente(fuente) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/update", fuente)
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
