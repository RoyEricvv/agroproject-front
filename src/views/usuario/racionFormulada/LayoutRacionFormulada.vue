<template>
  <v-container
    class="fondo"
    fluid
    style="lef-margin: 0px; padding: 0px; width: 95%"
  >
    <div v-if="modo == 1">
      <v-col class="text-right">
        <v-btn class="secondary" @click="newItem()">Nueva Formulación</v-btn
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
      <v-dialog
        :key="modalKey"
        v-model="modalDialog"
        max-width="800px"
        max-height="800px"
      >
        <v-card>
          <div v-if="!alert && !loadingModal && !aplicarAditivo">
            <v-container fluid>
              <div>
                <v-card-title class="headline">
                  {{ accionModal }} Formulación de Ración
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="3">
                        <v-autocomplete
                          v-model="animalSeleccionado"
                          :items="opcionesAnimal"
                          item-text="nombre"
                          item-value="id"
                          label="Animal"
                          outlined
                          v-on:change="loadEtapas"
                          return-object
                          hide-no-data
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          type="number"
                          v-model.number="cantidad_por_formular"
                          label="Cantidad a formular"
                          outlined
                          required
                          min="0"
                          suffix="kg"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-select
                          :disabled="tamanoFuente"
                          v-model="fuente_id"
                          :items="selectFuente"
                          item-text="nombre"
                          item-value="id"
                          outlined
                          label="Fuente"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-checkbox
                          v-model="aproximar"
                          :label="`Calcular Aproximado`"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                    <v-row v-if="tamanoEtapas">
                      <v-col cols="12" md="10">
                        <p>
                          Etapa de vida de la Especie:
                          <b>{{ animalSeleccionado.especie.nombre }}</b>
                        </p>
                        <p>
                          De la semana
                          <b>
                            {{ etapasEspecie.semana_vida_referencial_inicial }}
                            a
                            {{ etapasEspecie.semana_vida_referencial_final }}
                          </b>
                          - Peso Vivo Referencial:
                          <b>{{ etapasEspecie.peso_vivo_referencial }} Kg</b>
                          - Ingesta diaria Recomendada:
                          <b>{{ etapasEspecie.cantidad_MS_referencial }} Kg</b>
                        </p>
                      </v-col>
                    </v-row>
                    <v-row v-if="tamanoInventario">
                      <div>
                        Seleccionar Insumos:
                      </div>
                      <v-col cols="12" md="10">
                        <v-checkbox
                          class="ma-0"
                          v-for="inventario in inventarioLista"
                          multiple
                          v-model="inventarioSeleccionado"
                          :key="inventario.id"
                          :value="inventario"
                          :label="inventario.insumo.nombre"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </div>
              <v-divider></v-divider>
              <v-card-actions style="margin-top: 16px">
                <v-col class="text-right">
                  <v-btn
                    :disabled="noformular"
                    class="secondary"
                    @click="getInventarioActual()"
                    >Enviar</v-btn
                  >
                </v-col>
              </v-card-actions>
            </v-container>
          </div>
          <div v-if="aplicarAditivo">
            <v-container>
              <v-card-title class="headline">Aplicar Ración</v-card-title>
              <v-card-text>¿Desea aplicar también los aditivos?</v-card-text>
              <v-card-actions>
                <v-col class="text-right">
                  <v-btn class="secondary" @click="aplicarRacion(1)">Si</v-btn>
                </v-col>
                <v-col class="text-right">
                  <v-btn class="warning" @click="aplicarRacion(0)">No</v-btn>
                </v-col>
              </v-card-actions>
            </v-container>
          </div>
          <div v-if="loadingModal" style="text-align: center;">
            <v-container fluid>
              <v-progress-circular
                :size="70"
                :width="7"
                color="green"
                indeterminate
              ></v-progress-circular>
            </v-container>
          </div>
          <div v-if="alert">
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
                  Ocurrio un error.
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
      <DetalleRacionFormulada
        :prop_racion_id="racionId"
        :prop_racion_fecha="racionFecha"
        :prop_racion_costo_total="racionCosto"
        :prop_racion_cantidad_total="racionCantidad"
        :prop_racion_estado="estadoRacion"
        :prop_racion_item="racionItem"
        v-on:regresar="regresar"
      />
    </div>
  </v-container>
