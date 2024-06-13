<template>
  <div>
    <v-row class="mb-2">
      <v-btn class="secondary" @click="$emit('regresar')">
        <v-icon class="mr-2">
          mdi-arrow-left-thick
        </v-icon>
      </v-btn>
    </v-row>
    <h1>{{ title }}</h1>
    <br />
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Detalle de la Ración
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="prop_racion_item.cantidad_total"
                  label="Cantidad de insumo de la Ración"
                  outlined
                  readonly
                  suffix="kg"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="prop_racion_item.cantidad_animales"
                  label="Cantidad de animales"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="prop_racion_item.costo_total_Kg"
                  label="Costo por KG de Ración"
                  outlined
                  readonly
                  prefix="S/."
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="prop_racion_item.costo_total"
                  label="Costo total de insumos"
                  outlined
                  readonly
                  prefix="S/."
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="prop_racion_item.costo_aditivo_kg != 0">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="prop_racion_item.costo_aditivo_kg"
                  label="Costo por KG de aditivos"
                  outlined
                  readonly
                  prefix="S/."
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="prop_racion_item.costo_aditivo"
                  label="Costo total de aditivos"
                  outlined
                  readonly
                  prefix="S/."
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>
            Detalle de los requisitos
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="prop_racion_item.animal.especie.nombre"
                  label="Especie"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="prop_racion_item.etapa_semana"
                  label="Semana de Crecimiento"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="prop_racion_item.fuente.nombre"
                  label="Fuente"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <br />
    <br />
    <TableMain
      :titleT="titleInsumos"
      :headersT="headers"
      :contentT="content"
      :numberT="number"
      :loading="loading"
      :statusT="tableRequestStatus"
      :requiereCategoriaT="false"
    />
    <br />
    <br />
    <TableMain
      :titleT="titleNutriente"
      :headersT="headersNut"
      :contentT="contentNut"
      :numberT="numberNut"
      :loading="loadingNut"
      :statusT="tableRequestStatusNut"
      :requiereCategoriaT="false"
    />
  </div>
</template>
<script>
import TableMain from "@/components/TableMain.vue";
import { getAllContenidoRaciones } from "@/services/ContenidoRacion.js";
import { getAllNutrienteRaciones } from "@/services/NutrienteRacion.js";
export default {
  name: "DetalleRacionFormulada",
  props: {
    prop_racion_id: Number,
    prop_racion_fecha: String,
    prop_racion_costo_total: Number,
    prop_racion_cantidad_total: Number,
    prop_racion_estado: Number,
    prop_racion_item: Object
  },
  components: {
    TableMain
  },
  computed: {
    costoKg() {
      return Number(
        (
          this.prop_racion_costo_total / this.prop_racion_cantidad_total
        ).toFixed(2)
      );
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Insumo",
          align: "start",
          value: "insumo.nombre",
          width: "25%"
        },
        {
          text: "Aditivo",
          value: "insumo.es_aditivo",
          width: "15%",
          align: "center"
        },
        {
          text: "Cantidad Total (kg)",
          value: "cantidad_total",
          width: "20%",
          align: "center"
        },
        {
          text: "Porcentaje Total (%)",
          value: "cantidad_porcentual",
          width: "20%",
          align: "center"
        },
        {
          text: "Precio Total (S/.)",
          value: "costo_total",
          width: "20%",
          align: "center"
        }
      ],
      racionID: this.prop_racion_id,
      racionFecha: this.prop_racion_fecha,
      racionPrecioTotal: this.prop_racion_costo_total,
      titleInsumos: "Insumos Incurridos en la Ración",
      titleNutriente: "Nutrientes de la Ración",
      title: "Animal: " + this.prop_racion_item.animal.nombre,
      descrip:
        this.prop_racion_estado == 0
          ? "Insumos con cantidad igual a cero"
          : "Cantidad de Insumos necesarios para la ración.",
      tablaKey: 0,
      content: [],
      loading: false,
      number: 10,
      tableRequestStatus: 200,
      descripNut: "Contenido Nutricional de la Ración Formulada por Kilogramo.",
      contentNut: [],
      loadingNut: false,
      tableRequestStatusNut: 200,
      headersNut: [
        {
          text: "Nutriente",
          align: "start",
          value: "nutriente.nombre",
          width: "20%"
        },
        {
          text: "Unidad",
          value: "nutriente.unidad",
          width: "10%",
          align: "center"
        },
        {
          text: "Mínimo",
          value: "cantidad_fuente",
          width: "15%",
          align: "center"
        },
        {
          text: "Calculado",
          value: "cantidad_racion",
          width: "15%",
          align: "center"
        },
        {
          text: "Comentario",
          value: "comentario_racion",
          width: "30%",
          align: "center"
        }
      ],
      numberNut: -1
    };
  },
  created() {
    this.loadData();
    this.loadNutriente();
  },
  methods: {
    loadData() {
      this.content = [];
      this.loading = true;
      getAllContenidoRaciones(this.racionID).then(Response => {
        this.tableRequestStatus = Response.status;
        if (Response.status == 200) {
          Response.data.contenidoRaciones.map(item => {
            this.content.push(item);
          });
        }
        this.loading = false;
      });
    },
    loadNutriente() {
      this.contentNut = [];
      this.loadingNut = true;
      getAllNutrienteRaciones(this.racionID).then(Response => {
        this.tableRequestStatusNut = Response.status;
        if (Response.status == 200) {
          Response.data.nutrienteRacion.map(item => {
            this.contentNut.push(item);
          });
        }
        this.loadingNut = false;
      });
    }
  }
};
</script>
