<template>
  <v-container
    class="primary"
    fluid
    style="lef-margin: 0px; padding: 0px; width: 95%"
    :key="tablaKey"
  >
    <v-col class="text-right">
      <v-btn class="secondary" @click="newUser()">Nuevo Usuario</v-btn
      >&nbsp;&nbsp;&nbsp;
    </v-col>
    <TableMain
      :titleT="title"
      v-bind:key="tablaKey"
      :headersT="headers"
      :contentT="content"
      :numberT="number"
      :loading="loading"
      :statusT="tableRequestStatus"
      :actionsT="action"
      :requiereCategoriaT="false"
      v-on:show-modal="accionItem"
    />
    <v-dialog v-model="modalDialog" max-width="800px">
      <v-card>
        <div v-if="!alert">
          <v-container fluid>
            <div>
              <v-card-title class="headline">
                {{ accionModal }} Usuario
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="usuarioEstandar.nombres"
                        label="Nombres"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="usuarioEstandar.apellidos"
                        label="Apellidos"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="usuarioEstandar.direccion"
                        label="Dirección"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <!--
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="usuarioEstandar.correo"
                    label="Correo"
                    required
                  ></v-text-field>
                </v-col>-->
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="usuarioEstandar.username"
                        label="Username"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="usuarioEstandar.perfil_id"
                        :items="listaPerfiles"
                        outlined
                        item-text="nombre"
                        item-value="id"
                        label="Perfil"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </div>
            <v-divider></v-divider>
            <v-card-actions>
              <v-col class="text-right">
                <v-btn
                  class="secondary"
                  :disabled="validar"
                  @click="enviarData()"
                  >Enviar</v-btn
                >
              </v-col>
            </v-card-actions>
          </v-container>
        </div>
        <div v-else>
          <v-container fluid>
            <v-row v-if="state" align="center" justify="center">
              <v-alert
                outlined
                type="success"
                text
                style="margin-bottom: 0px; width: 95%"
              >
                La transacción se realizó exitosamente
              </v-alert>
            </v-row>
            <v-row v-else align="center" justify="center">
              <v-alert
                outlined
                type="error"
                text
                style="margin-bottom: 0px; width: 95%"
              >
                Ocurrio un error interno inesperado.
              </v-alert>
            </v-row>
          </v-container>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import TableMain from "@/components/TableMain.vue";
import { getAllProfiles } from "@/services/Profile";
import {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
} from "@/services/Usuario.js";
export default {
  name: "tutors",
  components: {
    TableMain
  },
  data() {
    return {
      headers: [
        {
          text: "Nombre",
          align: "start",
          value: "nombres",
          width: "25%"
        },
        {
          text: "Apellido",
          value: "apellidos",
          width: "25%",
          align: "center"
        },
        {
          text: "Username",
          value: "username",
          width: "25%",
          align: "center"
        },
        {
          text: "Acciones",
          value: "actions",
          width: "25%",
          align: "center"
        }
      ],

      emailRules: [
        v => {
          if (!v || v.length < 1) return "Es necesario que este lleno";
          else if (v.length > 0) {
            for (let i = 0; i < v.length; i++) {
              if (
                !/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
                  v[i]
                )
              ) {
                this.emailValido = false;
                return "Email inválido";
              }
            }
            this.emailValido = true;
            return true;
          }
        }
      ],
      emailValido: true,
      title: "Usuarios",
      descrip: "Tabla Maestro de los usuarios",
      accionModal: "Crear",
      action: [{ description: "Editar" }, { description: "Alternar" }],
      usuarioEstandar: {
        password: "123456",
        perfil_id: 0,
        id: 0,
        nombres: "",
        username: "",
        apellidos: "",
        correo: "",
        direccion: ""
      },
      tablaKey: 0,
      content: [],
      selectedTeams: [],
      loading: false,
      number: 10,
      tableRequestStatus: 200,
      modalRequestStatus: 200,
      modalStatusDetail: "",
      TeamsDialog: false,
      modalDialog: false,
      teams: [],
      Categorys: ["Venta por internet", "Consultoría TI"],
      currentItem: {},
      alert: false,
      state: false,
      tutorsMails: [],
      tutorsSelected: [],
      DeleteTutorsDialog: false,
      listaPerfiles: []
    };
  },
  created() {
    this.loadData(); //equipos propuesta
    this.loadSelect();
  },
  computed: {
    validar() {
      if (
        this.usuarioEstandar.nombres == "" ||
        this.usuarioEstandar.apellidos == "" ||
        this.usuarioEstandar.username == "" ||
        this.usuarioEstandar.direccion == "" ||
        this.usuarioEstandar.perfil_id == 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    loadData() {
      this.content = [];
      this.loading = true;
      getAllUsers().then(Response => {
        this.tableRequestStatus = Response.status;
        if (Response.status == 200) {
          Response.data.usuarios.map(usuario => {
            this.content.push(usuario);
          });
        }
        this.loading = false;
      });
    },
    loadSelect() {
      this.listaPerfiles = [];
      getAllProfiles().then(Response => {
        if (Response.status == 200) {
          Response.data.perfiles.map(item => {
            this.listaPerfiles.push(item);
          });
        } else {
          this.alert = true;
          this.state = false;
        }
      });
    },
    enviarData: function() {
      if (this.accionModal === "Crear") {
        createUser(this.usuarioEstandar).then(Response => {
          if (Response.status == 200) {
            this.alert = true;
            this.state = true;
          } else {
            this.alert = true;
            this.state = false;
          }
          this.loadData();
          this.tablaKey += 1;
        });
      } else {
        updateUser(this.usuarioEstandar).then(Response => {
          if (Response.status == 200) {
            this.alert = true;
            this.state = true;
          } else {
            this.alert = true;
            this.state = false;
          }
          this.loadData();
          this.tablaKey += 1;
        });
      }
    },
    newUser: function() {
      this.accionModal = "Crear";
      (this.usuarioEstandar = {
        password: "123456",
        perfil_id: 0,
        id: 0,
        nombres: "",
        username: "",
        apellidos: "",
        //correo: "",
        direccion: "",
        activo: true
      }),
        (this.alert = false);
      this.state = false;
      this.modalDialog = true;
      console.log("Nuevo");
    },
    accionItem: function(item, accion) {
      console.log("accion: " + accion);
      this.usuarioEstandar = item;
      if (accion === "Editar") {
        getOneUser(item.username).then(Response => {
          if (Response.status == 200) {
            this.accionModal = "Editar";
            this.usuarioEstandar = Response.data.usuario;
            this.alert = false;
            this.state = false;
            this.modalDialog = true;
          } else {
            this.alert = true;
            this.state = false;
            this.modalDialog = true;
          }
        });
      } else {
        this.usuarioEstandar.activo = !this.usuarioEstandar.activo;
        deleteUser(item.id).then(Response => {
          if (Response.status == 200) {
            this.alert = true;
            this.state = true;
            this.modalDialog = true;
          } else {
            this.alert = true;
            this.state = false;
            this.modalDialog = true;
          }
          this.loadData();
          this.tablaKey += 1;
        });
      }
    }
  }
};
</script>
