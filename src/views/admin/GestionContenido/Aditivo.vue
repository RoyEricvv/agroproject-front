<template>
  <div>
    <v-row class="mb-2">
      <v-btn class="secondary" @click="$emit('regresar')">
        <v-icon class="mr-2">
          mdi-arrow-left-thick
        </v-icon>
      </v-btn>
    </v-row>
    <v-col class="text-right">
      <v-btn class="secondary" @click="newItem()">Añadir Relación</v-btn
      >&nbsp;&nbsp;&nbsp;
    </v-col>
    <TableMain
      :titleT="prop_aditivo_nombre"
      :key="tablaKey"
      :headersT="headers"
      :contentT="content"
      :numberT="number"
      :loading="loading"
      :statusT="tableRequestStatus"
      :actionsT="action"
      :requiereCategoriaT="false"
      v-on:show-modal="accionItem"
      :selectableTable="false"
    />
    <v-dialog v-model="modalDialog" max-width="800px">
      <v-card>
        <div v-if="!alert">
          <v-container fluid>
            <div>
              <v-card-title class="headline">
                {{ accionModal }} Relación
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col v-if="accionModal != 'Editar'" cols="12" md="6">
                    <v-autocomplete
                      v-model="insumoAux"
                      :items="selectInsumo"
                      item-text="nombre"
                      item-value="nombre"
                      label="Insumo"
                      outlined
                      return-object
                      hide-no-data
                    ></v-autocomplete>
                  </v-col>
                  <v-col v-if="accionModal == 'Editar'" cols="12" md="6">
                    <v-text-field
                      v-model="itemEstandar.insumo.nombre"
                      disabled
                      label="Insumo"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      type="number"
                      v-model.number="itemEstandar.relacion"
                      label="Porcentaje"
                      min="0"
                      outlined
                      required
                      suffix="%"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row style="color:red;" v-if="warning">
                  <v-col cols="4">
                    <v-subheader>Es necesario completar los campos</v-subheader>
                  </v-col>
                </v-row>
              </v-card-text>
            </div>
            <v-divider></v-divider>
            <v-card-actions style="margin-top: 16px">
              <v-col class="text-right">
                <v-btn
                  :disabled="validar"
                  class="secondary"
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
                <br />
                {{ mensajeError }}
              </v-alert>
            </v-row>
          </v-container>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import TableMain from "@/components/TableMain.vue";
import { getAllInsumosNoAditivos } from "@/services/Insumo.js";
import {
  getAllAditivos,
  createAditivo,
  updateAditivo,
  deleteAditivo
} from "@/services/Aditivo.js";
export default {
  name: "Aditivo",
  props: {
    prop_aditivo_id: Number,
    prop_aditivo_nombre: String
  },
  components: {
    TableMain
  },
  data() {
    return {
      headers: [
        {
          text: "Insumo",
          align: "start",
          value: "insumo.nombre",
          width: "30%"
        },
        {
          text: "Porcentaje",
          value: "relacion",
          width: "30%",
          align: "center"
        },
        {
          text: "Acciones",
          value: "actions",
          width: "40%",
          align: "center"
        }
      ],
      insumo_id: this.prop_insumo_id,
      title: this.prop_insumo_nombre,
      descrip: "Relación de aditivos con los insumos.",
      tablaKey: 0,
      content: [],
      tableRequestStatus: 200,
      modalRequestStatus: 200,
      number: 20,
      loading: true,
      action: [{ description: "Editar" }, { description: "Eliminar" }],
      modalDialog: false,
      accionModal: " ",
      itemEstandar: {},
      alert: false,
      state: false,
      selectInsumo: [],
      warning: false,
      mensajeError: "",
      insumoAux: {}
    };
  },
  created() {
    this.loadData();
    this.loadSelect();
  },
  computed: {
    validar() {
      if (
        this.insumoAux == null ||
        this.itemEstandar.relacion == 0 ||
        this.itemEstandar.relacion > 100
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
      getAllAditivos(this.prop_aditivo_id).then(Response => {
        this.tableRequestStatus = Response.status;
        if (Response.status == 200) {
          Response.data.aditivos.map(item => {
            this.content.push(item);
          });
        }
        this.loading = false;
      });
    },
    loadSelect: function() {
      this.selectInsumo = [];
      getAllInsumosNoAditivos().then(Response => {
        if (Response.status != 200) {
          this.alert = true;
          this.state = false;
          this.mensajeError = Response.data.Mensaje;
        } else {
          Response.data.insumos.map(item => {
            this.selectInsumo.push(item);
          });
        }
      });
    },
    newItem: function() {
      this.accionModal = "Añadir";
      this.itemEstandar = {
        relacion: 0,
        aditivo_id: this.prop_aditivo_id,
        insumo_id: 0
      };
      this.alert = false;
      this.state = false;
      this.warning = false;
      this.modalDialog = true;
      this.loadSelect();
      console.log("Añadir");
    },
    enviarData: function() {
      this.itemEstandar.insumo_id = this.insumoAux.id;
      if (this.accionModal === "Añadir") {
        createAditivo(this.itemEstandar).then(Response => {
          if (Response.status == 200) {
            this.alert = true;
            this.state = true;
          } else {
            this.alert = true;
            this.state = false;
            this.mensajeError = Response.data.Mensaje;
          }
          this.loadData();
          this.tablaKey += 1;
        });
      } else {
        updateAditivo(this.itemEstandar).then(Response => {
          if (Response.status == 200) {
            this.alert = true;
            this.state = true;
          } else {
            this.alert = true;
            this.state = false;
            this.mensajeError = Response.data.Mensaje;
          }
          this.loadData();
          this.tablaKey += 1;
        });
      }
    },
    accionItem: function(item, accion) {
      console.log("accion: " + accion);
      this.itemEstandar = item;
      this.insumoAux = item.insumo;
      console.log(item);
      if (accion === "Editar") {
        this.accionModal = "Editar";
        this.alert = false;
        this.state = false;
        this.modalDialog = true;
        this.loadSelect();
      } else {
        deleteAditivo(this.itemEstandar).then(Response => {
          if (Response.status == 200) {
            this.alert = true;
            this.state = true;
            this.modalDialog = true;
          } else {
            this.alert = true;
            this.state = false;
            this.mensajeError = Response.data.Mensaje;
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
