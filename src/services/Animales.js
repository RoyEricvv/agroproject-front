import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "animales";

//Servicio que devuelve todos los animales
export async function getAllAnimales(granja_id) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + granja_id + "/allGranja")
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
export async function getAllAnimalesUsuario(usuarioId,tipo) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + usuarioId + "/" + tipo + "/allAnimales")
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
export async function getOneAnimales(animalID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + animalID)
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

//Servicio que crea un animal
export async function createAnimales(animal) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, animal)
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

//Servicio que actualiza un animal
export async function updateAnimales(animal) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/" + animal.id, animal)
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

//Servicio que elimina un animal
export async function deleteAnimales(animalID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + animalID + "/delete")
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
