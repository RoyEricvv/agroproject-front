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
      <v-btn class="secondary" @click="newItem()">Nueva Maquina</v-btn
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
                {{ accionModal }} Equipo
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="itemEstandar.nombre"
                        label="Nombre"
                        outlined
                        required
                        counter
                        maxlength="60"
                        :rules="reglasNombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-textarea
                        label="Número de serie"
                        auto-grow
                        outlined
                        rows="2"
                        v-model.number="itemEstandar.numero_serie"
                        row-height="15"
                        counter
                        maxlength="40"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6"> 
                      <v-autocomplete
                        v-model="itemEstandar.estado"
                        :items="['Vehículos', 'Maquinaría', 'Herramienta y Utensilios', 'Equipo de Manejo de Animales', 'Sistema de Alimentación y Agua','Instalaciones','Sistema de Seguridad','Vacunas y Medicamentos']"
                        outlined
                        label="Categorías de Activo"
                        hide-no-data
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model.number="itemEstandar.proveedor"
                        label="Proveedor"
                        outlined
                        required
                        counter
                        maxlength="50"
                        :rules="reglasNombre"
                      ></v-text-field>
                    </v-col>
                    
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="3">
                      <v-autocomplete
                        v-model="itemEstandar.moneda"
                        :items="['Soles', 'Dólares']"
                        outlined
                        label="Moneda"
                        hide-no-data
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-textarea
                        label="Precio"
                        auto-grow
                        rows="2"
                        v-model.number="itemEstandar.precio"
                        type="number"
                        outlined
                        min="0"
                        :prefix="precioPrefix"
                        required
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="itemEstandar.fecha_compra"
                            outlined
                            label="Fecha de Compra"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="itemEstandar.fecha_compra"
                          no-title
                          scrollable
                          locale="es"
                          @input="menu = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-textarea
                        label="Vida estimada (años)"
                        auto-grow
                        rows="2"
                        v-model.number="itemEstandar.vida_estimada"
                        type="number"
                        outlined
                        min="0"
                        required
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" md="4"> 
                      <v-autocomplete
                        v-model="itemEstandar.tipo_depreciacion"
                        :items="['Lineal', 'Acelerada', 'Suma de Dígitos', 'Macaulay', 'Declinante Balance']"
                        outlined
                        label="Tipo de Depreciación"
                        hide-no-data
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="itemEstandar.fecha_limite_garantia"
                            outlined
                            label="Fecha de Garantía"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="itemEstandar.fecha_limite_garantia"
                          no-title
                          scrollable
                          locale="es"
                          @input="menu = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-textarea
                        label="Comentario"
                        auto-grow
                        outlined
                        rows="2"
                        name="input-7-4"
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

</template>
<script>
import TableMain from "@/components/TableMain.vue";
import store from "@/store/store";
import { 
  getAllMaquinasGranja,
  createMaquinas,
  updateMaquinas,
  deleteMaquinas
 } from "@/services/Maquinas.js";
export default {
  name: "granjaDetalleMaquinas",
  props: {
    prop_granja_id: Number,
    prop_granja_nombre: String
  },
  components: {
    TableMain
  },
  computed: {
    precioPrefix() {
      return this.itemEstandar.moneda === 'Dólares' ? '$' : 'S/.';
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
        text: "Nombre",
        value: "nombre",
        width: "20%",
        align: "center"
      },
      {
        text: "Número de serie",
        value: "numero_serie",
        width: "10%",
        align: "center"
      },
      {
        text: "Precio",
        value: "precio",
        width: "5%",
        align: "center"
      },
      {
        text: "Moneda",
        value: "moneda",
        width: "5%",
        align: "center"
      },
      {
        text: "Fecha de compra",
        value: "fecha_compra",
        width: "15%",
        align: "center"
      },
      {
        text: "Fecha de garantía",
        value: "fecha_limite_garantia",
        width: "15%",
        align: "center"
      },
      {
        text: "Categoría",
        value: "estado",
        width: "5%",
        align: "center"
      },
      {
        text: "Vida estimada",
        value: "vida_estimada",
        width: "5%",
        align: "center"
      },
      {
        text: "Tipo de depreciación",
        value: "tipo_depreciacion",
        width: "5%",
        align: "center"
      },
      {
        text: "Comentario",
        value: "comentario",
        width: "20%",
        align: "center"
      },
      {
        text: "Acciones",
        value: "actions",
        width: "10%",
        align: "center"
      }
      ],
      modo: 1,
      granja_id: this.prop_granja_id,
      title: this.prop_granja_nombre,
      descrip: "Lista de las maquinas en la granja",
      accionModal: "Crear",
      action: [
        { description: "Editar" },
        { description: "Eliminar" }
      ],
      itemEstandar: {  },
      itemUpdate: {},
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
      getAllMaquinasGranja(this.granja_id).then(Response => {
        this.tableRequestStatus = Response.status;
        if (Response.status == 200) {
          Response.data.equipos.map(usuario => {
            this.content.push(usuario);
          });
        }
        this.loading = false;
      });
    },
    loadSelect: function() {
      console.log("vuamos loadselect")
    },
    enviarData: function() {
      if (this.accionModal === "Crear") {
        createMaquinas(this.itemEstandar).then(Response => {
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
        // Aquí se actualiza la maquina
        console.log(this.itemEstandar);
        this.itemUpdate.nombre = this.itemEstandar.nombre;
        this.itemUpdate.numero_serie = this.itemEstandar.numero_serie;
        this.itemUpdate.precio = this.itemEstandar.precio;
        this.itemUpdate.moneda = this.itemEstandar.moneda;
        this.itemUpdate.proveedor = this.itemEstandar.proveedor;
        this.itemUpdate.vida_estimada = this.itemEstandar.vida_estimada;
        this.itemUpdate.tipo_depreciacion = this.itemEstandar.tipo_depreciacion;
        this.itemUpdate.comentario = this.itemEstandar.comentario;
        this.itemUpdate.fecha_compra = this.itemEstandar.fecha_compra;
        this.itemUpdate.fecha_limite_garantia = this.itemEstandar.fecha_limite_garantia;
        this.itemUpdate.granja_id = this.itemEstandar.granja_id;
        this.itemUpdate.estado = this.itemEstandar.estado;
        this.itemUpdate.id = this.itemEstandar.id;
        updateMaquinas(this.itemUpdate).then(Response => {
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
        granja_id: this.granja_id
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
        this.itemEstandar.nombre = item.nombre;
        this.itemEstandar.numero_serie = item.numero_serie;
        this.itemEstandar.precio = item.precio;
        this.itemEstandar.moneda = item.moneda;
        this.itemEstandar.proveedor = item.proveedor;
        this.itemEstandar.vida_estimada = item.vida_estimada;
        this.itemEstandar.tipo_depreciacion = item.tipo_depreciacion;
        this.itemEstandar.comentario = item.comentario;
        this.itemEstandar.fecha_compra = item.fecha_compra;
        this.itemEstandar.fecha_limite_garantia = item.fecha_limite_garantia;
        this.itemEstandar.estado = item.estado;
        this.itemEstandar.granja_id = item.granja_id;
        this.itemEstandar.id = item.id;
        this.accionModal = "Editar";
        this.alert = false;
        this.state = false;
        this.modalDialog = true;
        this.loadSelect();
      } else if (accion === "eliminar") {
        this.itemEstandar = item;
        this.modo = 2;
      } else {
        // Aqui se elimina la maquina
        deleteMaquinas(item.id).then(Response => {
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
