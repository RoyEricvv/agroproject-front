import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "aditivos";

//Servicio que devuelve todos los aditivo
export async function getAllAditivos(aditivoId) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + aditivoId)
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

//Servicio que crea un aditivo
export async function createAditivo(aditivo) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, aditivo)
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

//Servicio que actualiza un aditivo
export async function updateAditivo(aditivo) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(
      url + "/" + aditivo.aditivo_id + "/" + aditivo.insumo_id + "/update",
      aditivo
    )
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

//Servicio que elimina un insumo
export async function deleteAditivo(aditivo_id, insumo_id) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + aditivo_id + "/" + insumo_id + "/delete")
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
