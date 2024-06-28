<template>
  <v-container
    class="fondo"
    fluid
    style="lef-margin: 0px; padding: 0px; width: 95%"
  >
    <div v-if="modo == 1">
      <v-col class="text-right">
        <v-btn class="secondary" @click="newItem()">Nueva Especie</v-btn
        >&nbsp;&nbsp;&nbsp;
      </v-col>
      <TableMain
        :titleT="title"
        :key="tablaKey"
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
                  {{ accionModal }} Especie
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="itemEstandar.nombre"
                          label="Nombre"
                          outlined
                          required
                          counter
                          maxlength="45"
                          :rules="reglasNombre"
                        ></v-text-field>
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
                  style="margin-bottom: 0px; width: 100%"
                >
                  La transacción se realizó exitosamente
                </v-alert>
              </v-row>
              <v-row v-else align="center" justify="center">
                <v-alert
                  outlined
                  type="error"
                  text
                  style="margin-bottom: 0px; width: 100%"
                >
                  Ocurrio un error interno inesperado.
                </v-alert>
              </v-row>
            </v-container>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <div v-else>
      <EtapaVida
        :prop_especie_id="especieId"
        :prop_especie_nombre="especieNombre"
        v-on:regresar="regresar"
      />
    </div>
  </v-container>
</template>
<script>
import TableMain from "@/components/TableMain.vue";
import EtapaVida from "./EtapaVida.vue";
import {
  getAllEspecies,
  getOneEspecies,
  createEspecies,
  updateEspecies,
  deleteEspecies
} from "@/services/Especie.js";
export default {
  name: "Especie",
  components: {
    TableMain,
    EtapaVida
  },
  data() {
    return {
      reglasNombre: [v => v.length <= 45 || "Máximo 45 Caracteres"],
      headers: [
        {
          text: "Nombre",
          align: "start",
          value: "nombre",
          width: "80%"
        },
        {
          text: "Acciones",
          value: "actions",
          width: "20%",
          align: "center"
        }
      ],
      title: "Especies",
      descrip: "Tabla Maestro de Especies",
      accionModal: "Crear",
      action: [{ description: "Editar" }, { description: "Etapas" }],
      modo: 1,
      itemEstandar: {
        id: 0,
        nombre: ""
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
      currentItem: {},
      alert: false,
      state: false,
      especieId: 0,
      especieNombre: ""
    };
  },
  created() {
    this.loadData(); //equipos propuesta
  },
  computed: {
    validar() {
      if (this.itemEstandar.nombre == "") {
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
      getAllEspecies().then(Response => {
        this.tableRequestStatus = Response.status;
        if (Response.status == 200) {
          Response.data.especies.map(item => {
            this.content.push(item);
          });
        }
        this.loading = false;
      });
    },
    regresar() {
      this.modo = 1;
    },
    enviarData: function() {
      if (this.accionModal === "Crear") {
        createEspecies(this.itemEstandar).then(Response => {
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
        updateEspecies(this.itemEstandar).then(Response => {
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
    newItem: function() {
      this.accionModal = "Crear";
      this.itemEstandar = {
        id: 0,
        nombre: ""
      };
      this.alert = false;
      this.state = false;
      this.modalDialog = true;
      console.log("Nuevo");
    },
    accionItem: function(item, accion) {
      console.log("accion: " + accion);

      if (accion === "Editar") {
        getOneEspecies(item.id).then(Response => {
          if (Response.status == 200) {
            this.accionModal = "Editar";
            this.itemEstandar = Response.data.especie;
            this.alert = false;
            this.state = false;
            this.modalDialog = true;
          } else {
            this.alert = true;
            this.state = false;
            this.modalDialog = true;
          }
        });
      } else if (accion === "Etapas") {
        this.especieId = item.id;
        this.especieNombre = item.nombre;
        this.modo = 2;
      } else {
        deleteEspecies(item.id).then(Response => {
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
