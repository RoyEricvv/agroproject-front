import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "contenidoNutricionales";

//Servicio que devuelve todos los contenidoNutricionales
export async function getAllContenidoNutricionales(insumoId) {
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

//Servicio que devuelve un contenidoNutricional
/*export async function getOneContenidoNutricionales(contenidoNutricionalID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + contenidoNutricionalID)
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
}*/

//Servicio que crea un contenidoNutricional
export async function createContenidoNutricionales(contenidoNutricional) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, contenidoNutricional)
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

//Servicio que actualiza un contenidoNutricional
export async function updateContenidoNutricionales(contenidoNutricional) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/update", contenidoNutricional)
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

//Servicio que elimina un contenidoNutricional
export async function deleteContenidoNutricionales(contenidoNutricional) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/delete", contenidoNutricional)
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
