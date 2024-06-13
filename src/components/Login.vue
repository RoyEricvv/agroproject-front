<template>
  <div
    style="width: 100%; height: 100%;"
    align="center"
    justify="center"
    class="vue-tempalte"
    v-bind:style="{ backgroundColor: color }"
  >
    <div style="margin-top: 5%;">
      <v-card
        outlined
        max-width="500"
        align="center"
        class="mx-auto"
        justify="center"
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
              label="Username"
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
        <v-card-actions>
          <v-btn
            align="center"
            justify="center"
            color="blue-grey"
            @click="logIn()"
            >Iniciar Sesión</v-btn
          >

        </v-card-actions>
        <br/>
        <p class="forgot-password text-left">
            ¿No tienes una cuenta?
            <router-link :to="{ name: 'register' }">Crear cuenta</router-link>
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
      color: "#FFFFFF",
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
          this.mensaje = "Username o contraseña incorrecta";
        }
      });
    }
  }
};
</script>
