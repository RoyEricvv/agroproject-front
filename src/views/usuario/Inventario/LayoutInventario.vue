<template>
  <v-container
    class="primary"
    fluid
    style="lef-margin: 0px; padding: 0px; width: 95%"
  >
    <div v-if="modo == 1">
      <v-col class="text-right">
        <v-btn class="secondary" :disabled="igualTamano" @click="newItem()"
          >Añadir Insumo</v-btn
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
      <v-dialog :key="modalKey" v-model="modalDialog" max-width="800px">
        <v-card>
          <div v-if="!alert">
            <v-container fluid>
              <div>
                <v-card-title class="headline">
                  {{ accionModal }} Insumo
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container>
                    <div v-if="accionModal == 'Añadir'">
                      <v-autocomplete
                        v-model="itemEstandar.insumo"
                        :items="selectInsumo"
                        item-text="nombre"
                        item-value="id"
                        outlined
                        label="Insumo"
                        return-object
                        hide-no-data
                      ></v-autocomplete>
                    </div>
                    <div v-else>
                      <v-text-field
                        disabled
                        v-model="itemEstandar.insumo.nombre"
                        label="Insumo"
                        outlined
                        required
                      ></v-text-field>
                    </div>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          type="number"
                          v-model.number="itemEstandar.peso_total"
                          label="Cantidad Total"
                          :rules="rulesNumber"
                          outlined
                          min="0"
                          suffix="kg"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          type="number"
                          v-model.number="itemEstandar.costo_unitario"
                          label="Precio por Kg"
                          :rules="rulesNumber"
                          outlined
                          min="0"
                          prefix="S/."
                          required
                        ></v-text-field>
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
      <InventarioDetalleContenidoNutricional
        :prop_insumo_id="insumoId"
        :prop_insumo_nombre="insumoNombre"
        v-on:regresar="regresar"
      />
    </div>
  </v-container>
</template>
<script>
import TableMain from "@/components/TableMain.vue";
import InventarioDetalleContenidoNutricional from "@/views/usuario/Inventario/InventarioDetalleContenidoNutricional.vue";
import { getAllInventarios } from "@/services/Inventario.js";
import { getAllInsumos } from "@/services/Insumo.js";
import {
  createInventarios,
  deleteInventarios,
  updateInventarios
} from "@/services/Inventario.js";
export default {
  name: "Inventario",
  components: {
    TableMain,
    InventarioDetalleContenidoNutricional
  },
  data() {
    return {
      rulesNumber: [value => value >= 0 || "Obligatorio."],
      rulesInsumoNuevo: [value => value >= 0 || "Obligatorio."],
      headers: [
        {
          text: "Insumo",
          align: "start",
          value: "insumo.nombre",
          width: "15%"
        },
        {
          text: "Aditivo",
          align: "start",
          value: "insumo.es_aditivo",
          width: "5%"
        },
        {
          text: "Precio por Kg (S/.)",
          value: "costo_unitario",
          width: "13%",
          align: "center"
        },
        {
          text: "Peso Total (Kg)",
          value: "peso_total",
          width: "13%",
          align: "center"
        },
        {
          text: "Precio Total Actual(S/.)",
          value: "costo_total",
          width: "13%",
          align: "center"
        },
        {
          text: "Acciones",
          value: "actions",
          width: "15%",
          align: "center"
        }
      ],
      modalKey: 20,
      user_id: 0,
      modo: 1,
      title: "Mi inventario",
      descrip: "Lista de Insumos adquiridos",
      tablaKey: 10,
      content: [],
      tableRequestStatus: 200,
      number: 10,
      loading: true,
      action: [
        { description: "Editar" },
        { description: "Contenido Inventario" },
        { description: "Eliminar" }
      ],
      pestañaActiva: 0,
      insumoId: 0,
      insumoNombre: 0,
      selectInsumo: [],
      itemEstandar: { insumo: { nombre: "", id: 0 } },
      modalDialog: false,
      accionModal: " ",
      alert: false,
      state: false,
      mensajeError: ""
    };
  },
  created() {
    this.user_id = this.$store.state.user.data.id;
    this.loadData();
    this.loadSelect();
  },
  computed: {
    validar() {
      if (
        this.itemEstandar.insumo.id == 0 ||
        (this.itemEstandar.costo_unitario == 0 &&
          this.itemEstandar.peso_total == 0)
      ) {
        return true;
      } else {
        return false;
      }
    },
    igualTamano() {
      if (this.selectInsumo.length == 0) {
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
      getAllInventarios(this.user_id).then(Response => {
        this.tableRequestStatus = Response.status;
        if (Response.status == 200) {
          Response.data.inventarios.map(item => {
            this.content.push(item);
          });
        }
        this.loading = false;
      });
    },
    loadSelect: function() {
      this.selectInsumo = [];
      getAllInsumos().then(Response => {
        if (Response.status != 200) {
          this.modalKey += 1;
          this.alert = true;
          this.state = false;
        } else {
          var list = this.content;
          var recortado = Response.data.insumos.filter(function(o1) {
            // filter out (!) items in result2
            return !list.some(function(o2) {
              return o1.id === o2.insumo_id; // assumes unique id
            });
          });
          recortado.map(item => {
            this.selectInsumo.push(item);
          });
        }
      });
    },
    regresar() {
      this.modo = 1;
    },
    accionItem: function(item, accion) {
      if (accion == "Contenido Inventario") {
        console.log(accion);
        this.insumoId = item.insumo.id;
        this.insumoNombre = item.insumo.nombre;
        this.modo = 2;
      } else if (accion == "Editar") {
        this.itemEstandar.insumo_id = item.insumo_id;
        this.itemEstandar.insumo = item.insumo;
        this.itemEstandar.peso_total = item.peso_total;
        this.itemEstandar.usuario_id = item.usuario_id;
        this.itemEstandar.costo_unitario = item.costo_unitario;
        this.itemEstandar.costo_total = item.costo_total;
        this.accionModal = "Editar";
        this.alert = false;
        this.state = false;
        this.modalDialog = true;
        this.loadSelect();
      } else {
        deleteInventarios(item).then(Response => {
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
    },
    newItem() {
      this.accionModal = "Añadir";
      this.itemEstandar = {
        insumo: { nombre: "", id: 0 },
        costo_total: 0,
        costo_unitario: 0,
        peso_total: 0,
        usuario_id: this.user_id,
        insumo_id: 0
      };
      this.mensajeError = "";
      this.alert = false;
      this.state = false;
      this.modalDialog = true;
      this.loadSelect();
      console.log("Añadir");
    },
    enviarData: function() {
      this.itemEstandar.insumo_id = this.itemEstandar.insumo.id;
      this.itemEstandar.costo_total =
        this.itemEstandar.costo_unitario * this.itemEstandar.peso_total;
      console.log(this.accionModal);
      if (this.accionModal === "Añadir") {
        console.log("Seleccionar");
        createInventarios(this.itemEstandar).then(Response => {
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
        updateInventarios(this.itemEstandar).then(Response => {
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
  }
};
</script>
