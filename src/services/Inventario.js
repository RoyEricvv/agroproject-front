import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "inventarios";

//Servicio que devuelve todos los inventarios
export async function getAllInventarios(usuarioId) {
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

//Servicio que devuelve todos los inventarios
export async function getInventariosRestriccion(usuarioId, especieId, etapaId) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/disponible/" + usuarioId + "/" + especieId + "/" + etapaId)
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

//Servicio que devuelve todos los inventarios
export async function getAllInventariosInsumo(usuarioId) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + usuarioId + "/insumo")
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

//Servicio que devuelve un inventario
/*export async function getOneInventarios(inventarioID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + inventarioID)
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

//Servicio que crea un inventario
export async function createInventarios(inventario) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, inventario)
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

//Servicio que actualiza un inventario
export async function updateInventarios(inventario) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/update", inventario)
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

//Servicio que elimina un inventario
export async function deleteInventarios(inventario) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/delete", inventario)
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
