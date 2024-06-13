import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "maquinas";

//Servicio que devuelve todos las maquinas
export async function getAllMaquinas(granja_id) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + granja_id + "/allMaquina")
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
//Servicio que devuelve todos los animales
export async function getAllMaquinasUsuario(usuarioId) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + usuarioId + "/" + "/allMaquinas")
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

//Servicio que devuelve un animal
export async function getOneMaquinas(maquinaID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + maquinaID)
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

//Servicio que crea una maquina
export async function createMaquinas(maquina) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, maquina)
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

//Servicio que actualiza una maquina mediante ID
export async function updateMaquinas(maquina) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/" + maquina.id, maquina)
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

//Servicio que elimina una maquina
export async function deleteMaquinas(maquinaID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + maquinaID + "/delete")
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
