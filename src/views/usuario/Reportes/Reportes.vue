<template>
  <v-container
    class="primary"
    fluid
    style="lef-margin: 0px; padding: 0px; width: 95%"
  >
    <div>
      <h1>Reporte de Seguimiento del Animal</h1>
      <br />
      <v-row>
        <v-col class="text-left">
          <v-select
            v-model="animalSelecionado"
            :items="opcionesAnimal"
            item-text="nombre"
            item-value="id"
            label="Animal"
            v-on:change="loadData"
          ></v-select>
        </v-col>
      </v-row>
      <v-card>
        <div v-if="!cargando && !verGraficos" style="text-align: center;">
          <p>Elegir un animal</p>
        </div>
        <div v-if="cargando" style="text-align: center;">
          <v-container fluid>
            <v-progress-circular
              :size="70"
              :width="7"
              color="green"
              indeterminate
            ></v-progress-circular>
          </v-container>
        </div>
        <div v-if="verGraficos" align="center" justify="center">
          <br />
          <GChart
            style="lef-margin: 20px; padding: 0px; width: 90%"
            :settings="{ packages: ['bar'] }"
            :data="chartData"
            :options="chartOptions"
            :createChart="(el, google) => new google.charts.Bar(el)"
            @ready="onChartReady"
          />
          <br />
          <GChart
            style="lef-margin: 20px; padding: 0px; width: 90%"
            :settings="{ packages: ['bar'] }"
            :data="cahrtDataG"
            :options="chartOptionsG"
            :createChart="(el, google) => new google.charts.Bar(el)"
            @ready="onChartReady"
          />
          <br />
          <GChart
            style="lef-margin: 20px; padding: 0px; width: 90%"
            :settings="{ packages: ['bar'] }"
            :data="cahrtDataC"
            :options="chartOptionsC"
            :createChart="(el, google) => new google.charts.Bar(el)"
            @ready="onChartReady"
          />
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { GChart } from "vue-google-charts";
import { getAllAnimalesUsuario } from "@/services/Animales.js";
import { getReportePeso } from "@/services/Reporte.js";
import store from "@/store/store";
export default {
  name: "App",
  components: {
    GChart
  },
  data() {
    return {
      chartsLib: null,
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [],
      cahrtDataG: [],
      cahrtDataC: [],
      opcionesAnimal: [],
      animalSelecionado: 0,
      cargando: false,
      verGraficos: false
    };
  },
  created() {
    this.loadAnimal();
  },
  computed: {
    usuarioID() {
      return store.state.user.data.id;
    },
    chartOptions() {
      if (!this.chartsLib) return null;
      return this.chartsLib.charts.Bar.convertOptions({
        chart: {
          title: "Evolución de Peso (KG) del Animal",
          subtitle: "Registro vs Recomendado"
        },
        bars: "vertical", // Required for Material Bar Charts.
        hAxis: { format: "decimal" },
        height: 400,
        colors: ["#1b9e77", "#d95f02", "#7570b3"]
      });
    },
    chartOptionsG() {
      if (!this.chartsLib) return null;
      return this.chartsLib.charts.Bar.convertOptions({
        chart: {
          title: "Ganancia Peso Animal por Semana",
          subtitle: "Peso Ganado Semanalmente"
        },
        bars: "vertical", // Required for Material Bar Charts.
        hAxis: { format: "decimal" },
        height: 400,
        colors: ["#1b9e77", "#d95f02", "#7570b3"]
      });
    },
    chartOptionsC() {
      if (!this.chartsLib) return null;
      return this.chartsLib.charts.Bar.convertOptions({
        chart: {
          title: "Consumo de Raciones",
          subtitle: "Cantidad en Kg de racion consumida semanalmente"
        },
        bars: "vertical", // Required for Material Bar Charts.
        hAxis: { format: "decimal" },
        height: 400,
        colors: ["#1b9e77", "#d95f02", "#7570b3"]
      });
    }
  },
  methods: {
    onChartReady(chart, google) {
      this.chartsLib = google;
    },
    loadAnimal() {
      this.opcionesAnimal = [];
      getAllAnimalesUsuario(this.usuarioID,0).then(Response => {
        if (Response.status == 200) {
          Response.data.animales.map(item => {
            this.opcionesAnimal.push(item);
          });
        }
      });
    },
    loadData() {
      this.verGraficos = false;
      this.cargando = false;
      if (this.animalSelecionado != 0) {
        this.chartData = [];
        this.cahrtDataG = [];
        this.cahrtDataC = [];
        this.verGraficos = false;
        this.cargando = true;
        getReportePeso(this.animalSelecionado).then(Response => {
          this.cargando = false;
          if (Response.status == 200) {
            this.verGraficos = true;
            Response.data.reporte.map(item => {
              this.chartData.push(item);
            });
            Response.data.reporteGanancia.map(item => {
              this.cahrtDataG.push(item);
            });
            Response.data.reporteConsumo.map(item => {
              this.cahrtDataC.push(item);
            });
          }
        });
      }
    }
  }
};
</script>
