import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "usuarios";

//Servicio que devuelve todos los usuarios
export async function getAllUsers() {
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

//Servicio que devuelve un usuario
export async function getOneUser(username) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + username)
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

//Servicio que crea un usuario
export async function createUser(usuario) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, usuario)
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

//Servicio que actualiza un usuario
export async function updateUser(usuario) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/" + usuario.id, usuario)
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

//Servicio que elimina un usuario
export async function deleteUser(usuarioID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + usuarioID + "/delete")
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
