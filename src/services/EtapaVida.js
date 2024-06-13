import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "etapaVida";

//Servicio que devuelve todas las etapa de vida de una especie
export async function getAllEtapaVida(especie_id) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + especie_id + "/all")
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

//Servicio que devuelve todas las etapa de vida de una especie
export async function getAllEtapaVidaLimitada(especie_id, animal_id) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + especie_id + "/" + animal_id + "/all")
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

//Servicio que devuelve un etapa de vida
export async function getOneEtapaVida(etapaVidaID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + etapaVidaID)
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

//Servicio que crea un etapa de vida
export async function createEtapaVida(etapaVida) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, etapaVida)
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

//Servicio que actualiza una etapa Vida
export async function updateEtapaVida(etapaVida) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/" + etapaVida.id, etapaVida)
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

//Servicio que elimina un etapa de vida
export async function deleteEtapaVida(etapaVidaID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + etapaVidaID + "/delete")
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
