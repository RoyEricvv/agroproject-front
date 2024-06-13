<template>
  <div v-if="modo == 1">
    <v-row class="mb-2">
      <v-btn class="secondary" @click="$emit('regresar')">
        <v-icon class="mr-2">
          mdi-arrow-left-thick
        </v-icon>
      </v-btn>
    </v-row>
    <v-col class="text-right">
      <v-btn class="secondary" @click="newItem()">Nuevo Animal</v-btn
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
                {{ accionModal }} Animal
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col v-if="accionModal != 'Editar'" cols="12" md="12">
                      <v-autocomplete
                        v-model="itemEstandar.especie"
                        :items="selectEspecie"
                        item-text="nombre"
                        item-value="id"
                        outlined
                        label="Especie"
                        return-object
                        hide-no-data
                      ></v-autocomplete>
                    </v-col>
                    <v-col v-if="accionModal == 'Editar'" cols="12" md="12">
                      <v-text-field
                        v-model="itemEstandar.especie.nombre"
                        label="Especie"
                        outlined
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="8">
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
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model.number="itemEstandar.precio_kg_animal"
                        label="Precio por kg vivo"
                        type="number"
                        outlined
                        min="0"
                        prefix="S/."
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-textarea
                        label="Comentario"
                        auto-grow
                        outlined
                        rows="2"
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
                {{ mensajeError }}
              </v-alert>
            </v-row>
          </v-container>
        </div>
      </v-card>
    </v-dialog>
  </div>
  <div v-else>
    <DetalleCrecimiento
      :prop_animal_id="itemEstandar.id"
      :prop_animal_nombre="itemEstandar.nombre"
      :prop_animal="itemEstandar"
      :prop_usuario_id="usuarioID"
      v-on:regresar="regresarDetalle"
    />
  </div>
</template>
<script>
import TableMain from "@/components/TableMain.vue";
import store from "@/store/store";
import DetalleCrecimiento from "@/views/usuario/Granja/DetalleCrecimiento.vue";
import {
  getAllAnimales,
  createAnimales,
  updateAnimales,
  deleteAnimales
} from "@/services/Animales.js";
import { getAllEspecies } from "@/services/Especie.js";
export default {
  name: "granjaDetalleAnimales",
  props: {
    prop_granja_id: Number,
    prop_granja_nombre: String
  },
  components: {
    TableMain,
    DetalleCrecimiento
  },
  computed: {
    validar() {
      if (this.itemEstandar.especie == null || this.itemEstandar.nombre == "") {
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
      reglasComentario: [v => v.length <= 250 || "Máximo 250 Caracteres"],
      headers: [
        {
          text: "Especie",
          value: "especie.nombre",
          width: "20%",
          align: "start"
        },
        {
          text: "Nombre",
          value: "nombre",
          width: "20%",
          align: "center"
        },
        {
          text: "Estado",
          value: "estado_animal",
          width: "10%",
          align: "center"
        },
        {
          text: "Costo Kg Vivo (S/.)",
          value: "costo_kg_animal",
          width: "10%",
          align: "center"
        },
        {
          text: "Precio Kg Vivo(S/.)",
          value: "precio_kg_animal",
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
          width: "15%",
          align: "center"
        }
      ],
      modo: 1,
      granja_id: this.prop_granja_id,
      title: this.prop_granja_nombre,
      descrip: "Lista de los Animales criados en la granja",
      accionModal: "Crear",
      action: [
        { description: "Editar" },
        { description: "Crecimiento" },
        { description: "Contabilizar" }
      ],
      itemEstandar: { especie: {} },
      itemUpdate: {},
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
      mensajeError: ""
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.content = [];
      this.loading = true;
      getAllAnimales(this.granja_id).then(Response => {
        this.tableRequestStatus = Response.status;
        console.log("Response",Response)
        if (Response.status == 200) {
          Response.data.animales.map(usuario => {
            this.content.push(usuario);
          });
        }
        this.loading = false;
      });
    },
    loadSelect: function() {
      this.selectEspecie = [];
      getAllEspecies().then(Response => {
        if (Response.status != 200) {
          this.alert = true;
          this.state = false;
        } else {
          console.log("Entro a Select");
          Response.data.especies.map(item => {
            this.selectEspecie.push(item);
          });
        }
      });
      this.modalKey += 1;
    },
    enviarData: function() {
      this.itemEstandar.especie_id = this.itemEstandar.especie.id;
      if (this.accionModal === "Crear") {
        createAnimales(this.itemEstandar).then(Response => {
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
        this.itemUpdate.estado_animal = this.itemEstandar.estado_animal;
        this.itemUpdate.nombre = this.itemEstandar.nombre;
        this.itemUpdate.comentario = this.itemEstandar.comentario;
        this.itemUpdate.precio_kg_animal = this.itemEstandar.precio_kg_animal;
        this.itemUpdate.granja_id = this.itemEstandar.granja_id;
        this.itemUpdate.id = this.itemEstandar.id;
        updateAnimales(this.itemUpdate).then(Response => {
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
    regresarDetalle() {
      this.modo = 1;
    },
    newItem: function() {
      this.accionModal = "Crear";
      this.itemEstandar = {
        nombre: "",
        comentario: "",
        granja_id: this.granja_id,
        especie_id: 0,
        precio_kg_animal: 0
      };
      this.alert = false;
      this.state = false;
      this.modalDialog = true;
      this.loadSelect();
      console.log("Nuevo");
    },
    accionItem: function(item, accion) {
      console.log("accion: " + JSON.stringify(item));
      if (accion === "Editar") {
        this.itemEstandar.especie.nombre = item.especie.nombre;
        this.itemEstandar.estado_animal = item.estado_animal;
        this.itemEstandar.nombre = item.nombre;
        this.itemEstandar.comentario = item.comentario;
        this.itemEstandar.precio_kg_animal = item.precio_kg_animal;
        this.itemEstandar.granja_id = item.granja_id;
        this.itemEstandar.id = item.id;
        this.accionModal = "Editar";
        this.alert = false;
        this.state = false;
        this.modalDialog = true;
        this.loadSelect();
      } else if (accion === "Crecimiento") {
        this.itemEstandar = item;
        this.modo = 2;
      } else if (accion === "Contabilizar") {
        this.itemEstandar = item;
        this.itemEstandar.estado_animal = 3;
        updateAnimales(this.itemEstandar).then(Response => {
          this.modalDialog = true;
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
        deleteAnimales(item.id).then(Response => {
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
