<template>
  <div>
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
      :selectableTable="false"
    />
  </div>
</template>
<script>
import TableMain from "@/components/TableMain.vue";
import { getAllContenidoNutricionales } from "@/services/ContenidoNutricional.js";
import { getAllNutrientes } from "@/services/Nutriente.js";
import {
  createContenidoNutricionales,
  deleteContenidoNutricionales,
  updateContenidoNutricionales
} from "@/services/ContenidoNutricional.js";
export default {
  name: "InventarioDetalleContenidoNutricional",
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
          text: "Nutriente",
          align: "start",
          value: "nutriente.nombre",
          width: "40%"
        },
        {
          text: "Cantidad",
          value: "cantidad",
          width: "30%",
          align: "center"
        },
        {
          text: "Unidad",
          value: "nutriente.unidad",
          width: "30%",
          align: "center"
        }
      ],
      insumo_id: this.prop_insumo_id,
      title: this.prop_insumo_nombre,
      descrip: "Contenido Nutricional del Insumo",
      tablaKey: 0,
      content: [],
      tableRequestStatus: 200,
      modalRequestStatus: 200,
      number: 10,
      loading: true,
      action: [{ description: "Editar" }, { description: "Eliminar" }],
      modalDialog: false,
      accionModal: " ",
      itemEstandar: {},
      alert: false,
      state: false,
      mensajeError: "",
      selectNutriente: [],
      warning: false
    };
  },
  created() {
    this.loadData(); //equipos propuesta
  },
  methods: {
    loadData() {
      this.content = [];
      this.loading = true;
      getAllContenidoNutricionales(this.insumo_id).then(Response => {
        this.tableRequestStatus = Response.status;
        if (Response.status == 200) {
          Response.data.contenidoNutricionales.map(item => {
            this.content.push(item);
          });
        }
        this.loading = false;
      });
    },
    loadSelect: function() {
      this.selectNutriente = [];
      getAllNutrientes().then(Response => {
        if (Response.status != 200) {
          this.alert = true;
          this.state = false;
        } else {
          Response.data.nutrientes.map(item => {
            this.selectNutriente.push(item);
          });
        }
      });
    },
    newItem: function() {
      this.accionModal = "Añadir";
      this.itemEstandar = {
        cantidad: 0,
        nutriente_id: 0,
        insumo_id: this.insumo_id
      };
      this.mensajeError = "";
      this.alert = false;
      this.state = false;
      this.warning = false;
      this.modalDialog = true;
      this.loadSelect();
      console.log("Añadir");
    },
    enviarData: function() {
      if (
        this.itemEstandar.nutriente_id > 0 &&
        this.itemEstandar.cantidad > 0
      ) {
        if (this.accionModal === "Añadir") {
          createContenidoNutricionales(this.itemEstandar).then(Response => {
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
          updateContenidoNutricionales(this.itemEstandar).then(Response => {
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
        this.loadSelect();
      } else {
        deleteContenidoNutricionales(item).then(Response => {
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
