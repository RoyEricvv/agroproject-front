import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "requerimientoNutricionales";

//Servicio que devuelve todos los requerimientoNutricionales
export async function getAllRequerimientoNutricionales(filtroS) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/all", filtroS)
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

//Servicio que devuelve un requerimientoNutricional

export async function getOneRequerimientoNutricionales(
  requerimientoNutricionalID
) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + requerimientoNutricionalID)
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


//Servicio que crea un requerimientoNutricional
export async function createRequerimientoNutricionales(
  requerimientoNutricional
) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, requerimientoNutricional)
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

//Servicio que actualiza un requerimientoNutricional
export async function updateRequerimientoNutricionales(
  requerimientoNutricional
) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/update", requerimientoNutricional)
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

//Servicio que elimina un requerimientoNutricional
export async function deleteRequerimientoNutricionales(
  requerimientoNutricionaL
) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/delete", requerimientoNutricionaL)
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
