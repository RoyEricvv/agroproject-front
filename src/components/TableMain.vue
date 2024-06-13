<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="buscar"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :footer-props="{
        'items-per-page-text': 'Número de registros por página'
      }"
      :search="buscar"
      :headers="headers"
      :items="content"
      :items-per-page="number"
      class="elevation-2"
      :loading="loading"
      loading-text="Cargando data"
      :show-select="selectableTable"
      :single-select="singleSelectable"
      :value="selectedList"
      @input="$emit('update:selectedList', $event)"
    >
      <template v-slot:no-data>
        <div v-if="statusT == 200">
          <v-alert
            :value="true"
            color="grey"
            type="info"
            style="margin-top: 16px"
          >
            No existe data para mostrar.
          </v-alert>
        </div>
        <div v-if="statusT == 404">
          <v-alert
            :value="true"
            color="blue"
            type="warning"
            style="margin-top: 16px"
          >
            No se encontro data para mostrar.
          </v-alert>
        </div>
        <div v-if="statusT == 400">
          <v-alert
            :value="true"
            color="red"
            type="warning"
            style="margin-top: 16px"
          >
            Servicio mal declarado.
          </v-alert>
        </div>
        <div v-if="statusT == 405">
          <v-alert
            :value="true"
            color="red"
            type="warning"
            style="margin-top: 16px"
          >
            Método no permitido.
          </v-alert>
        </div>
        <div v-if="statusT == 500">
          <v-alert
            :value="true"
            color="red"
            type="warning"
            style="margin-top: 16px"
          >
            Ocurrio un error en el servidor.
          </v-alert>
        </div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-row align="center" justify="space-around">
          <v-col
            v-bind:key="action.description"
            v-for="action in actions"
            cols="3"
            md="1"
          >
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="action.description == 'Editar'"
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Editar')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-pencil
                </v-icon>
              </template>
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="action.description == 'Eliminar'"
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Eliminar')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-delete
                </v-icon>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="
                    action.description == 'Contabilizar' &&
                      item.estado_animal != 3
                  "
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Contabilizar')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-cash
                </v-icon>
              </template>
              <span>Contabilizar</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="action.description == 'Favorito' && !item.favorito"
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Favorito')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-heart-outline
                </v-icon>
              </template>
              <span>Favorito</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="action.description == 'Alternar' && item.activo"
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Alternar')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-account-off-outline
                </v-icon>
              </template>
              <span>Deshabilitar</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="action.description == 'Alternar' && !item.activo"
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Alternar')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-account-outline
                </v-icon>
              </template>
              <span>Habilitar</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="action.description == 'Favorito' && item.favorito"
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Favorito')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-heart
                </v-icon>
              </template>
              <span>No Favorito</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="action.description == 'Proporción' && item.es_aditivo"
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Proporción')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-percent
                </v-icon>
              </template>
              <span>Proporción</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="action.description == 'Contenido' && !item.es_aditivo"
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Contenido')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-table-of-contents
                </v-icon>
              </template>
              <span>Contenido Nutricional</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="
                    action.description == 'Contenido Inventario' &&
                      !item.insumo.es_aditivo
                  "
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Contenido Inventario')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-table-of-contents
                </v-icon>
              </template>
              <span>Contenido Nutricional</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="action.description == 'Restricción' && !item.es_aditivo"
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Restricción')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-format-list-numbered
                </v-icon>
              </template>
              <span>Restricciones</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="action.description == 'Etapas'"
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Etapas')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-format-list-numbered
                </v-icon>
              </template>
              <span>Etapas</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="action.description == 'Requerimiento'"
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Requerimiento')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-format-list-text
                </v-icon>
              </template>
              <span>Requerimiento Nutricional</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="action.description == 'Crecimiento'"
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Crecimiento')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-format-list-numbered
                </v-icon>
              </template>
              <span>Crecimiento</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="action.description == 'Animales'"
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Animales')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-barn
                </v-icon>
              </template>
              <span>Animales</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="action.description == 'Maquinas'"
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Maquinas')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-tractor
                </v-icon>
              </template>
              <span>Maquinas</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="action.description == 'Aplicar'"
                  class="mr-2"
                  @click="$emit('show-modal', item, 'Aplicar')"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-checkbox-marked-circle
                </v-icon>
              </template>
              <span>Alplicar</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </template>
      <template
        v-slot:[`item.nutriente.unidad`]="{ item }"
        align="center"
        justify="space-around"
      >
        <div v-if="item.nutriente.unidad == 0">Porcentaje</div>
        <div v-if="item.nutriente.unidad == 1">Gramos/kg</div>
        <div v-if="item.nutriente.unidad == 2">Kcal/kg</div>
        <div v-if="item.nutriente.unidad == 3">PPM</div>
        <div v-if="item.nutriente.unidad == 4">mg/kg</div>
      </template>
      <template
        v-slot:[`item.unidad`]="{ item }"
        align="center"
        justify="space-around"
      >
        <div v-if="item.unidad == 0">Porcentaje</div>
        <div v-if="item.unidad == 1">Gramos</div>
        <div v-if="item.unidad == 2">Kcal/kg</div>
        <div v-if="item.unidad == 3">PPM</div>
        <div v-if="item.unidad == 4">mg/kg</div>
      </template>
      <template
        v-slot:[`item.tipo`]="{ item }"
        align="center"
        justify="space-around"
      >
        <div v-if="item.tipo == 0">Formula</div>
        <div v-if="item.tipo == 1">Aproximado</div>
      </template>
      <template
        v-slot:[`item.tipo_requerimiento`]="{ item }"
        align="center"
        justify="space-around"
      >
        <div v-if="item.tipo_requerimiento == 0">Mínimo</div>
        <div v-else>Máximo</div>
      </template>
      <template
        v-slot:[`item.estado_animal`]="{ item }"
        align="center"
        justify="space-around"
      >
        <div v-if="item.estado_animal == 1">Registrado</div>
        <div v-if="item.estado_animal == 2">Seguimiento</div>
        <div v-if="item.estado_animal == 3">Contabilizado</div>
      </template>
      <template
        v-slot:[`item.estado_racion`]="{ item }"
        align="center"
        justify="space-around"
      >
        <div v-if="item.estado_racion == 0">Insumo Escazo</div>
        <div v-if="item.estado_racion == 1">Insumo Disponible</div>
        <div v-if="item.estado_racion == 2">Ración Obtenida</div>
        <div v-if="item.estado_racion == 3">Ración Aplicada</div>
        <div v-if="item.estado_racion == 4">
          Insumos no cubren los requerimientos
        </div>
        <div v-if="item.estado_racion == 5">Ración aproximada</div>
      </template>
      <template
        v-slot:[`item.aplicar`]="{ item }"
        align="center"
        justify="space-around"
      >
        <v-checkbox v-model="item.aplicar" disabled></v-checkbox>
      </template>
      <template
        v-slot:[`item.comentario_racion`]="{ item }"
        align="center"
        justify="space-around"
      >
        <div v-if="item.cantidad_racion < item.cantidad_fuente">
          Insumos con baja concentración de {{ item.nutriente.nombre }}
        </div>
        <div v-if="item.cantidad_racion >= item.cantidad_fuente">
          Insumos con buena concentración de {{ item.nutriente.nombre }}
        </div>
      </template>
      <template
        v-slot:[`item.favorito`]="{ item }"
        align="center"
        justify="space-around"
      >
        <v-checkbox
          align="center"
          justify="space-around"
          v-model="item.favorito"
          disabled
        ></v-checkbox>
      </template>
      <template
        v-slot:[`item.insumo.es_aditivo`]="{ item }"
        align="center"
        justify="space-around"
      >
        <v-checkbox
          align="center"
          justify="space-around"
          v-model="item.insumo.es_aditivo"
          disabled
        ></v-checkbox>
      </template>
      <template
        v-slot:[`item.es_aditivo`]="{ item }"
        align="center"
        justify="space-around"
      >
        <v-checkbox
          align="center"
          justify="space-around"
          v-model="item.es_aditivo"
          disabled
        ></v-checkbox>
      </template>
      <template
        v-slot:[`item.esencial`]="{ item }"
        align="center"
        justify="space-around"
      >
        <v-checkbox
          align="center"
          justify="space-around"
          v-model="item.esencial"
          disabled
        ></v-checkbox>
      </template>
      <template
        v-slot:[`item.fecha_creacion`]="{ item }"
        align="center"
        justify="space-around"
      >
        <div>{{ item.fecha_creacion | truncate }}</div>
      </template>
      <template
        v-slot:[`item.fecha_modificacion`]="{ item }"
        align="center"
        justify="space-around"
      >
        <div>{{ item.fecha_modificacion | truncate }}</div>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
export default {
  name: "Table",
  props: {
    titleT: String,
    headersT: {
      type: Array,
      default: () => []
    },
    contentT: {
      type: Array,
      default: () => []
    },
    numberT: Number,
    statusT: Number,
    loading: Boolean,
    requiereCategoriaT: Boolean,
    actionsT: {
      type: Array,
      default: () => []
    },
    selectableTable: Boolean,
    singleSelectable: Boolean,
    selectedList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: this.headersT,
      content: this.contentT,
      number: this.numberT,
      buscar: "",
      newItem: "",
      status: this.statusT,
      actions: this.actionsT,
      title: this.titleT,
      requiereCategoria: this.requiereCategoriaT
    };
  },
  filters: {
    truncate: function(data) {
      const reqdString = data.split("T")[0];
      return reqdString;
    }
  }
};
</script>
