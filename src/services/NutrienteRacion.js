import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "nutrienteRacion";

//Servicio que devuelve todos los contenidoRaciones
export async function getAllNutrienteRaciones(racionId) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + racionId + "/all")
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
