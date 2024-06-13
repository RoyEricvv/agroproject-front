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
import Requerimientos from "./RequerimientoVer";
import { getAllEtapaVida } from "@/services/EtapaVida.js";
export default {
  name: "EtapaVidaVer",
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
      action: [{ description: "Requerimiento" }],
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
    regresarRequerimiento() {
      this.modo = 1;
    },
    accionItem: function(item, accion) {
      console.log("accion: " + accion);

      if (accion === "Requerimiento") {
        this.modo = 2;
        this.etapaVidaId = item.id;
        this.etapaVidaSemana = item.semana_vida_referencial_inicial;
      }
    }
  }
};
</script>
