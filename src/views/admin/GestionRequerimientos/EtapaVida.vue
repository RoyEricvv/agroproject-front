<template>
  <div>
    <div v-if="modo == 1">
      <v-row class="mb-2">
        <v-btn class="secondary" @click="$emit('regresar')">
          <v-icon class="mr-2">
            mdi-arrow-left-thick
          </v-icon>
        </v-btn>
      </v-row>
      <v-col class="text-right">
        <v-btn class="secondary" @click="newItem()"
          >Añadir Etapa de Vida de la Especie</v-btn
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
                  {{ accionModal }} Etapa de Vida
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          type="number"
                          v-model.number="
                            itemEstandar.semana_vida_referencial_inicial
                          "
                          label="Semana Vida Referencial Inicial"
                          min="0"
                          outlined
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          :disabled="semanaInicial"
                          type="number"
                          v-model.number="
                            itemEstandar.semana_vida_referencial_final
                          "
                          label="Semana Vida Referencial Final"
                          :min="itemEstandar.semana_vida_referencial_inicial"
                          outlined
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field
                          type="number"
                          v-model.number="itemEstandar.peso_vivo_referencial"
                          label="Peso Vivo Referencial"
                          outlined
                          min="0"
                          required
                          suffix="kg"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          type="number"
                          v-model.number="itemEstandar.talla_referencial"
                          label="Talla Referencial"
                          outlined
                          min="0"
                          required
                          suffix="metros"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          type="number"
                          v-model.number="itemEstandar.cantidad_MS_referencial"
                          label="Cantidad de Ingesta de MS Referencial"
                          outlined
                          min="0"
                          required
                          suffix="kg"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row style="color:red;" v-if="warning">
                      <v-col cols="4">
                        <v-subheader
                          >Es necesario completar los campos</v-subheader
                        >
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </div>
              <v-divider></v-divider>
              <v-card-actions>
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
                </v-alert>
              </v-row>
            </v-container>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <div v-else>
      <Requerimientos
        :prop_etapaVida_id="etapaVidaId"
        :prop_etapaVida_semana="etapaVidaSemana"
        :prop_especie_nombre="title"
        v-on:regresar="regresarRequerimiento"
      />
    </div>
  </div>
</template>
<script>
import TableMain from "@/components/TableMain.vue";
import Requerimientos from "./RequerimientoNutricional";
import {
  getAllEtapaVida,
  createEtapaVida,
  updateEtapaVida,
  deleteEtapaVida
} from "@/services/EtapaVida.js";
export default {
  name: "EtapaVida",
  props: {
    prop_especie_id: Number,
    prop_especie_nombre: String
  },
  components: {
    TableMain,
    Requerimientos
  },
  data() {
    return {
      semanaFinalRegla: [
        v => !!v || "Este campo es requerido",
        v =>
          v < this.semana_vida_referencial_inicial ||
          "La semana final debe ser mayor a semana inicial."
      ],
      headers: [
        {
          text: "Semana de Vida Referencial Inicial",
          align: "start",
          value: "semana_vida_referencial_inicial",
          width: "20%"
        },
        {
          text: "Semana de Vida Referencial Final",
          align: "start",
          value: "semana_vida_referencial_final",
          width: "20%"
        },
        {
          text: "Peso Vivo Referencial (KG)",
          value: "peso_vivo_referencial",
          width: "15%",
          align: "center"
        },
        {
          text: "Talla Referencial (metros)",
          value: "talla_referencial",
          width: "15%",
          align: "center"
        },
        {
          text: "Ingesta Referencial (Kg)",
          value: "cantidad_MS_referencial",
          width: "15%",
          align: "center"
        },
        {
          text: "Acciones",
          value: "actions",
          width: "15%",
          align: "center"
        }
      ],
      especie_id: this.prop_especie_id,
      title: this.prop_especie_nombre,
      descrip: "Fases o etapas de vida de la especie",
      tablaKey: 0,
      content: [],
      tableRequestStatus: 200,
      modalRequestStatus: 200,
      number: 10,
      loading: true,
      action: [{ description: "Editar" }, { description: "Requerimiento" }],
      modalDialog: false,
      accionModal: " ",
      itemEstandar: {},
      alert: false,
      state: false,
      selectNutriente: [],
      warning: false,
      modo: 1,
      etapaVidaId: 0,
      etapaVidaSemana: 0
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    validar() {
      if (
        this.itemEstandar.semana_vida_referencial_inicial == 0 ||
        this.itemEstandar.semana_vida_referencial_final == 0 ||
        this.itemEstandar.peso_vivo_referencial == 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    semanaInicial() {
      if (this.itemEstandar.semana_vida_referencial_inicial == 0) {
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
      getAllEtapaVida(this.especie_id).then(Response => {
        this.tableRequestStatus = Response.status;
        if (Response.status == 200) {
          Response.data.etapaVida.map(item => {
            this.content.push(item);
          });
        }
        this.loading = false;
      });
    },
    newItem: function() {
      this.accionModal = "Añadir";
      this.itemEstandar = {
        peso_vivo_referencial: 0,
        talla_referencial: 0,
        semana_vida_referencial_inicial: 0,
        semana_vida_referencial_final: null,
        cantidad_MS_referencial: 0,
        especie_id: this.especie_id
      };
      this.alert = false;
      this.state = false;
      this.warning = false;
      this.modalDialog = true;
      console.log("Añadir");
    },
    regresarRequerimiento() {
      this.modo = 1;
    },
    enviarData: function() {
      if (this.accionModal === "Añadir") {
        createEtapaVida(this.itemEstandar).then(Response => {
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
        updateEtapaVida(this.itemEstandar).then(Response => {
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
    accionItem: function(item, accion) {
      console.log("accion: " + accion);

      if (accion === "Editar") {
        this.accionModal = "Editar";
        this.itemEstandar = item;
        this.alert = false;
        this.state = false;
        this.modalDialog = true;
      } else if (accion === "Requerimiento") {
        this.modo = 2;
        this.etapaVidaId = item.id;
        this.etapaVidaSemana = item.semana_vida_referencial_inicial;
      } else {
        deleteEtapaVida(item.id).then(Response => {
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
