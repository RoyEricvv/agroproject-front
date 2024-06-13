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
        <v-card-actions>
          <v-btn
            align="center"
            justify="center"
            color="blue-grey"
            @click="registrar()"
            >Registrarse</v-btn
          >
          <p class="forgot-password text-right">
            Ya te encuentras registrado?
            <router-link :to="{ name: 'login' }">Iniciar Sesión</router-link>
          </p>
        </v-card-actions>
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
      color: "#009975",
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
