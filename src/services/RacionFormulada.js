import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "racionFormuladas";

//Servicio que devuelve todos los racionFormuladas
export async function getAllRacionFormuladas(usuarioId) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + usuarioId + "/all")
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

//Servicio que devuelve todos los racionFormuladas
export async function getAllRacionFormuladasFavoritasEspecie(
  usuarioId,
  especieId
) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + usuarioId + "/" + especieId + "/favoritos")
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

//Servicio que devuelve un racionFormulada
export async function getOneRacionFormuladas(racionFormuladaID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + racionFormuladaID)
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

//Servicio que crea un racionFormulada
export async function createRacionFormuladas(racionFormulada) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, racionFormulada)
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

//Servicio que actualiza un racionFormulada
export async function updateRacionFormuladas(racionFormulada) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/" + racionFormulada.id, racionFormulada)
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

//Servicio que elimina un racionFormulada
export async function deleteRacionFormuladas(racionFormuladaID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + racionFormuladaID + "/delete")
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
