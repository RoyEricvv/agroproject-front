<template>
    <v-app>
      <v-content>
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="12">
              <h1 class="text-center">Gestión de Costos</h1>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="6">
              <v-card elevation="2">
                <v-card-title>Ingresos</v-card-title>
                <v-card-text>
                  <!-- Contenido de la card de Ingresos -->
                </v-card-text>
                <v-card-actions>
                  <v-btn color="green" @click="goToIngresosPage">Ver Detalles</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="6">
              <v-card elevation="2">
                <v-card-title>Egresos</v-card-title>
                <v-card-text>
                  <!-- Contenido de la card de Egresos -->
                </v-card-text>
                <v-card-actions>
                  <v-btn color="green" @click="goToEgresosPage">Ver Detalles</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </template>
  
  <script>
  export default {
    methods: {
      goToIngresosPage() {
        // Lógica para redirigir a la página de Ingresos
      },
      goToEgresosPage() {
        // Lógica para redirigir a la página de Egresos
      }
    }
  }
  </script>
  
  <style scoped>
  /* Estilos personalizados si es necesario */
  </style>
  