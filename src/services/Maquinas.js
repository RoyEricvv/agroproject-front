import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "equipos";

//Servicio que devuelve todos los equipos
export async function getAllMaquinasGranja(granja_id) {
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
//Servicio que devuelve todos los equipos de un usuario
export async function getAllMaquinasUsuario(usuario_id, tipo) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + usuario_id + "/" + tipo + "/all")
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

//Servicio que devuelve un equipo
export async function getOneMaquina(equipo_id) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + equipo_id)
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

//Servicio que crea nuevo equipo
export async function createMaquinas(equipo) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, equipo)
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

//Servicio que actualiza una equipo mediante ID
export async function updateMaquinas(equipo) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .put(url + "/" + equipo.id, equipo)
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

//Servicio que elimina una equipo
export async function deleteMaquinas(maquinaID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .delete(url + "/" + maquinaID)
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
