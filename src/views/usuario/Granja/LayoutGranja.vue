<template>
  <v-container
    class="fondo"
    fluid
    style="lef-margin: 0px; padding: 0px; width: 95%"
  >
    <div v-if="modo == 1">
      <v-col class="text-right">
        <v-btn class="secondary" @click="newItem()">Nueva Granja</v-btn
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
                  {{ accionModal }} Granja
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
                          maxlength="45"
                          :rules="reglasNombre"
                        ></v-text-field>
                      </v-col>
                      <v-col class="text-left">
                        <v-select
                          :disabled="accionModal == 'Editar'"
                          v-model="itemEstandar.departamento_id"
                          :items="listaDep"
                          item-text="nombre"
                          item-value="id"
                          outlined
                          label="Departamento"
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
                  <br />
                  {{ mensajeError }}
                </v-alert>
              </v-row>
            </v-container>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <div v-else-if="modo == 2">
      <GranjaDetalleAnimales
        :prop_granja_id="itemEstandar.id"
        :prop_granja_nombre="itemEstandar.nombre"
        v-on:regresar="regresar"
      />
    </div>
    <div v-else>
      <GranjaDetalleMaquina
        :prop_granja_id="itemEstandar.id"
        :prop_granja_nombre="itemEstandar.nombre"
        v-on:regresar="regresar"
      />
    </div>
  </v-container>
</template>
<script>
import TableMain from "@/components/TableMain.vue";
import {
  getAllGranjas,
  createGranjas,
  updateGranjas
} from "@/services/Granja.js";
import GranjaDetalleAnimales from "@/views/usuario/Granja/GranjaDetalleAnimales.vue";
import GranjaDetalleMaquina from "@/views/usuario/Granja/GranjaDetalleMaquina.vue";
import { getAllDepartamentos } from "@/services/Departamento.js";
import store from "@/store/store";
export default {
  name: "Granja",
  components: {
    TableMain,
    GranjaDetalleAnimales,
    GranjaDetalleMaquina
  },
  computed: {
    validar() {
      if (
        this.itemEstandar.nombre == "" ||
        this.itemEstandar.departamento_id == 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    usuarioID() {
      return store.state.user.data.id;
    }
  },
  data() {
    return {
      reglasNombre: [v => v.length <= 45 || "Máximo 45 Caracteres"],
      headers: [
        {
          text: "Nombre",
          value: "nombre",
          width: "30%",
          align: "start"
        },
        {
          text: "Ubicación - Departamento",
          value: "departamento.nombre",
          width: "30%",
          align: "start"
        },
        {
          text: "Fecha Creación",
          value: "fecha_creacion",
          width: "20%",
          align: "center"
        },
        {
          text: "Acciones",
          value: "actions",
          width: "40%",
          align: "center"
        }
      ],
      user_id: 0,
      modo: 1,
      title: "Granjas",
      descrip: "Lista de granjas registradas",
      accionModal: "Crear",
      action: [{ description: "Editar" }, { description: "Animales" }, { description: "Maquinas" }],
      itemEstandar: {
        nombre: "",
        usuario_id: 0
      },
      tablaKey: 0,
      modalKey: 10,
      content: [],
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
      listaDep: []
    };
  },
  created() {
    this.user_id = this.usuarioID;
    this.loadData();
  },
  methods: {
    loadDepart() {
      this.listaDep = [];
      getAllDepartamentos().then(Response => {
        if (Response.status == 200) {
          Response.data.departamentos.map(item => {
            this.listaDep.push(item);
          });
        }
      });
    },
    loadData() {
      this.content = [];
      this.loading = true;
      getAllGranjas(this.user_id).then(Response => {
        this.tableRequestStatus = Response.status;
        if (Response.status == 200) {
          Response.data.granjas.map(item => {
            this.content.push(item);
          });
        }
        this.loading = false;
      });
    },
    regresar() {
      this.modo = 1;
    },
    enviarData: function() {
      if (this.accionModal === "Crear") {
        createGranjas(this.itemEstandar).then(Response => {
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
        updateGranjas(this.itemEstandar).then(Response => {
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
      this.itemEstandar = {
        nombre: "",
        usuario_id: this.user_id,
        departamento_id: 0
      };
      this.mensajeError = "";
      this.alert = false;
      this.state = false;
      this.modalDialog = true;
      this.loadDepart();
      console.log("Nuevo");
    },
    accionItem: function(item, accion) {
      console.log("accion: " + JSON.stringify(item));
      this.itemEstandar.id = item.id;
      this.itemEstandar.nombre = item.nombre;
      this.itemEstandar.departamento_id = item.departamento_id;
      this.itemEstandar.usuario_id = item.usuario_id;
      if (accion === "Editar") {
        this.accionModal = "Editar";
        this.alert = false;
        this.state = false;
        this.modalDialog = true;
        this.loadDepart();
      } else if(accion === "Animales") {
        this.modo = 2;
      } else {
        this.modo = 3;
      }
    }
  }
};
</script>
