import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "contenidoRaciones";

//Servicio que devuelve todos los contenidoRaciones
export async function getAllContenidoRaciones(racionId) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + racionId + "/all")
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

//Servicio que devuelve un contenidoRacion
/*export async function getOneContenidoRaciones(contenidoRacionID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + contenidoRacionID)
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

//Servicio que crea un contenidoRacion
export async function createContenidoRaciones(contenidoRacion) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, contenidoRacion)
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

//Servicio que actualiza un contenidoRacion
export async function updateContenidoRaciones(contenidoRacion) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/update", contenidoRacion)
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

//Servicio que elimina un contenidoRacion
export async function deleteContenidoRaciones(contenidoRacion) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/delete", contenidoRacion)
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
