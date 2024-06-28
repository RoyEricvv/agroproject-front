<template>
  <div
    
    align="center"
    justify="center"
    class="login-container"
    v-bind:style="{ backgroundColor: color }"
  >
    <div style="margin-top: 5%;">
      <v-card
        outlined
        align="center"
        justify="center"
        elevation="14"
        class="transparent-card"
      >

        <v-card-text>
          <h1>Login</h1>
          <div v-if="alert" style="color:red">
            <label>{{ mensaje }} </label>
          </div>
          <div class="form-group">
            <v-text-field
              v-model="usuario.username"
              type="text"
              name="Username"
              label="Usuario"
            ></v-text-field>
          </div>
          <div class="form-group">
            <v-text-field
              v-model="usuario.password"
              type="password"
              name="Contraseña"
              label="Contraseña"
            ></v-text-field>
          </div>
        </v-card-text>
        <v-card-actions
          style="display: flex; justify-content: center;"
        >
          <v-btn
            color="green"
            @click="logIn()"
            >Iniciar Sesión</v-btn>
        </v-card-actions>
        <p class="forgot-password text-center">
            ¿No tienes una cuenta?
            <router-link :to="{ name: 'register' }" style="color: #bdecb6;">Crear cuenta</router-link>
        </p>
      </v-card>
    </div>
  </div>
</template>

<script>
import { getValidate } from "@/services/Login";
export default {
  name: "Login",
  data() {
    return {
      color: "#f8f8f9",
      usuario: {
        username: "",
        password: ""
      },
      mensaje: "",
      alert: false
    };
  },
  methods: {
    logIn() {
      console.log("Enviar data " + JSON.stringify(this.usuario));
      // this.$router.push("/usuarioHome");

      getValidate(this.usuario).then(Response => {
        if (Response.status == 200) {
          console.log(Response.data.usuario);
          this.$store.dispatch("logIn", Response.data.usuario);
          console.log("value of:",Response.data.usuario.perfil.nombre)
          if (Response.data.usuario.perfil.nombre == "Administrador") {
            this.$router.push("/maestro");
          } else {
            this.$router.push("/usuarioHome");
          }
        } else {
          this.alert = true;
          this.mensaje = "Usuario o contraseña incorrecta";
        }
      });
    }
  }
};
</script>
<style>
.login-container {
  width: 100%;
  height: 100%;
  background-image: url('../assets/granja.jpg'); /* Ruta a tu imagen de fondo */
  background-size: cover; /* Ajusta la imagen para cubrir todo el contenedor */
  background-position: center; /* Centra la imagen */
  display: flex;
  justify-content: center;
}
.transparent-card {
  background-color: rgba(255, 255, 255, 0.8); /* Color blanco con 80% de opacidad */
  opacity: 0.8; /* Opacidad general del card */
  max-width: 500px; /* Ancho máximo del card */
  padding: 20px; /* Espaciado interno dentro del card */

}
</style>