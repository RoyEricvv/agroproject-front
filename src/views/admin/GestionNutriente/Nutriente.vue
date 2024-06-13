<template>
  <v-container
    class="primary"
    fluid
    style="lef-margin: 0px; padding: 0px; width: 95%"
    :key="tablaKey"
  >
    <v-col class="text-right">
      <v-btn class="secondary" @click="newItem()">Nuevo Nutriente</v-btn
      >&nbsp;&nbsp;&nbsp;
    </v-col>
    <TableMain
      :titleT="title"
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
                {{ accionModal }} Nutriente
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
                        maxlength="100"
                        :rules="reglasNombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="itemEstandar.abreviatura"
                        label="Abreviatura"
                        outlined
                        required
                        counter
                        maxlength="45"
                        :rules="reglasAbreviatura"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select
                        v-model="itemEstandar.unidad"
                        :items="listaUnidad"
                        outlined
                        item-text="nombre"
                        item-value="id"
                        label="Unidad"
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
  </v-container>
</template>
<script>
import TableMain from "@/components/TableMain.vue";
import {
  getAllNutrientes,
  createNutrientes,
  updateNutrientes
} from "@/services/Nutriente.js";
export default {
  name: "animales",
  components: {
    TableMain
  },
  data() {
    return {
      reglasNombre: [v => v.length <= 100 || "Máximo 100 Caracteres"],
      reglasAbreviatura: [v => v.length <= 45 || "Máximo 45 Caracteres"],
      headers: [
        {
          text: "Nombre",
          align: "start",
          value: "nombre",
          width: "35%"
        },
        {
          text: "Abreviatura",
          align: "start",
          value: "abreviatura",
          width: "20%"
        },
        {
          text: "Unidad",
          align: "start",
          value: "unidad",
          width: "25%"
        },
        {
          text: "Acciones",
          value: "actions",
          width: "20%",
          align: "center"
        }
      ],
      title: "Nutriente",
      descrip: "Tabla Maestro de Nutriente",
      accionModal: "Crear",
      action: [{ description: "Editar" }],
      itemEstandar: {},
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
      listaUnidad: [
        { id: 0, nombre: "Porcentaje" },
        { id: 1, nombre: "Gramos/kg" },
        { id: 2, nombre: "kcal/kg" },
        { id: 3, nombre: "PPM" },
        { id: 4, nombre: "mg/kg" }
      ]
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
      getAllNutrientes().then(Response => {
        this.tableRequestStatus = Response.status;
        if (Response.status == 200) {
          Response.data.nutrientes.map(item => {
            this.content.push(item);
          });
        }
        this.loading = false;
      });
    },
    enviarData: function() {
      if (this.accionModal === "Crear") {
        createNutrientes(this.itemEstandar).then(Response => {
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
        updateNutrientes(this.itemEstandar).then(Response => {
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
        nombre: "",
        abreviatura: "",
        unidad: 0
      };
      this.alert = false;
      this.state = false;
      this.modalDialog = true;
      console.log("Nuevo");
    },
    accionItem: function(item, accion) {
      console.log("accion: " + accion);

      if (accion === "Editar") {
        this.accionModal = "Editar";
        this.itemEstandar = item;
        this.alert = false;
        this.state = false;
        this.modalDialog = true;
      }
    }
  }
};
</script>
