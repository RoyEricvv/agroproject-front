import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "nutrientes";

//Servicio que devuelve todos los nutrientes
export async function getAllNutrientes() {
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

//Servicio que devuelve un nutriente
export async function getOneNutrientes(nutrienteID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + nutrienteID)
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

//Servicio que crea un nutriente
export async function createNutrientes(nutriente) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, nutriente)
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

//Servicio que actualiza un nutriente
export async function updateNutrientes(nutriente) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/" + nutriente.id, nutriente)
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

//Servicio que elimina un nutriente
export async function deleteNutrientes(nutrienteID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + nutrienteID + "/delete")
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
