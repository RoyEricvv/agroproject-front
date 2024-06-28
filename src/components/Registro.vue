<template>
  <div
    class="login-container"
    align="center"
    justify="center"
    v-bind:style="{ backgroundColor: color }"
  >
    <div style="margin-top: 5%;">
      <v-card
        outlined
        align="center"
        class="transparent-card"
        justify="center"
        elevation="14"
      >
        <v-card-text>
          <h1>Registrarse</h1>
          <div v-if="alert" style="color:red">
            <label>{{ mensaje }} </label>
          </div>
          <div class="form-group">
            <v-text-field
              v-model="usuario.nombres"
              type="text"
              name="Nombres"
              label="Nombre"
            ></v-text-field>
          </div>
          <div class="form-group">
            <v-text-field
              v-model="usuario.apellidos"
              type="text"
              name="Apellidos"
              label="Apellidos"
            ></v-text-field>
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
          <div class="form-group">
            <v-select
              v-model="usuario.perfil_id"
              :items="perfiles"
              item-text="nombre"
              item-value="id"
              label="Perfil"
            ></v-select>
          </div>
        </v-card-text>
        <v-card-actions
          style="display: flex; justify-content: center;"
        >
          <v-btn
            color="green"
            @click="registrar()"
            >Registrarse</v-btn
          >
        </v-card-actions>
        <p class="forgot-password text-center">
            Ya te encuentras registrado?
            <router-link :to="{ name: 'login' }" style="color: #008000;">Iniciar Sesión</router-link>
          </p>
      </v-card>
    </div>
  </div>
</template>

<script>
import { createUser } from "@/services/Usuario";
import { getAllProfiles } from "@/services/Profile";
export default {
  name: "Registro",
  computed: {
    noRegistrar() {
      if (
        this.usuario.nombres.length == 0 ||
        this.usuario.apellidos.length == 0 ||
        this.usuario.username.length == 0 ||
        this.usuario.password.length == 0 ||
        this.usuario.perfil_id.length == 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      color: "#f8f8f9",
      alert: false,
      error: false,
      mensaje: "",
      perfiles: [],
      usuario: {
        id: 0,
        nombres: "",
        username: "",
        apellidos: "",
        password: ""
      }
    };
  },
  created() {
    this.loadSelect();
  },
  methods: {
    registrar() {
      if (this.noRegistrar) {
        this.alert = true;
        this.mensaje = "Falta Completar Información";
      } else {
        console.log("Enviar data " + JSON.stringify(this.usuario));
        createUser(this.usuario).then(Response => {
          if (Response.status == 200) {
            this.$router.push("/login");
          } else if (Response.status == 401) {
            this.alert = true;
            this.mensaje = "Username ya utilizado";
          } else {
            this.alert = true;
            this.mensaje = "Falta Completar Información";
          }
        });
      }
    },
    loadSelect() {
      this.perfiles = [];
      getAllProfiles().then(Response => {
        if (Response.status == 200) {
          Response.data.perfiles.map(item => {
            this.perfiles.push(item);
          });
        } else {
          this.alert = true;
          this.mensaje = "Falta Perfiles";
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