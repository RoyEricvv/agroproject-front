import axios from "axios";
//URL base,
const url = process.env.VUE_APP_API_URL + "login";

//Servicio que verifica el usuario
export async function getValidate(user) {
  var responseData;
  JSON.stringify(user);
  //Get con parámetro en el url
  await axios
    .post(url, user)
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
