import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "sanitarios";

//Servicio que devuelve todos los sanitarios
export async function getAllSanitariosGranja(granja_id) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/granja/" + granja_id )
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
//Servicio que devuelve todos los sanitarios de un usuario
export async function getAllSanitariosUsuario(usuario_id, estado_sanitario = null) {
    let responseData;
    let apiUrl = `${url}/usuario/${usuario_id}`;
    if (estado_sanitario) {
        apiUrl += `?estado_sanitario=${estado_sanitario}`;
    }
    //Get con parámetro en el url
    await axios
        .get(apiUrl)
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

//Servicio que devuelve un sanitario
export async function getOneSanitario(sanitario_id) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + sanitario_id)
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

//Servicio que crea nuevo sanitario
export async function createSanitario(sanitario) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, sanitario)
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

//Servicio que actualiza un sanitario mediante ID
export async function updateSanitario(sanitario) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .put(url + "/" + sanitario.id, sanitario)
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

//Servicio que elimina un sanitario
export async function deleteSanitario(sanitarioID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .delete(url + "/" + sanitarioID)
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
