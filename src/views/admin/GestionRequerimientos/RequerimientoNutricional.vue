<template>
  <v-container
    class="fondo"
    fluid
    style="lef-margin: 0px; padding: 0px; width: 95%"
  >
    <v-row class="mb-2">
      <v-btn class="secondary" @click="$emit('regresar')">
        <v-icon class="mr-2">
          mdi-arrow-left-thick
        </v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-col class="text-left">
        <v-autocomplete
          v-model="departamentoSeleccionado"
          :items="opcionesDepartamento"
          item-text="nombre"
          item-value="id"
          label="Departamento"
          v-on:change="loadData"
          return-object
          outlined
          hide-no-data
        ></v-autocomplete>
      </v-col>
      <v-col class="text-right">
        <v-autocomplete
          v-model="fuenteSeleccionado"
          :items="opcionesFuente"
          item-text="nombre"
          item-value="id"
          label="Fuente"
          v-on:change="loadData"
          return-object
          outlined
          hide-no-data
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-col class="text-right">
      <v-btn class="secondary" @click="newItem()"
        >Nuevo Requerimiento Nutricional</v-btn
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
    <v-dialog :key="modalKey" v-model="modalDialog" max-width="800px">
      <v-card>
        <div v-if="!alert">
          <v-container fluid>
            <div>
              <v-card-title class="headline">
                {{ accionModal }} Requerimiento Nutricional
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col v-if="accionModal != 'Editar'" cols="12" md="4">
                      <v-autocomplete
                        v-model="itemEstandar.nutriente"
                        :items="selectNutriente"
                        item-text="nombre"
                        item-value="nombre"
                        label="Nutriente"
                        outlined
                        return-object
                        v-on:change="changeNutriente"
                        hide-no-data
                      ></v-autocomplete>
                    </v-col>

                    <v-col v-if="accionModal == 'Editar'" cols="12" md="4">
                      <v-text-field
                        disabled
                        v-model="itemEstandar.nutriente.nombre"
                        outlined
                        label="Nutriente"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select
                        v-model="itemEstandar.tipo_requerimiento"
                        :items="selectTipoRequerimiento"
                        outlined
                        item-text="nombre"
                        item-value="id"
                        label="Tipo de Requerimiento"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-checkbox
                        v-model="itemEstandar.esencial"
                        label="Requisito esencial"
                        outlined
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        type="number"
                        v-model.number="itemEstandar.cantidad"
                        label="Cantidad"
                        min="0"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        disabled
                        v-model="unidad"
                        label="Unidad"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col v-show="accionModal != 'Editar'" cols="12" md="4">
                      <v-checkbox
                        v-model="itemEstandar.se_repite"
                        label="Repetir en Todos los departamentos"
                      ></v-checkbox>
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
import { getAllDepartamentos } from "@/services/Departamento.js";
import { getAllFuentes } from "@/services/Fuente.js";
import { getAllNutrientes } from "@/services/Nutriente.js";
import {
  getAllRequerimientoNutricionales,
  createRequerimientoNutricionales,
  updateRequerimientoNutricionales,
  deleteRequerimientoNutricionales
} from "@/services/RequerimientoNutricional.js";
export default {
  name: "Requerimientos",
  props: {
    prop_etapaVida_id: Number,
    prop_etapaVida_semana: Number,
    prop_especie_nombre: String
  },
  components: {
    TableMain
  },
  data() {
    return {
      headers: [
        {
          text: "Nutriente",
          value: "nutriente.nombre",
          width: "25%",
          align: "start"
        },
        {
          text: "Cantidad",
          value: "cantidad",
          width: "10%",
          align: "center"
        },
        {
          text: "Unidad",
          value: "nutriente.unidad",
          width: "15%",
          align: "center"
        },
        {
          text: "Tipo Requerimiento ",
          value: "tipo_requerimiento",
          width: "15%",
          align: "center"
        },
        {
          text: "Esencial ",
          value: "esencial",
          width: "10%",
          align: "center"
        },
        {
          text: "Acciones",
          value: "actions",
          width: "20%",
          align: "center"
        }
      ],
      etapaVidaId: this.prop_etapaVida_id,
      etapaSemana: this.prop_etapaVida_semana,
      especieNombre: this.prop_especie_nombre,
      title: this.prop_especie_nombre + " Semana:" + this.prop_etapaVida_semana,
      descrip: "Requerimientos nutricionales de la etapa de vida. ",
      accionModal: "Crear",
      action: [{ description: "Editar" }, { description: "Eliminar" }],
      itemEstandar: {},
      filtroTabla: {},
      tablaKey: 0,
      modalKey: 10,
      selectNutriente: [],
      content: [],
      loading: true,
      number: 10,
      tableRequestStatus: 200,
      modalRequestStatus: 200,
      modalStatusDetail: "",
      TeamsDialog: false,
      modalDialog: false,
      currentItem: {},
      alert: false,
      state: false,
      selectTipoRequerimiento: [
        { id: 0, nombre: "Mínimo" },
        { id: 1, nombre: "Máximo" }
      ],
      opcionesFuente: [],
      fuenteSeleccionado: { id: 1 },
      opcionesDepartamento: [],
      departamentoSeleccionado: { id: 1 },
      unidad: " "
    };
  },
  created() {
    this.loadSelectTable();
    this.loadData();
  },
  computed: {
    validar() {
      if (
        this.itemEstandar.nutriente_id == 0 ||
        this.itemEstandar.cantidad == 0 ||
        (this.unidad == "Porcentaje" && this.itemEstandar.cantidad > 100)
      ) {
        return true;
      } else {
        return false;
      }
    },
    igualTamano() {
      if (this.selectNutriente.length == 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    loadData() {
      this.content = [];
      this.filtroTabla = {
        etapa_vida_id: this.etapaVidaId,
        departamento_id: this.departamentoSeleccionado.id,
        fuente_id: this.fuenteSeleccionado.id
      };
      console.log("Filtros: ", this.filtroTabla);
      this.loading = true;
      getAllRequerimientoNutricionales(this.filtroTabla).then(Response => {
        this.tableRequestStatus = Response.status;
        if (Response.status == 200) {
          Response.data.requerimientoNutricionales.map(item => {
            this.content.push(item);
          });
        }
        this.loading = false;
        this.tablaKey += 1;
      });
    },
    loadSelectTable: function() {
      this.opcionesDepartamento = [];
      this.opcionesFuente = [];
      Promise.all([getAllDepartamentos(), getAllFuentes()]).then(Response => {
        if (Response[0].status != 200 || Response[1].status != 200) {
          this.tableRequestStatus = 404;
        } else {
          console.log("Entro a Select");
          Response[0].data.departamentos.map(item => {
            this.opcionesDepartamento.push(item);
          });
          Response[1].data.fuentes.map(item => {
            this.opcionesFuente.push(item);
          });
        }
      });
    },
    loadSelectNutriente: function() {
      this.selectNutriente = [];
      getAllNutrientes().then(Response => {
        if (Response.status != 200) {
          this.alert = true;
          this.state = false;
        } else {
          var list = this.content;
          var recortado = Response.data.nutrientes.filter(function(o1) {
            // filter out (!) items in result2
            return !list.some(function(o2) {
              return o1.id === o2.nutriente_id; // assumes unique id
            });
          });
          console.log("Elemento Recortado", recortado);
          recortado.map(item => {
            this.selectNutriente.push(item);
          });
        }
      });
    },
    enviarData: function() {
      if (this.accionModal === "Crear") {
        createRequerimientoNutricionales(this.itemEstandar).then(Response => {
          this.tablaKey += 1;
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
        updateRequerimientoNutricionales(this.itemEstandar).then(Response => {
          this.tablaKey += 1;
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
    changeNutriente(item) {
      this.itemEstandar.nutriente_id = this.itemEstandar.nutriente.id;
      console.log(item);
      for (let index = 0; index < this.selectNutriente.length; index++) {
        if (this.selectNutriente[index].id == this.itemEstandar.nutriente.id) {
          this.unidad =
            this.selectNutriente[index].unidad == 0
              ? "Porcentaje"
              : this.selectNutriente[index].unidad == 1
              ? "Gramos"
              : this.selectNutriente[index].unidad == 2
              ? "kcal/kg"
              : this.selectNutriente[index].unidad == 3
              ? "PPM"
              : "mg/kg";
          break;
        }
      }
    },
    newItem: function() {
      this.accionModal = "Crear";
      this.itemEstandar = {
        esencial: true,
        cantidad: 0,
        tipo_requerimiento: 0,
        etapa_vida_id: this.etapaVidaId,
        nutriente_id: 0,
        departamento_id: this.departamentoSeleccionado.id,
        fuente_id: this.fuenteSeleccionado.id,
        se_repite: true
      };
      this.alert = false;
      this.state = false;
      this.modalDialog = true;
      this.loadSelectNutriente();
      console.log("Nuevo");
    },
    accionItem: function(item, accion) {
      console.log("accion: " + accion);

      if (accion === "Editar") {
        this.accionModal = "Editar";
        this.itemEstandar = item;
        this.unidad =
          item.nutriente.unidad == 0
            ? "Porcentaje"
            : item.nutriente.unidad == 1
            ? "Gramos"
            : item.nutriente.unidad == 2
            ? "kcal/kg"
            : item.nutriente.unidad == 2
            ? "PPM"
            : "mg/kg";
        this.alert = false;
        this.state = false;
        this.modalDialog = true;
      } else {
        deleteRequerimientoNutricionales(item).then(Response => {
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