</template>
<script>
import TableMain from "@/components/TableMain.vue";
import { getAllAnimalesUsuario } from "@/services/Animales.js";
import {
  verificarInventarioInicial,
  insertarInsumoEscazo,
  insertarInsumoDisponible,
  ejecutarAlgortimo,
  aplicarRacionFormulada
} from "@/services/FormularRacion.js";
import {
  //getAllEtapaVida,
  getAllEtapaVidaLimitada
} from "@/services/EtapaVida.js";
import {
  getAllInventarios,
  getInventariosRestriccion
} from "@/services/Inventario.js";
import {
  getAllRacionFormuladas,
  updateRacionFormuladas
} from "@/services/RacionFormulada.js";
import DetalleRacionFormulada from "@/views/usuario/racionFormulada/DetalleRacionFormulada.vue";
import { getAllFuentes } from "@/services/Fuente.js";
import store from "@/store/store";
export default {
  name: "LayouteRacionFormulada",
  components: {
    TableMain,
    DetalleRacionFormulada
  },
  computed: {
    noformular() {
      if (
        this.animalSeleccionado.id == 0 ||
        this.fuente_id == 0 ||
        this.cantidad_por_formular == 0 ||
        this.inventarioSeleccionado.length == 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    usuarioID() {
      return store.state.user.data.id;
    },
    tamanoEtapas() {
      if (this.etapasEspecie.id == 0) {
        return false;
      } else {
        return true;
      }
    },
    tamanoInventario() {
      if (this.inventarioLista.length == 0) {
        return false;
      } else {
        return true;
      }
    },
    tamanoFuente() {
      if (this.selectFuente.length == 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Animal",
          align: "start",
          value: "animal.nombre",
          width: "10%"
        },
        {
          text: "Semana de Vida",
          align: "start",
          value: "etapa_semana",
          width: "5%"
        },
        {
          text: "Estado",
          align: "center",
          value: "estado_racion",
          width: "15%"
        },
        {
          text: "Tipo",
          align: "center",
          value: "tipo",
          width: "5%"
        },
        {
          text: "Aplicable",
          value: "aplicar",
          width: "5%",
          align: "center"
        },
        {
          text: "Cantidad Total (KG)",
          value: "cantidad_total",
          width: "10%",
          align: "center"
        },
        {
          text: "Costo por Kg",
          value: "costo_total_Kg",
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
          width: "20%",
          align: "center"
        }
      ],
      user_id: 0,
      modo: 1,
      racionId: 0,
      racionFecha: "",
      racionCosto: 0,
      racionCantidad: 0,
      title: "Historial de Raciones Formuladas",
      descrip: "Lista de raciones formuladas previamente.",
      accionModal: "Crear",
      action: [
        { description: "Contenido" },
        { description: "Aplicar" },
        { description: "Favorito" }
      ],
      tablaKey: 0,
      modalKey: 10,
      content: [],
      selectedTeams: [],
      selectUser: [],
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
      animalSeleccionado: { id: 0 },
      opcionesAnimal: [],
      cantidadMS: 0,
      numeroRaciones: 0,
      etapasEspecie: { id: 0, cantidad_por_formular: 0 },
      etapaEspecieSeleccionado: { cantidad_por_formular: 0 },
      cantidad_por_formular: 0,
      estadoInventario: 0,
      insumoEscazo: {
        racion: {},
        inventario: []
      },
      datosFormulacion: {},
      selectFuente: [],
      fuente_id: 0,
      inventarioLista: [],
      inventarioSeleccionado: [],
      aproximar: false,
      loadingModal: false,
      racionItem: {},
      aplicarAditivo: false,
      cantidad_animales: 0,
      semana_Etapa: 0
    };
  },
  created() {
    this.user_id = this.usuarioID;
    this.loadData();
  },
  methods: {
    loadData() {
      this.content = [];
      this.loading = true;
      getAllRacionFormuladas(this.user_id).then(Response => {
        this.tableRequestStatus = Response.status;
        if (Response.status == 200) {
          Response.data.racionFormuladas.map(item => {
            this.content.push(item);
          });
        }
        this.loading = false;
      });
    },
    loadFuente: function() {
      this.selectFuente = [];
      getAllFuentes().then(Response => {
        if (Response.status != 200) {
          this.modalKey += 1;
          this.alert = true;
          this.state = false;
        } else {
          Response.data.fuentes.map(item => {
            this.selectFuente.push(item);
          });
        }
      });
    },
    loadAnimal() {
      this.opcionesAnimal = [];
      getAllAnimalesUsuario(this.user_id,1).then(Response => {
        if (Response.status == 200) {
          Response.data.animales.map(item => {
            this.opcionesAnimal.push(item);
          });
        } else {
          this.modalKey += 1;
          this.alert = true;
          this.state = false;
          this.mensajeError = Response.data.Mensaje;
        }
      });
    },
    loadEtapas() {
      getAllEtapaVidaLimitada(
        this.animalSeleccionado.especie_id,
        this.animalSeleccionado.id
      ).then(Response => {
        if (Response.status == 200) {
          this.etapasEspecie = Response.data.etapaVida;
          this.cantidad_animales = Response.data.historial.cantidad;
          this.semana_Etapa = Response.data.historial.semana_crecimiento;
          this.selectFuente = Response.data.fuente;
          this.loadInventarioRestriccion();
        } else {
          this.alert = true;
          this.state = false;
          this.mensajeError = Response.data.Mensaje;
        }
      });
    },
    loadInventarioRestriccion() {
      this.inventarioLista = [];
      getInventariosRestriccion(
        this.usuarioID,
        this.animalSeleccionado.especie.id,
        this.etapasEspecie.id
      ).then(Response => {
        if (Response.status == 200) {
          Response.data.inventarios.map(item => {
            this.inventarioLista.push(item);
          });
        } else {
          this.alert = true;
          this.state = false;
          this.mensajeError = Response.data.Mensaje;
        }
      });
    },
    getInventarioActual() {
      this.loadingModal = true;
      this.estadoInventario = 0;
      getAllInventarios(this.user_id).then(Response => {
        if (Response.status != 200) {
          this.estadoInventario = 1; //No existe Inventario Registrado
          this.modalKey += 1;
          this.loadingModal = false;
          this.alert = true;
          this.state = false;
          this.mensajeError = "No existe Inventario Registrado";
        } else {
          verificarInventarioInicial(this.user_id).then(Response => {
            if (Response.status != 200) {
              this.estadoInventario = 3; //Hay inventario escazo
              this.modalKey += 1;
              this.loadingModal = false;
              this.alert = true;
              this.state = false;
              this.mensajeError = "Existe Inventario Escazo";
              var racion = {
                cantidad_animales: this.cantidad_animales,
                tipo: this.aproximar ? 1 : 0,
                etapa_semana: this.semana_Etapa,
                cantidad_total: this.cantidad_por_formular,
                usuario_id: this.usuarioID,
                animal_id: this.animalSeleccionado.id
              };
              this.insumoEscazo.racion = racion;
              this.insumoEscazo.inventario = Response.data.inventario;
              insertarInsumoEscazo(this.insumoEscazo);
            } else {
              this.estadoInventario = 2; //Existe inventario disponible
              racion = {
                cantidad_animales: this.cantidad_animales,
                tipo: this.aproximar ? 1 : 0,
                etapa_semana: this.semana_Etapa,
                fuente_id: this.fuente_id,
                cantidad_total: this.cantidad_por_formular,
                usuario_id: this.usuarioID,
                animal_id: this.animalSeleccionado.id
              };
              this.insumoEscazo.racion = racion;
              insertarInsumoDisponible(this.insumoEscazo).then(Response => {
                if (Response.status != 200) {
                  this.loadingModal = false;
                  this.alert = true;
                  this.state = false;
                  this.mensajeError = "No se registró la ración";
                } else {
                  this.datosFormulacion = {
                    usuario_id: this.usuarioID,
                    racion_formulada_id: Response.data.racionId,
                    etapa_vida_id: this.etapasEspecie.id,
                    departamento_id: this.animalSeleccionado.granja
                      .departamento_id,
                    fuente_id: this.fuente_id,
                    cantidad_por_formular: this.cantidad_por_formular,
                    lista_inventario: this.inventarioSeleccionado,
                    aproximar: this.aproximar ? 1 : 0
                  };
                  ejecutarAlgortimo(this.datosFormulacion).then(Response => {
                    this.loadingModal = false;
                    if (Response.status == 200) {
                      this.alert = true;
                      this.state = true;
                      this.loadData();
                      this.tablaKey += 1;
                    } else {
                      this.alert = true;
                      this.state = false;
                      this.mensajeError =
                        "Las concentraciones de nutrientes en los insumos no cumplen con los requerimientos";
                      this.loadData();
                      this.tablaKey += 1;
                    }
                  });
                }
              });
              console.log("Enviar a Formular");
            }
          });
        }
      });
    },
    regresar() {
      this.modo = 1;
    },
    newItem() {
      this.accionModal = "Crear";
      this.selectFuente = [];
      this.fuente_id = 0;
      this.etapasEspecie = { id: 0, cantidad_por_formular: 0 };
      this.etapaEspecieSeleccionado = {};
      this.cantidad_por_formular = 0;
      this.animalSeleccionado = {};
      this.inventarioLista = [];
      this.inventarioSeleccionado = [];
      this.insumoEscazo = {};
      this.datosFormulacion = {};
      this.cantidad = 0;
      this.aproximar = true;
      this.mensajeError = "";
      this.alert = false;
      this.state = false;
      this.modalDialog = true;
      this.aplicarAditivo = false;
      this.loadAnimal();
    },
    aplicarRacion(aditivo) {
      this.aplicarAditivo = false;
      this.loadingModal = true;
      aplicarRacionFormulada(this.racionId, aditivo).then(Response => {
        this.loadingModal = false;
        if (Response.status == 200) {
          this.alert = true;
          this.state = true;
        } else {
          this.alert = true;
          this.state = false;
        }
        this.modalKey += 1;
        this.loadData();
      });
    },
    accionItem: function(item, accion) {
      console.log("accion: " + accion);
      if (accion == "Contenido") {
        console.log(accion);
        this.racionId = item.id;
        this.racionFecha = item.fecha_creacion;
        this.racionCosto = item.costo_total;
        this.racionCantidad = item.cantidad_total;
        this.estadoRacion = item.estado_racion;
        this.racionItem = item;
        this.modo = 2;
      }
      if (accion == "Aplicar") {
        if (item.estado_racion == 0 || item.estado_racion == 4) {
          this.alert = true;
          this.state = false;
          this.mensajeError =
            "No es posible aplicar una formulación con inventario escazo.";
        } else if (item.aplicar == false) {
          this.alert = true;
          this.state = false;
          this.mensajeError =
            "No es posible aplicar la formulación ya que se ha modificado el costo de un insumo o se ha registrado una nueva etapa de crecimiento.";
        } else {
          this.modalDialog = true;
          //if (item.costo_aditivo > 0) {
          //  this.racionId = item.id;
          //  this.aplicarAditivo = true;
          //} else {
          this.loadingModal = true;
          aplicarRacionFormulada(item.id, 1).then(Response => {
            this.loadingModal = false;
            if (Response.status == 200) {
              this.alert = true;
              this.state = true;
            } else {
              this.alert = true;
              this.state = false;
            }
            this.modalKey += 1;
          });
          //}
        }
        this.modalDialog = true;
        this.tablaKey += 1;
      }
      if (accion == "Favorito") {
        item.favorito = !item.favorito;
        updateRacionFormuladas(item).then(Response => {
          if (Response.status == 200) {
            this.alert = true;
            this.state = true;
          } else {
            this.alert = true;
            this.state = false;
          }
          this.modalKey += 1;
          this.tablaKey += 1;
        });
      }
    }
  }
};
</script>
