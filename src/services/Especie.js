import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "especies";

//Servicio que devuelve todos los especies
export async function getAllEspecies() {
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

//Servicio que devuelve un especie
export async function getOneEspecies(especieID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + especieID)
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

//Servicio que crea un especie
export async function createEspecies(especie) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, especie)
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

//Servicio que actualiza un especie
export async function updateEspecies(especie) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/" + especie.id, especie)
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

//Servicio que elimina un especie
export async function deleteEspecies(especieID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + especieID + "/delete")
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
