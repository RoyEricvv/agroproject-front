import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "granjas";

//Servicio que devuelve todos los granjas
export async function getAllGranjas(usuarioID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + usuarioID + "/all")
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

//Servicio que devuelve un granja
/*export async function getOneGranjas(granjaID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + granjaID)
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

//Servicio que crea un granja
export async function createGranjas(granja) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, granja)
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

//Servicio que actualiza un granja
export async function updateGranjas(granja) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/update", granja)
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

//Servicio que elimina un granja
export async function deleteGranjas(granja) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/delete", granja)
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
