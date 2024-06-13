<template>
  <v-container
    class="primary"
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
        <v-select
          v-model="fuenteSeleccionado"
          :items="opcionesFuente"
          item-text="nombre"
          item-value="id"
          label="Fuente"
          v-on:change="loadData"
          outlined
        ></v-select>
      </v-col>
    </v-row>
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
  </v-container>
</template>
<script>
import TableMain from "@/components/TableMain.vue";
import { getAllDepartamentos } from "@/services/Departamento.js";
import { getAllFuentes } from "@/services/Fuente.js";
import { getAllRequerimientoNutricionales } from "@/services/RequerimientoNutricional.js";
export default {
  name: "RequerimientosVer",
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
          width: "25%",
          align: "center"
        }
      ],
      etapaVidaId: this.prop_etapaVida_id,
      etapaSemana: this.prop_etapaVida_semana,
      especieNombre: this.prop_especie_nombre,
      title: this.prop_especie_nombre + "Semana:" + this.prop_etapaVida_semana,
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
      fuenteSeleccionado: 1,
      opcionesDepartamento: [],
      departamentoSeleccionado: { id: 1 },
      unidad: " "
    };
  },
  created() {
    this.loadSelectTable();
    this.loadData();
  },
  methods: {
    loadData() {
      this.content = [];
      this.filtroTabla = {
        etapa_vida_id: this.etapaVidaId,
        departamento_id: this.departamentoSeleccionado.id,
        fuente_id: this.fuenteSeleccionado
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
    }
  }
};
</script>
