import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "rubros";

//Servicio que devuelve todos los rubros
export async function getAllrubros(estado_rubro = null) {
    let responseData;
    let apiUrl = `${url}`;
    if (estado_rubro) {
        apiUrl += `?estado_rubro=${estado_rubro}`;
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

//Servicio que devuelve un rubro
export async function getOneRubro(rubro_id) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + rubro_id)
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

//Servicio que crea nuevo rubro
export async function createRubro(rubro) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url, rubro)
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

//Servicio que actualiza un rubro mediante ID
export async function updateRubro(rubro) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .put(url + "/" + rubro.id, rubro)
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

//Servicio que elimina un rubro
export async function deleteRubro(rubroID) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .delete(url + "/" + rubroID)
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
