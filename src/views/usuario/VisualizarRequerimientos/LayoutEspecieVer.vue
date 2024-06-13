<template>
  <v-container
    class="primary"
    fluid
    style="lef-margin: 0px; padding: 0px; width: 95%"
  >
    <div v-if="modo == 1">
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
import EtapaVida from "./EtapaVidaVer.vue";
import { getAllEspecies } from "@/services/Especie.js";
export default {
  name: "Especie",
  components: {
    TableMain,
    EtapaVida
  },
  data() {
    return {
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
      action: [{ description: "Etapas" }],
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
      if (accion === "Etapas") {
        this.especieId = item.id;
        this.especieNombre = item.nombre;
        this.modo = 2;
      }
    }
  }
};
</script>
