import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "perfiles";

//Servicio que devuelve todos los usuarios
export async function getAllProfiles() {
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