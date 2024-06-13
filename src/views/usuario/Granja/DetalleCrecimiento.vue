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
      <v-row>
        <v-card style="width:100%">
          <v-card-title>
            Información del Animal
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="estadoAnimal"
                  label="Estado del animal"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="prop_animal.cantidad_actual"
                  label="Cantidad de animales actual"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="prop_animal.peso_animal_actual"
                  label="Peso en Total de animales"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="prop_animal.costo_racion"
                  label="Costo total de Raciones"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="prop_animal.costo_kg_animal"
                  label="Costo por KG de animales por raciones"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="prop_animal.precio_animal"
                  label="Precio estimado del animal"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="prop_animal.precio_kg_animal"
                  label="Precio Estimado por Kg vivo de animal"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-textarea
                  label="Comentario"
                  auto-grow
                  outlined
                  rows="1"
                  v-model="prop_animal.comentario"
                  row-height="15"
                  readonly
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-row>
      <br />
      <v-col v-if="prop_animal.estado_animal != 3" class="text-right">
        <v-btn class="secondary" @click="newItem()"
          >Nuevo Registro Crecimiento</v-btn
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
      <br />
      <TableMain
        :titleT="title2"
        :key="tablaKey2"
        :headersT="headers2"
        :contentT="contentFavorito"
        :numberT="number"
        :loading="loading2"
        :statusT="tableRequestStatus2"
        :actionsT="action2"
        :requiereCategoriaT="false"
        v-on:show-modal="accionItem2"
      />
      <v-dialog :key="modalKey" v-model="modalDialog" max-width="800px">
        <v-card>
          <div v-if="!alert">
            <v-container fluid>
              <div>
                <v-card-title class="headline">
                  {{ accionModal }} Registro Crecimiento
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          :disabled="accionModal != 'Crear'"
                          v-model.number="itemEstandar.semana_crecimiento"
                          label="Semana de Crecimiento"
                          outlined
                          type="number"
                          min="0"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model.number="itemEstandar.cantidad"
                          type="number"
                          outlined
                          label="Cantidad de animales"
                          min="0"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model.number="itemEstandar.peso_total"
                          type="number"
                          outlined
                          label="Peso Total"
                          min="0"
                          suffix="kg"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model.number="itemEstandar.altura_promedio"
                          type="number"
                          outlined
                          label="Altura Promedio (m.)"
                          min="0"
                          suffix="metros"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-textarea
                          label="Comentario"
                          auto-grow
                          outlined
                          rows="1"
                          v-model="itemEstandar.comentario"
                          row-height="15"
                          counter
                          maxlength="250"
                          :rules="reglasComentario"
                        ></v-textarea>
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
                    :disabled="registroNoValido"
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
    <div v-else>
      <DetalleRacionFormulada
        :prop_racion_id="itemEstandar2.id"
        :prop_racion_fecha="itemEstandar2.fecha_creacion"
        :prop_racion_costo_total="itemEstandar2.costo_total"
        :prop_racion_cantidad_total="itemEstandar2.cantidad_total"
        :prop_racion_estado="itemEstandar2.estado"
        :prop_racion_item="itemEstandar2"
        v-on:regresar="regresar2"
      />
    </div>
  </div>
