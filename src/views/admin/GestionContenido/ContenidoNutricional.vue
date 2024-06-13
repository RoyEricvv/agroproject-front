<template>
  <div>
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
          v-model="depSeleccionado"
          :items="listaDep"
          item-text="nombre"
          item-value="nombre"
          label="Departamento"
          v-on:change="changeDepartament"
          return-object
          outlined
          hide-no-data
        ></v-autocomplete>
      </v-col>
      <v-col class="text-right">
        <v-text-field
          :disabled="!editarMs"
          type="number"
          v-model="materiaSeca.porcentaje"
          label="Porcentaje Materia Seca"
          min="0"
          required
        ></v-text-field>
      </v-col>
      <v-btn v-if="!editarMs" class="secondary" @click="editar()">Editar</v-btn>
      <v-btn v-if="editarMs" class="secondary" @click="saveMateria()"
        >Guardar</v-btn
      >
    </v-row>
    <v-col class="text-right">
      <v-btn class="secondary" @click="newItem()" :disabled="igualTamano"
        >Añadir Contenido Nutricional</v-btn
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
                {{ accionModal }} Contenido Nutricional
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col v-if="accionModal != 'Editar'" cols="12" md="4">
                    <v-autocomplete
                      :disabled="accionModal == 'Editar'"
                      v-model="itemEstandar.nutriente"
                      :items="selectNutriente"
                      item-text="nombre"
                      item-value="id"
                      label="Nutriente"
                      v-on:change="changeInsumo"
                      outline
                      return-object
                      hide-no-data
                    ></v-autocomplete>
                  </v-col>
                  <v-col v-if="accionModal == 'Editar'" cols="12" md="4">
                    <v-text-field
                      disabled
                      v-model="itemEstandar.nutriente.nombre"
                      label="Nutriente"
                      outline
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      type="number"
                      v-model.number="itemEstandar.cantidad"
                      label="Cantidad"
                      min="0"
                      outline
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      disabled
                      v-model="unidad"
                      label="Unidad"
                      outline
                      required
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
</template>
<script>
import TableMain from "@/components/TableMain.vue";
import { getAllNutrientes } from "@/services/Nutriente.js";
import { getAllDepartamentos } from "@/services/Departamento.js";
import {
  getAllMateriaSeca,
  updateMateriaSeca
} from "@/services/MateriaSeca.js";

import {
  getAllContenidoNutricionales,
  createContenidoNutricionales,
  deleteContenidoNutricionales,
  updateContenidoNutricionales
} from "@/services/ContenidoNutricional.js";
export default {
  name: "ContenidoNutricional",
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
          width: "25%"
        },
        {
          text: "Cantidad",
          value: "cantidad",
          width: "25%",
          align: "center"
        },
        {
          text: "Unidad",
          value: "nutriente.unidad",
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
      selectNutriente: [],
      warning: false,
      unidad: " ",
      listaDep: [],
      depSeleccionado: { id: 0 },
      listaMS: [],
      materiaSeca: {},
      editarMs: false
    };
  },
  created() {
    this.loadData();
    this.loadDepart();
    this.loadMS();
    this.loadSelect();
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
    loadDepart() {
      this.listaDep = [];
      getAllDepartamentos().then(Response => {
        if (Response.status == 200) {
          Response.data.departamentos.map(item => {
            this.listaDep.push(item);
          });
          this.depSeleccionado = this.listaDep[0];
        }
      });
    },
    loadMS() {
      this.listaMS = [];
      getAllMateriaSeca(this.insumo_id).then(Response => {
        if (Response.status == 200) {
          Response.data.materiaSeca.map(item => {
            this.listaMS.push(item);
          });
          this.materiaSeca = this.listaMS[0];
        }
      });
    },
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
          var list = this.content;
          var recortado = Response.data.nutrientes.filter(function(o1) {
            // filter out (!) items in result2
            return !list.some(function(o2) {
              return o1.id === o2.nutriente_id; // assumes unique id
            });
          });
          console.log(recortado);
          recortado.map(item => {
            this.selectNutriente.push(item);
          });
        }
      });
    },
    editar() {
      this.editarMs = true;
    },
    changeInsumo(item) {
      console.log(item);
      this.itemEstandar.nutriente_id = item.id;
      for (let index = 0; index < this.selectNutriente.length; index++) {
        if (this.selectNutriente[index].id == item.id) {
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
    saveMateria() {
      console.log(this.materiaSeca);
      updateMateriaSeca(this.materiaSeca).then(Response => {
        console.log(Response.status);
        this.editarMs = false;
      });
    },
    changeDepartament(departamento) {
      for (let index = 0; index < this.listaMS.length; index++) {
        if (this.listaMS[index].departamento_id == departamento.id) {
          this.materiaSeca = this.listaMS[index];
          break;
        }
      }
      console.log(departamento);
      console.log(this.materiaSeca);
    },
    newItem: function() {
      this.accionModal = "Añadir";
      this.itemEstandar = {
        cantidad: 0,
        nutriente_id: 0,
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
        this.unidad =
          item.nutriente.unidad == 0
            ? "Porcentaje"
            : item.nutriente.unidad == 1
            ? "Gramos"
            : item.nutriente.unidad == 2
            ? "kcal/kg"
            : item.nutriente.unidad == 3
            ? "PPM"
            : "mg/kg";
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
          }
          this.loadData();
          this.tablaKey += 1;
        });
      }
    }
  }
};
</script>
