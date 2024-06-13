import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "insumos";

//Servicio que devuelve todos los insumos
export async function getAllInsumos() {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url)
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
//Servicio que devuelve todos los insumos
export async function getAllInsumosNoAditivos() {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/NoAditivo")
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

//Servicio que devuelve un insumo
export async function getOneInsumos(insumoID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + insumoID)
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

//Servicio que crea un insumo
export async function createInsumos(insumo) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, insumo)
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

//Servicio que actualiza un insumo
export async function updateInsumos(insumo) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/" + insumo.id, insumo)
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
export async function deleteInsumos(insumoID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + insumoID + "/delete")
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
