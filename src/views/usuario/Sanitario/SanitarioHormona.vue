<template>
    <v-container
      class="fondo"
      fluid
      style="lef-margin: 0px; padding: 0px; width: 95%"
    >
      <div>
        <h1 style="color:grey;">Mis Hormona</h1>
        <v-col class="text-right">
          <v-btn class="secondary" @click="newItem()">Nueva Vacuna</v-btn
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
                    {{ accionModal }} Sanitario
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col v-if="accionModal != 'Editar'" cols="12" md="4">
                          <v-autocomplete
                            v-model="itemEstandar.rubro"
                            :items="selectRubro"
                            item-text="nombre"
                            item-value="id"
                            outlined
                            label="Rubro"
                            return-object
                            hide-no-data
                          ></v-autocomplete>
                        </v-col>
                        <v-col v-if="accionModal == 'Editar'" cols="12" md="4">
                          <v-text-field
                            v-model="itemEstandar.rubro.nombre"
                            label="Rubro"
                            outlined
                            disabled
                          ></v-text-field>
                        </v-col>
                        <DateField
                          v-model="itemEstandar.fecha_ingreso"
                          label="Fecha de ingreso"
                          @input="updateFechaIngreso"
                        />
                        <DateField
                          v-model="itemEstandar.fecha_vencimiento"
                          label="Fecha de vencimiento"
                          @input="updateFechaVencimiento"
                        />

                        
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field
                            label="Frasco"
                            v-model.number="itemEstandar.frascos"
                            type="number"
                            outlined
                            min="0"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-textarea
                            label="Marca"
                            auto-grow
                            outlined
                            rows="2"
                            v-model.number="itemEstandar.marca"
                            row-height="15"
                            counter
                            maxlength="40"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            label="Dosis"
                            v-model.number="itemEstandar.dosis"
                            type="number"
                            outlined
                            min="0"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field
                            label="ml / animal"
                            v-model.number="itemEstandar.ml_animal"
                            outlined
                            type="number"
                            min="0"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col v-if="accionModal != 'Editar'" cols="12" md="4">
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
                        <v-col v-if="accionModal == 'Editar'" cols="12" md="4">
                          <v-text-field
                            v-model="itemEstandar.especie.nombre"
                            label="Especie"
                            outlined
                            disabled
                          ></v-text-field>
                        </v-col>
                        <v-col v-if="accionModal != 'Editar'" cols="12" md="4">
                          <v-autocomplete
                            v-model="itemEstandar.granja"
                            :items="selectGranja"
                            item-text="nombre"
                            item-value="id"
                            outlined
                            label="Granja"
                            return-object
                            hide-no-data
                          ></v-autocomplete>
                        </v-col>
                        <v-col v-if="accionModal == 'Editar'" cols="12" md="4">
                          <v-text-field
                            v-model="itemEstandar.granja.nombre"
                            label="Granja"
                            outlined
                            disabled
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-textarea
                            label="Observaciones"
                            auto-grow
                            rows="4"
                            v-model="itemEstandar.observaciones"
                            outlined
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
      
    </v-container>
  </template>
  
  <script>
  import TableMain from "@/components/TableMain.vue";
  import DateField from '@/components/DateField.vue';
  import store from "@/store/store";
  import {getAllGranjas} from "@/services/Granja.js";
  import {getAllrubros} from "@/services/Rubro.js";
  import { 
    getAllSanitariosUsuario,
    createSanitario
 } from "@/services/Sanitario.js";
 import { getAllEspecies } from "@/services/Especie.js";
  export default {
    name: "registroVacuna",
    props: {
      prop_granja_nombre: String
    },
    components: {
      TableMain,
      DateField
    },
    computed: {
      validar() {
        if (this.itemEstandar.especie == null  || !this.itemEstandar.fecha_ingreso || !this.itemEstandar.fecha_vencimiento) {
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
        menu: false,
        reglasNombre: [v => v.length <= 45 || "Máximo 45 Caracteres"],
        reglasComentario: [v => v.length <= 250 || "Máximo 250 Caracteres"],
        headers: [
        {
          text: "Rubro",
          value: "rubro.nombre",
          width: "20%",
          align: "center"
        },
        {
          text: "Fecha de ingreso",
          value: "fecha_ingreso",
          width: "10%",
          align: "center"
        },
        {
          text: "Frascos",
          value: "frascos",
          width: "5%",
          align: "center"
        },
        {
          text: "Dosis",
          value: "dosis",
          width: "5%",
          align: "center"
        },
        {
          text: "Saldo",
          value: "saldo",
          width: "5%",
          align: "center"
        },
        {
          text: "Marca",
          value: "marca",
          width: "10%",
          align: "center"
        },
        {
          text: "ml/animal",
          value: "ml_animal",
          width: "5%",
          align: "center"
        },
        {
          text: "Fecha de vencimiento",
          value: "fecha_vencimiento",
          width: "10%",
          align: "center"
        },
        {
          text: "Observaciones",
          value: "observaciones",
          width: "25%",
          align: "center"
        },
        {
          text: "Acciones",
          value: "actions",
          width: "10%",
          align: "center"
        }
        ],
        user_id: 0, 
        typeSanitario: "vacuna",
        title: this.prop_granja_nombre,
        descrip: "Lista de registro sanitario",
        accionModal: "Crear",
        action: [
          { description: "Editar" },
          { description: "Eliminar" }
        ],
        itemEstandar: {especie: {}, granja: {}, rubro: {},fecha_ingreso: '', fecha_vencimiento: '' },
        selectEspecie: [],
        selectGranja: [],
        selectRubro: [],
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
      this.user_id = this.usuarioID;
      this.typeSanitario = "vacuna";
      this.loadData();
    },
    methods: {
      updateFechaIngreso(newValue) {
        console.log("fas")
        this.itemEstandar.fecha_ingreso = newValue;
      },
      updateFechaVencimiento(newValue) {
        this.itemEstandar.fecha_vencimiento = newValue;
      },
      loadData() {
        this.content = [];
        this.loading = true;
        getAllSanitariosUsuario(this.user_id,this.typeSanitario).then(Response => {
          this.tableRequestStatus = Response.status;
          if (Response.status == 200) {
            Response.data.sanitarios.map(usuario => {
              this.content.push(usuario);
            });
          }
          this.loading = false;
        });
      },
      loadSelect: function() {
        this.selectEspecie = [];
        this.selectGranja = [];
        this.selectRubro = [];
        getAllGranjas(this.user_id).then(Response => {
          if (Response.status != 200) {
            console.log("va")
            this.alert = true;
            this.state = false;
          } else {
            console.log("Entro a Select granja");
            Response.data.granjas.map(item => {
              this.selectGranja.push(item);
            });
          }
        });
        getAllrubros().then(Response => {
          if (Response.status != 200) {
            this.alert = true;
            this.state = false;
          } else {
            console.log("Entro a Select");
            Response.data.map(item => {
              this.selectRubro.push(item);
            });
          }
        });
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
        this.itemEstandar.rubro_id = this.itemEstandar.rubro.id;
        this.itemEstandar.granja_id = this.itemEstandar.granja.id;        
        this.itemEstandar.estado_sanitario = "vacuna";
        if (this.accionModal === "Crear") {
          createSanitario(this.itemEstandar).then(Response => {
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
          observaciones: "",
          granja_id: 0,
          especie_id: 0,
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
          // this.itemEstandar.estado_animal = item.estado_animal;
          // this.itemEstandar.nombre = item.nombre;
          // this.itemEstandar.comentario = item.comentario;
          // this.itemEstandar.precio_kg_animal = item.precio_kg_animal;
          // this.itemEstandar.granja_id = item.granja_id;
          // this.itemEstandar.id = item.id;
          this.accionModal = "Editar";
          this.alert = false;
          this.state = false;
          this.modalDialog = true;
          this.loadSelect();
        } else {
          console.log("d")
        }
      }
    }
  
  };
  </script>
  