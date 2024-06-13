import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "funcionFormular";

//Servicio que devuelve todo el historial de crecimiento de un animal
export async function verificarInventarioInicial(usuario_Id) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + usuario_Id + "/RevisarInventario")
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

//Servicio que devuelve todo el historial de crecimiento de un animal
export async function insertarInsumoEscazo(data) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/InsumoEscazo", data)
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

//Servicio que devuelve todo el historial de crecimiento de un animal
export async function insertarInsumoDisponible(data) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/InsumoDisponible", data)
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
//Servicio que devuelve todo el historial de crecimiento de un animal
export async function aplicarRacionFormulada(racion_Id, aditivo) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + racion_Id + "/" + aditivo + "/Aplicar")
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
//Servicio que devuelve todo el historial de crecimiento de un animal
export async function ejecutarAlgortimo(data) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/Algoritmo", data)
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
