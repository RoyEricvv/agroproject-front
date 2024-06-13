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
      <v-btn class="secondary" @click="newItem()">Añadir Restriccion</v-btn
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
      :selectableTable="false"
    />
    <v-dialog v-model="modalDialog" max-width="800px">
      <v-card>
        <div v-if="!alert">
          <v-container fluid>
            <div>
              <v-card-title class="headline">
                {{ accionModal }} Restriccion
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col v-if="accionModal != 'Editar'" cols="12" md="4">
                    <v-autocomplete
                      v-model="itemEstandar.especie"
                      :items="selectEspecie"
                      item-text="nombre"
                      item-value="id"
                      label="Especie"
                      v-on:change="loadEtapa"
                      outline
                      placeholder="Especie"
                      return-object
                      hide-no-data
                    ></v-autocomplete>
                  </v-col>
                  <v-col v-if="accionModal != 'Editar'" cols="12" md="4">
                    <v-select
                      :disabled="especieElegido"
                      v-model="itemEstandar.etapa_vida_id"
                      :items="selectEtapa"
                      item-value="id"
                      label="Semana de Etapa de Vida"
                      outline
                      placeholder="Semana de Etapa de Vida"
                    >
                      <template slot="selection" slot-scope="data">
                        Etapa de la semana
                        {{ data.item.semana_vida_referencial_inicial }} a
                        {{ data.item.semana_vida_referencial_final }}
                      </template>
                      <template slot="item" slot-scope="data">
                        Etapa de la semana
                        {{ data.item.semana_vida_referencial_inicial }} a
                        {{ data.item.semana_vida_referencial_final }}
                      </template>
                    </v-select>
                  </v-col>
                  <v-col v-if="accionModal == 'Editar'" cols="12" md="4">
                    <v-text-field
                      v-model="itemEstandar.especie.nombre"
                      disabled
                      outline
                      label="Especie"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="accionModal == 'Editar'" cols="12" md="4">
                    <v-text-field
                      v-model="
                        itemEstandar.etapa_vida.semana_vida_referencial_inicial
                      "
                      disabled
                      outline
                      label="Semana de Etapa de Vida"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      type="number"
                      v-model.number="itemEstandar.porcentaje_permitido"
                      label="Porcentaje Permitido"
                      min="0"
                      outline
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
                La transacción se realizó exitosamente.
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
import { getAllEtapaVida } from "@/services/EtapaVida.js";
import {
  getAllRestricciones,
  createRestriccion,
  updateRestriccion,
  deleteRestriccion
} from "@/services/Restriccion.js";
import { getAllEspecies } from "@/services/Especie.js";
export default {
  name: "Restriccion",
  props: {
    prop_insumo_id: Number,
    prop_insumo_nombre: String
  },
  components: {
    TableMain
  },
  data() {
    return {
      headers: [
        {
          text: "Especie",
          align: "start",
          value: "especie.nombre",
          width: "20%"
        },
        {
          text: "Etapa Semana Inicial",
          value: "etapa_vida.semana_vida_referencial_inicial",
          width: "15%",
          align: "center"
        },
        {
          text: "Etapa Semana Final",
          value: "etapa_vida.semana_vida_referencial_final",
          width: "15%",
          align: "center"
        },
        {
          text: "Porcentaje Permitido",
          value: "porcentaje_permitido",
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
      insumo_id: this.prop_insumo_id,
      title: this.prop_insumo_nombre,
      descrip: "Restricción de insumo por etapa de crecimiento de las especies",
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
      selectEspecie: [],
      selectEtapa: [],
      warning: false,
      mensajeError: ""
    };
  },
  created() {
    this.loadData();
    this.loadSelect();
  },
  computed: {
    validar() {
      if (
        this.itemEstandar.especie_id == 0 ||
        this.itemEstandar.porcentaje_permitido == 0 ||
        this.itemEstandar.porcentaje_permitido > 100
      ) {
        return true;
      } else {
        return false;
      }
    },
    especieElegido() {
      if (this.itemEstandar.especie_id == 0) {
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
      getAllRestricciones(this.insumo_id).then(Response => {
        this.tableRequestStatus = Response.status;
        if (Response.status == 200) {
          Response.data.restricciones.map(item => {
            this.content.push(item);
          });
        }
        this.loading = false;
      });
    },
    loadSelect: function() {
      this.selectEspecie = [];
      getAllEspecies().then(Response => {
        if (Response.status != 200) {
          this.alert = true;
          this.state = false;
          this.mensajeError = Response.data.Mensaje;
        } else {
          Response.data.especies.map(item => {
            this.selectEspecie.push(item);
          });
        }
      });
    },
    loadEtapa(item) {
      this.itemEstandar.especie_id = item.id;
      this.selectEtapa = [];
      getAllEtapaVida(this.itemEstandar.especie_id).then(Response => {
        if (Response.status != 200) {
          this.alert = true;
          this.state = false;
          this.mensajeError = Response.data.Mensaje;
        } else {
          Response.data.etapaVida.map(item => {
            this.selectEtapa.push(item);
          });
        }
      });
    },
    newItem: function() {
      this.accionModal = "Añadir";
      this.itemEstandar = {
        porcentaje_permitido: 0,
        especie_id: 0,
        etapa_vida_id: 0,
        insumo_id: this.insumo_id
      };
      this.alert = false;
      this.state = false;
      this.warning = false;
      this.modalDialog = true;
      this.loadSelect();
      console.log("Añadir");
    },
    enviarData: function() {
      if (this.accionModal === "Añadir") {
        createRestriccion(this.itemEstandar).then(Response => {
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
        updateRestriccion(this.itemEstandar).then(Response => {
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
      console.log(item);
      if (accion === "Editar") {
        this.accionModal = "Editar";
        this.alert = false;
        this.state = false;
        this.modalDialog = true;
        this.loadSelect();
      } else {
        deleteRestriccion(this.itemEstandar).then(Response => {
          if (Response.status == 200) {
            this.alert = true;
            this.state = true;
            this.modalDialog = true;
          } else {
            this.alert = true;
            this.state = false;
            this.modalDialog = true;
            this.mensajeError = Response.data.Mensaje;
          }
          this.loadData();
          this.tablaKey += 1;
        });
      }
    }
  }
};
</script>
