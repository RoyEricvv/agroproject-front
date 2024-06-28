<template>
  <v-container
    class="fondo"
    fluid
    style="lef-margin: 0px; padding: 0px; width: 95%"
  >
    <div v-if="modo == 1">
      <v-col class="text-right">
        <v-btn class="secondary" @click="newItem()">Nuevo Insumo</v-btn
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
                  {{ accionModal }} Insumo
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4">
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
                      <v-col cols="12" md="4">
                        <v-checkbox
                          :disabled="accionModal == 'Editar'"
                          v-model="itemEstandar.es_aditivo"
                          label="Aditivo"
                          outlined
                        ></v-checkbox>
                      </v-col>
                      <v-col
                        v-if="
                          accionModal != 'Editar' && !itemEstandar.es_aditivo
                        "
                        cols="12"
                        md="4"
                      >
                        <v-text-field
                          type="number"
                          v-model.number="itemEstandar.materia_seca"
                          label="% Materia Seca"
                          max="100"
                          outlined
                          required
                          suffix="%"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </div>
              <v-divider></v-divider>
              <v-card-actions style="margin-top: 16px">
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
    <div v-if="modo == 2">
      <ContenidoNutricional
        :prop_insumo_id="insumoId"
        :prop_insumo_nombre="insumoNombre"
        v-on:regresar="regresar"
      />
    </div>
    <div v-if="modo == 3">
      <Restriccion
        :prop_insumo_id="insumoId"
        :prop_insumo_nombre="insumoNombre"
        v-on:regresar="regresar"
      />
    </div>
    <div v-if="modo == 4">
      <Aditivo
        :prop_aditivo_id="insumoId"
        :prop_aditivo_nombre="insumoNombre"
        v-on:regresar="regresar"
      />
    </div>
  </v-container>
</template>
<script>
import TableMain from "@/components/TableMain.vue";
import ContenidoNutricional from "@/views/admin/GestionContenido/ContenidoNutricional.vue";
import Restriccion from "@/views/admin/GestionContenido/Restriccion.vue";
import Aditivo from "@/views/admin/GestionContenido/Aditivo.vue";
import {
  getAllInsumos,
  getOneInsumos,
  createInsumos,
  updateInsumos
} from "@/services/Insumo.js";
export default {
  name: "Insumo",
  components: {
    TableMain,
    ContenidoNutricional,
    Restriccion,
    Aditivo
  },
  data() {
    return {
      reglasNombre: [v => v.length <= 45 || "Máximo 45 Caracteres"],
      headers: [
        {
          text: "Nombre",
          align: "start",
          value: "nombre",
          width: "40%"
        },
        {
          text: "Aditivo",
          align: "center",
          value: "es_aditivo",
          width: "10%"
        },
        {
          text: "Acciones",
          value: "actions",
          width: "50%",
          align: "center"
        }
      ],
      title: "Insumos",
      descrip: "Tabla Maestro de Insumos",
      accionModal: "Crear",
      action: [
        { description: "Editar" },
        { description: "Contenido" },
        { description: "Restricción" },
        { description: "Proporción" }
      ],
      itemEstandar: {
        id: 0,
        nombre: "",
        es_aditivo: false
      },
      modo: 1,
      insumoId: 0,
      insumoNombre: 0,
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
      materiaseca: { cantidad: 0 },
      alert: false,
      state: false,
      tutorsMails: [],
      tutorsSelected: [],
      DeleteTutorsDialog: false
    };
  },
  created() {
    this.loadData(); //
  },
  computed: {
    validar() {
      if (
        (!this.itemEstandar.es_aditivo &&
          (this.itemEstandar.materia_seca == "" ||
            this.itemEstandar.materia_seca > 100)) ||
        this.itemEstandar.nombre == ""
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
      getAllInsumos(0).then(Response => {
        this.tableRequestStatus = Response.status;
        if (Response.status == 200) {
          Response.data.insumos.map(item => {
            this.content.push(item);
          });
        }
        this.loading = false;
      });
    },
    enviarData: function() {
      if (this.accionModal === "Crear") {
        //A crear Insumo añadir materia Seca
        createInsumos(this.itemEstandar).then(Response => {
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
        updateInsumos(this.itemEstandar).then(Response => {
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
    regresar() {
      this.modo = 1;
    },
    newItem: function() {
      this.accionModal = "Crear";
      this.itemEstandar = {
        id: 0,
        nombre: "",
        es_aditivo: false,
        materia_seca: 0
      };
      this.alert = false;
      this.state = false;
      this.modalDialog = true;
      console.log("Nuevo");
    },
    accionItem: function(item, accion) {
      console.log("accion: " + accion);

      if (accion == "Contenido") {
        console.log(item);
        this.insumoId = item.id;
        this.insumoNombre = item.nombre;
        this.modo = 2;
      } else if (accion === "Editar") {
        getOneInsumos(item.id).then(Response => {
          if (Response.status == 200) {
            this.accionModal = "Editar";
            this.itemEstandar = Response.data.insumo;
            this.alert = false;
            this.state = false;
            this.modalDialog = true;
          } else {
            this.alert = true;
            this.state = false;
            this.modalDialog = true;
          }
        });
      } else if (accion === "Restricción") {
        console.log(item);
        this.insumoId = item.id;
        this.insumoNombre = item.nombre;
        this.modo = 3;
      } else if (accion === "Proporción") {
        console.log(item);
        this.insumoId = item.id;
        this.insumoNombre = item.nombre;
        this.modo = 4;
      }
    }
  }
};
</script>
