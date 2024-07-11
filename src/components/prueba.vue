<template>
    <div>
      <!-- Botón para abrir el modal -->
      <v-btn color="primary" @click="dialog = true">Agregar Vacunas</v-btn>
      
      <!-- Modal -->
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Registrar Vacunas</span>
          </v-card-title>
          
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nombre del Personal"
                    v-model="personalName"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-select
                    :items="vacunas"
                    label="Vacuna"
                    v-model="selectedVacuna"
                  ></v-select>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    label="N° de Dosis"
                    v-model="numeroDosis"
                    type="number"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" class="text-right">
                  <v-btn color="primary" @click="agregarVacuna">Agregar Vacuna</v-btn>
                </v-col>
                
                <v-col cols="12">
                  <v-data-table :headers="headers" :items="vacunasRegistradas">
                    <template v-slot:item.accion="{ item }">
                      <v-btn color="red" @click="eliminarVacuna(item)">Eliminar</v-btn>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: false,
        personalName: '',
        selectedVacuna: '',
        numeroDosis: '',
        vacunas: ['Vacuna A', 'Vacuna B', 'Vacuna C'], // Ejemplo de opciones de vacunas
        vacunasRegistradas: [],
        headers: [
          { text: 'Vacuna', value: 'vacuna' },
          { text: 'N° de Dosis', value: 'dosis' },
          { text: 'Acción', value: 'accion', sortable: false },
        ],
      };
    },
    methods: {
      agregarVacuna() {
        if (this.selectedVacuna && this.numeroDosis) {
          this.vacunasRegistradas.push({
            vacuna: this.selectedVacuna,
            dosis: this.numeroDosis,
          });
          this.selectedVacuna = '';
          this.numeroDosis = '';
        }
      },
      eliminarVacuna(item) {
        const index = this.vacunasRegistradas.indexOf(item);
        if (index > -1) {
          this.vacunasRegistradas.splice(index, 1);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Añade estilos personalizados aquí si es necesario */
  </style>
  