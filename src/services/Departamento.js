import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "departamento";

//Servicio que devuelve todos los departamentos
export async function getAllDepartamentos() {
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
