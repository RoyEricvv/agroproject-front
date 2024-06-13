import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "materiaSeca";

//Servicio que devuelve todos las materias secas por departamento de un insumo
export async function getAllMateriaSeca(insumoId) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .get(url + "/" + insumoId + "/all")
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

//Servicio que actualizar una materia seca de un insumo en un departamento en específico
export async function updateMateriaSeca(materiaSeca) {
  var responseData;
  //Get con parámetro en el url
  await axios
    .post(url + "/update", materiaSeca)
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