</template>
<script>
import TableMain from "@/components/TableMain.vue";
import { getAllRacionFormuladasFavoritasEspecie } from "@/services/RacionFormulada.js";
import DetalleRacionFormulada from "@/views/usuario/racionFormulada/DetalleRacionFormulada.vue";
import {
  getAllHistorialCrecimiento,
  createHistorialCrecimiento,
  updateHistorialCrecimiento,
  deleteHistorialCrecimiento
} from "@/services/HistorialCrecimiento.js";
export default {
  name: "DetalleCrecimiento",
  props: {
    prop_animal_id: Number,
    prop_animal_nombre: String,
    prop_animal: Object,
    prop_usuario_id: Number
  },
  components: {
    TableMain,
    DetalleRacionFormulada
  },
  computed: {
    estadoAnimal() {
      if (this.prop_animal.estado_animal == 1) {
        return "Registrado";
      } else if (this.prop_animal.estado_animal == 2) {
        return "Seguimiento";
      } else {
        return "Contabilizado";
      }
    },
    registroNoValido() {
      if (
        this.itemEstandar.semana_crecimiento == 0 ||
        this.itemEstandar.cantidad == 0 ||
        this.itemEstandar.peso_total == 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      reglasComentario: [v => v.length <= 250 || "Máximo 250 Caracteres"],
      headers:
        this.prop_animal.estado_animal != 3
          ? [
              {
                text: "Semana Crecimiento",
                value: "semana_crecimiento",
                width: "5%",
                align: "start"
              },
              {
                text: "Peso Total (KG.)",
                value: "peso_total",
                width: "15%",
                align: "center"
              },
              {
                text: "Altura Promedio (M.)",
                value: "altura_promedio",
                width: "15%",
                align: "center"
              },
              {
                text: "Cantidad",
                value: "cantidad",
                width: "10%",
                align: "center"
              },
              {
                text: "Comentario",
                value: "comentario",
                width: "30%",
                align: "center"
              },
              {
                text: "Fecha Creación",
                value: "fecha_creacion",
                width: "15%",
                align: "center"
              },
              {
                text: "Acciones",
                value: "actions",
                width: "10%",
                align: "center"
              }
            ]
          : [
              {
                text: "Semana Crecimiento",
                value: "semana_crecimiento",
                width: "5%",
                align: "start"
              },
              {
                text: "Peso Total (KG.)",
                value: "peso_total",
                width: "15%",
                align: "center"
              },
              {
                text: "Altura Promedio (M.)",
                value: "altura_promedio",
                width: "15%",
                align: "center"
              },
              {
                text: "Cantidad",
                value: "cantidad",
                width: "10%",
                align: "center"
              },
              {
                text: "Comentario",
                value: "comentario",
                width: "40%",
                align: "center"
              },
              {
                text: "Fecha Creación",
                value: "fecha_creacion",
                width: "15%",
                align: "center"
              }
            ],
      modo: 1,
      animal_id: this.prop_animal_id,
      title: this.prop_animal_nombre,
      title2: "Raciones Formulas Favoritas",
      descrip: "Historial de Crecimiento del Animal",
      accionModal: "Crear",
      action: [{ description: "Editar" }, { description: "Eliminar" }],
      itemEstandar: {},
      tablaKey: 0,
      modalKey: 10,
      content: [],
      selectEspecie: [],
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
      mensajeError: "",
      contentFavorito: [],
      tablaKey2: 20,
      loading2: false,
      tableRequestStatus2: 200,
      action2: [{ description: "Contenido" }],
      headers2: [
        {
          text: "Semana de Vida",
          align: "start",
          value: "etapa_semana",
          width: "5%"
        },
        {
          text: "Estado",
          align: "center",
          value: "estado_racion",
          width: "15%"
        },
        {
          text: "Tipo",
          align: "center",
          value: "tipo",
          width: "5%"
        },
        {
          text: "Aplicable",
          value: "aplicar",
          width: "5%",
          align: "center"
        },
        {
          text: "Cantidad Total (KG)",
          value: "cantidad_total",
          width: "10%",
          align: "center"
        },
        {
          text: "Costo por Kg",
          value: "costo_total_Kg",
          width: "10%",
          align: "center"
        },
        {
          text: "Fecha Creación",
          value: "fecha_creacion",
          width: "15%",
          align: "center"
        },
        {
          text: "Acciones",
          value: "actions",
          width: "20%",
          align: "center"
        }
      ]
    };
  },
  created() {
    this.loadData();
    this.loadFavorito();
  },
  methods: {
    loadData() {
      this.content = [];
      this.loading = true;
      getAllHistorialCrecimiento(this.animal_id).then(Response => {
        this.tableRequestStatus = Response.status;
        if (Response.status == 200) {
          Response.data.historialCrecimiento.map(item => {
            this.content.push(item);
          });
        }
        this.loading = false;
      });
    },
    loadFavorito() {
      this.contentFavorito = [];
      this.loading2 = true;
      getAllRacionFormuladasFavoritasEspecie(
        this.prop_usuario_id,
        this.prop_animal.especie_id
      ).then(Response => {
        this.tableRequestStatus2 = Response.status;
        if (Response.status == 200) {
          Response.data.racionFormuladas.map(item => {
            this.contentFavorito.push(item);
          });
        }
        this.loading2 = false;
      });
    },
    accionItem2: function(item, accion) {
      console.log(accion);
      this.itemEstandar2 = item;
      this.modo = 2;
    },
    regresar2() {
      this.modo = 1;
    },
    enviarData: function() {
      if (this.accionModal === "Crear") {
        createHistorialCrecimiento(this.itemEstandar).then(Response => {
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
        updateHistorialCrecimiento(this.itemEstandar).then(Response => {
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
    newItem: function() {
      this.accionModal = "Crear";
      if (this.content.length > 0) {
        this.itemEstandar = {
          animal_id: this.animal_id,
          altura_promedio: this.content[this.content.length - 1]
            .altura_promedio,
          peso_total: this.content[this.content.length - 1].peso_total,
          cantidad: this.content[this.content.length - 1].cantidad,
          semana_crecimiento:
            this.content[this.content.length - 1].semana_crecimiento + 1,
          comentario: ""
        };
      } else {
        this.itemEstandar = {
          animal_id: this.animal_id,
          altura_promedio: 0,
          peso_total: 0,
          cantidad: 0,
          semana_crecimiento: 0,
          comentario: ""
        };
      }
      this.alert = false;
      this.state = false;
      this.modalDialog = true;
      console.log("Nuevo");
    },
    accionItem: function(item, accion) {
      console.log("accion: " + accion);

      if (accion === "Editar") {
        this.accionModal = "Editar";
        this.itemEstandar.animal_id = item.animal_id;
        this.itemEstandar.altura_promedio = item.altura_promedio;
        this.itemEstandar.peso_total = item.peso_total;
        this.itemEstandar.cantidad = item.cantidad;
        this.itemEstandar.semana_crecimiento = item.semana_crecimiento;
        this.itemEstandar.comentario = item.comentario;
        this.itemEstandar.id = item.id;
        this.alert = false;
        this.state = false;
        this.modalDialog = true;
      } else {
        deleteHistorialCrecimiento(item.id).then(Response => {
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
